import 'package:dio/dio.dart';

import '../../features/auth/domain/app_user.dart';
import '../storage/secure_token_storage.dart';

class LinkraiApiClient {
  LinkraiApiClient({
    required String baseUrl,
    required SecureTokenStorage tokenStorage,
  }) : _tokenStorage = tokenStorage,
       _dio = Dio(
         BaseOptions(
           baseUrl: baseUrl,
           connectTimeout: const Duration(seconds: 12),
           receiveTimeout: const Duration(seconds: 20),
           headers: const {'Accept': 'application/json'},
         ),
       ) {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _tokenStorage.readToken();
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
      ),
    );
  }

  final Dio _dio;
  final SecureTokenStorage _tokenStorage;

  Future<AppUser> getMe() async {
    final response = await _dio.get<Map<String, dynamic>>('/me');
    return AppUser.fromJson(response.data ?? <String, dynamic>{});
  }
}
