import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../features/auth/application/auth_controller.dart';
import '../features/auth/presentation/forgot_password_screen.dart';
import '../features/auth/presentation/login_screen.dart';
import '../features/auth/presentation/register_screen.dart';
import '../features/library/presentation/library_placeholder_screen.dart';
import '../features/onboarding/presentation/onboarding_placeholder_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authControllerProvider);

  return GoRouter(
    initialLocation: '/login',
    redirect: (context, state) {
      final location = state.uri.path;
      final isAuthRoute =
          location == '/login' ||
          location == '/register' ||
          location == '/forgot-password';

      if (authState.status == AuthStatus.checking) {
        return null;
      }

      if (authState.status == AuthStatus.authenticated && isAuthRoute) {
        final needsOnboarding =
            authState.user?.profile?.onboardingCompleted == false;
        return needsOnboarding ? '/onboarding' : '/library';
      }

      if (authState.status != AuthStatus.authenticated && !isAuthRoute) {
        return '/login';
      }

      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) => const ForgotPasswordScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingPlaceholderScreen(),
      ),
      GoRoute(
        path: '/library',
        builder: (context, state) => const LibraryPlaceholderScreen(),
      ),
    ],
  );
});
