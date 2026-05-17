import 'package:flutter/material.dart';

class AuthScaffold extends StatelessWidget {
  const AuthScaffold({
    super.key,
    required this.title,
    required this.subtitle,
    required this.children,
  });

  final String title;
  final String subtitle;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 440),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Linkrai',
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Your AI memory for saved links.',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 40),
                  Text(title, style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 8),
                  Text(subtitle),
                  const SizedBox(height: 24),
                  ...children,
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
