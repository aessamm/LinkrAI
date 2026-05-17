import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../routing/app_router.dart';
import 'theme.dart';

class LinkraiApp extends ConsumerWidget {
  const LinkraiApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);

    return MaterialApp.router(
      title: 'Linkrai',
      debugShowCheckedModeBanner: false,
      theme: LinkraiTheme.light,
      darkTheme: LinkraiTheme.dark,
      routerConfig: router,
    );
  }
}
