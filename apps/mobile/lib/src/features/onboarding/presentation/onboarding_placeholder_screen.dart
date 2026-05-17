import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class OnboardingPlaceholderScreen extends StatelessWidget {
  const OnboardingPlaceholderScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Linkrai')),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Your AI memory for saved links.',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const SizedBox(height: 16),
              const Text(
                'Onboarding will guide language, notifications, and share-flow setup in a later sprint.',
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () => context.go('/library'),
                child: const Text('Continue'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
