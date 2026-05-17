import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/providers.dart';
import '../domain/app_user.dart';

enum AuthStatus {
  checking,
  unauthenticated,
  authenticated,
  awaitingEmailVerification,
}

class AuthState {
  const AuthState({
    required this.status,
    this.user,
    this.isLoading = false,
    this.errorMessage,
    this.infoMessage,
  });

  const AuthState.checking() : this(status: AuthStatus.checking);

  final AuthStatus status;
  final AppUser? user;
  final bool isLoading;
  final String? errorMessage;
  final String? infoMessage;

  AuthState copyWith({
    AuthStatus? status,
    AppUser? user,
    bool? isLoading,
    String? errorMessage,
    String? infoMessage,
    bool clearMessages = false,
  }) {
    return AuthState(
      status: status ?? this.status,
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: clearMessages ? null : errorMessage ?? this.errorMessage,
      infoMessage: clearMessages ? null : infoMessage ?? this.infoMessage,
    );
  }
}

final authControllerProvider = NotifierProvider<AuthController, AuthState>(
  AuthController.new,
);

class AuthController extends Notifier<AuthState> {
  @override
  AuthState build() {
    Future<void>.microtask(restoreSession);
    return const AuthState.checking();
  }

  Future<void> restoreSession() async {
    try {
      final user = await ref.read(authRepositoryProvider).restoreSession();
      state = AuthState(
        status:
            user == null
                ? AuthStatus.unauthenticated
                : AuthStatus.authenticated,
        user: user,
      );
    } catch (_) {
      state = const AuthState(status: AuthStatus.unauthenticated);
    }
  }

  Future<void> login(String email, String password) async {
    await _runAuthAction(() async {
      final user = await ref
          .read(authRepositoryProvider)
          .login(email: email.trim(), password: password);
      state = AuthState(status: AuthStatus.authenticated, user: user);
    });
  }

  Future<void> register(String email, String password) async {
    await _runAuthAction(() async {
      final user = await ref
          .read(authRepositoryProvider)
          .register(email: email.trim(), password: password);
      if (user == null) {
        state = const AuthState(
          status: AuthStatus.awaitingEmailVerification,
          infoMessage:
              'Check your email to verify your Linkrai account, then log in.',
        );
        return;
      }

      state = AuthState(status: AuthStatus.authenticated, user: user);
    });
  }

  Future<void> sendPasswordReset(String email) async {
    await _runAuthAction(() async {
      await ref.read(authRepositoryProvider).sendPasswordReset(email.trim());
      state = const AuthState(
        status: AuthStatus.unauthenticated,
        infoMessage: 'Password reset email sent.',
      );
    });
  }

  Future<void> logout() async {
    await ref.read(authRepositoryProvider).logout();
    state = const AuthState(status: AuthStatus.unauthenticated);
  }

  Future<void> _runAuthAction(Future<void> Function() action) async {
    state = state.copyWith(isLoading: true, clearMessages: true);
    try {
      await action();
    } catch (error) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: _friendlyError(error),
      );
    }
  }

  String _friendlyError(Object error) {
    final message = error.toString().replaceFirst(
      'AuthException(message: ',
      '',
    );
    if (message.length > 180) {
      return 'Something went wrong. Please try again.';
    }
    return message;
  }
}
