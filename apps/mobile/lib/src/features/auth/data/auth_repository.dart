import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../core/config/app_config.dart';
import '../../../core/network/linkrai_api_client.dart';
import '../../../core/storage/secure_token_storage.dart';
import '../domain/app_user.dart';

class AuthRepository {
  AuthRepository({
    required AppConfig config,
    required LinkraiApiClient apiClient,
    required SecureTokenStorage tokenStorage,
  }) : _config = config,
       _apiClient = apiClient,
       _tokenStorage = tokenStorage;

  final AppConfig _config;
  final LinkraiApiClient _apiClient;
  final SecureTokenStorage _tokenStorage;

  Future<AppUser?> restoreSession() async {
    final storedToken = await _tokenStorage.readToken();
    if (storedToken != null && storedToken.isNotEmpty) {
      return _apiClient.getMe();
    }

    if (!_config.isSupabaseConfigured) {
      return null;
    }

    final session = Supabase.instance.client.auth.currentSession;
    final token = session?.accessToken;
    if (token == null || token.isEmpty) {
      return null;
    }

    await _tokenStorage.saveToken(token);
    return _apiClient.getMe();
  }

  Future<AppUser> login({
    required String email,
    required String password,
  }) async {
    _ensureSupabaseConfigured();
    final response = await Supabase.instance.client.auth.signInWithPassword(
      email: email,
      password: password,
    );
    final token = response.session?.accessToken;
    if (token == null || token.isEmpty) {
      throw const AuthException('Login succeeded but no session was returned.');
    }

    await _tokenStorage.saveToken(token);
    return _apiClient.getMe();
  }

  Future<AppUser?> register({
    required String email,
    required String password,
  }) async {
    _ensureSupabaseConfigured();
    final response = await Supabase.instance.client.auth.signUp(
      email: email,
      password: password,
    );
    final token = response.session?.accessToken;
    if (token == null || token.isEmpty) {
      return null;
    }

    await _tokenStorage.saveToken(token);
    return _apiClient.getMe();
  }

  Future<void> sendPasswordReset(String email) async {
    _ensureSupabaseConfigured();
    await Supabase.instance.client.auth.resetPasswordForEmail(email);
  }

  Future<void> logout() async {
    await _tokenStorage.clear();
    if (_config.isSupabaseConfigured) {
      await Supabase.instance.client.auth.signOut();
    }
  }

  void _ensureSupabaseConfigured() {
    if (!_config.isSupabaseConfigured) {
      throw const AuthException(
        'Supabase is not configured. Start the app with SUPABASE_URL and SUPABASE_ANON_KEY.',
      );
    }
  }
}
