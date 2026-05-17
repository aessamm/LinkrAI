import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../config/providers.dart';
import '../storage/providers.dart';
import 'linkrai_api_client.dart';

final linkraiApiClientProvider = Provider<LinkraiApiClient>((ref) {
  final config = ref.watch(appConfigProvider);
  final tokenStorage = ref.watch(secureTokenStorageProvider);
  return LinkraiApiClient(
    baseUrl: config.apiBaseUrl,
    tokenStorage: tokenStorage,
  );
});
