import 'package:flutter/material.dart';

class LinkraiTheme {
  static const _navy = Color(0xFF10233F);
  static const _blue = Color(0xFF2563EB);
  static const _orange = Color(0xFFF97316);
  static const _surface = Color(0xFFF7F9FC);
  static const _darkSurface = Color(0xFF0D1726);

  static ThemeData get light {
    final scheme = ColorScheme.fromSeed(
      seedColor: _blue,
      brightness: Brightness.light,
      primary: _blue,
      secondary: _orange,
      surface: _surface,
    );
    return _base(scheme).copyWith(scaffoldBackgroundColor: _surface);
  }

  static ThemeData get dark {
    final scheme = ColorScheme.fromSeed(
      seedColor: _blue,
      brightness: Brightness.dark,
      primary: Color(0xFF7CB3FF),
      secondary: _orange,
      surface: _darkSurface,
    );
    return _base(scheme).copyWith(scaffoldBackgroundColor: _darkSurface);
  }

  static ThemeData _base(ColorScheme scheme) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      appBarTheme: AppBarTheme(
        centerTitle: false,
        backgroundColor: scheme.surface,
        foregroundColor: scheme.onSurface,
        elevation: 0,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: scheme.outlineVariant),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          minimumSize: const Size.fromHeight(48),
          backgroundColor: scheme.primary,
          foregroundColor: scheme.onPrimary,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size.fromHeight(48),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
      textTheme: const TextTheme(
        headlineMedium: TextStyle(fontWeight: FontWeight.w700, color: _navy),
        titleLarge: TextStyle(fontWeight: FontWeight.w700),
      ),
    );
  }
}
