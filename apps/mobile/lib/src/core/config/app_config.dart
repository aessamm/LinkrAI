class AppConfig {
  const AppConfig({
    required this.apiBaseUrl,
    required this.supabaseUrl,
    required this.supabaseAnonKey,
  });

  factory AppConfig.fromEnvironment() {
    return const AppConfig(
      apiBaseUrl: String.fromEnvironment(
        'LINKRAI_API_BASE_URL',
        defaultValue: 'http://10.0.2.2:3000/api',
      ),
      supabaseUrl: String.fromEnvironment('SUPABASE_URL'),
      supabaseAnonKey: String.fromEnvironment('SUPABASE_ANON_KEY'),
    );
  }

  final String apiBaseUrl;
  final String supabaseUrl;
  final String supabaseAnonKey;

  bool get isSupabaseConfigured =>
      supabaseUrl.isNotEmpty && supabaseAnonKey.isNotEmpty;
}
