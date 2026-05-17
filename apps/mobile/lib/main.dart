import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'src/app/linkrai_app.dart';
import 'src/core/config/app_config.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (AppConfig.fromEnvironment().isSupabaseConfigured) {
    await Supabase.initialize(
      url: AppConfig.fromEnvironment().supabaseUrl,
      anonKey: AppConfig.fromEnvironment().supabaseAnonKey,
    );
  }

  runApp(const ProviderScope(child: LinkraiApp()));
}
