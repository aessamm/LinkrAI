import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../application/auth_controller.dart';
import 'auth_scaffold.dart';
import 'auth_status_banner.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
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
      title: 'Create your account',
      subtitle: 'Start building your searchable link memory.',
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
                        : const Text('Register'),
              ),
            ],
          ),
        ),
        OutlinedButton(
          onPressed: () => context.go('/login'),
          child: const Text('I already have an account'),
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
        .register(_emailController.text, _passwordController.text);
  }

  String? _requiredEmail(String? value) {
    if (value == null || value.trim().isEmpty || !value.contains('@')) {
      return 'Enter a valid email.';
    }
    return null;
  }

  String? _requiredPassword(String? value) {
    if (value == null || value.length < 8) {
      return 'Use at least 8 characters.';
    }
    return null;
  }
}
