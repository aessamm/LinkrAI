import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureTokenStorage {
  SecureTokenStorage({FlutterSecureStorage? storage})
    : _storage = storage ?? const FlutterSecureStorage();

  static const _accessTokenKey = 'linkrai_access_token';

  final FlutterSecureStorage _storage;

  Future<void> saveToken(String token) {
    return _storage.write(key: _accessTokenKey, value: token);
  }

  Future<String?> readToken() {
    return _storage.read(key: _accessTokenKey);
  }

  Future<void> clear() {
    return _storage.delete(key: _accessTokenKey);
  }
}
