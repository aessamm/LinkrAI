class AppUser {
  const AppUser({
    required this.id,
    required this.email,
    this.displayName,
    this.profile,
  });

  factory AppUser.fromJson(Map<String, dynamic> json) {
    final profileJson = json['profile'];
    return AppUser(
      id: json['id'] as String? ?? '',
      email: json['email'] as String? ?? '',
      displayName: json['display_name'] as String?,
      profile:
          profileJson is Map<String, dynamic>
              ? UserProfile.fromJson(profileJson)
              : null,
    );
  }

  final String id;
  final String email;
  final String? displayName;
  final UserProfile? profile;
}

class UserProfile {
  const UserProfile({
    required this.preferredLanguage,
    this.timezone,
    required this.onboardingCompleted,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      preferredLanguage: json['preferred_language'] as String? ?? 'en',
      timezone: json['timezone'] as String?,
      onboardingCompleted: json['onboarding_completed'] as bool? ?? false,
    );
  }

  final String preferredLanguage;
  final String? timezone;
  final bool onboardingCompleted;
}
