import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/config/providers.dart';
import '../../../core/network/providers.dart';
import '../../../core/storage/providers.dart';
import 'auth_repository.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(
    config: ref.watch(appConfigProvider),
    apiClient: ref.watch(linkraiApiClientProvider),
    tokenStorage: ref.watch(secureTokenStorageProvider),
  );
});
