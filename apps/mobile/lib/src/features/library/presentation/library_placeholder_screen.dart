import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../auth/application/auth_controller.dart';

class LibraryPlaceholderScreen extends ConsumerWidget {
  const LibraryPlaceholderScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    final user = authState.user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Library'),
        actions: [
          IconButton(
            tooltip: 'Log out',
            onPressed: () => ref.read(authControllerProvider.notifier).logout(),
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Hello${user?.email == null ? '' : ', ${user!.email}'}',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const SizedBox(height: 12),
              const Text(
                'Your saved links will appear here in Sprint 9. This screen confirms authentication and the GET /me API call.',
              ),
              const SizedBox(height: 24),
              if (authState.isLoading) const LinearProgressIndicator(),
              if (user != null)
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Signed in as'),
                        const SizedBox(height: 8),
                        Text(
                          user.email,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 8),
                        Text('User ID: ${user.id}'),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
