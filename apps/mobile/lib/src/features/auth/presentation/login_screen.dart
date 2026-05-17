import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../application/auth_controller.dart';
import 'auth_scaffold.dart';
import 'auth_status_banner.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authControllerProvider);

    return AuthScaffold(
      title: 'Welcome back',
      subtitle: 'Log in to sync your saved link memory.',
      children: [
        AuthStatusBanner(
          errorMessage: authState.errorMessage,
          infoMessage: authState.infoMessage,
        ),
        Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: _requiredEmail,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _passwordController,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'Password'),
                validator: _requiredPassword,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: authState.isLoading ? null : _submit,
                child:
                    authState.isLoading
                        ? const SizedBox.square(
                          dimension: 22,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                        : const Text('Log in'),
              ),
            ],
          ),
        ),
        TextButton(
          onPressed: () => context.go('/forgot-password'),
          child: const Text('Forgot password?'),
        ),
        OutlinedButton(
          onPressed: () => context.go('/register'),
          child: const Text('Create account'),
        ),
      ],
    );
  }

  Future<void> _submit() async {
    if (!(_formKey.currentState?.validate() ?? false)) {
      return;
    }

    await ref
        .read(authControllerProvider.notifier)
        .login(_emailController.text, _passwordController.text);
  }

  String? _requiredEmail(String? value) {
    if (value == null || value.trim().isEmpty || !value.contains('@')) {
      return 'Enter a valid email.';
    }
    return null;
  }

  String? _requiredPassword(String? value) {
    if (value == null || value.length < 6) {
      return 'Enter your password.';
    }
    return null;
  }
}
