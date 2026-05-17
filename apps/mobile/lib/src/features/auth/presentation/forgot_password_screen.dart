import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../application/auth_controller.dart';
import 'auth_scaffold.dart';
import 'auth_status_banner.dart';

class ForgotPasswordScreen extends ConsumerStatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  ConsumerState<ForgotPasswordScreen> createState() =>
      _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends ConsumerState<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authControllerProvider);

    return AuthScaffold(
      title: 'Reset password',
      subtitle: 'We will send a recovery link to your email.',
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
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: authState.isLoading ? null : _submit,
                child:
                    authState.isLoading
                        ? const SizedBox.square(
                          dimension: 22,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                        : const Text('Send reset link'),
              ),
            ],
          ),
        ),
        OutlinedButton(
          onPressed: () => context.go('/login'),
          child: const Text('Back to login'),
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
        .sendPasswordReset(_emailController.text);
  }

  String? _requiredEmail(String? value) {
    if (value == null || value.trim().isEmpty || !value.contains('@')) {
      return 'Enter a valid email.';
    }
    return null;
  }
}
