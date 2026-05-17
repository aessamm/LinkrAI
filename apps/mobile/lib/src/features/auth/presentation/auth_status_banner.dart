import 'package:flutter/material.dart';

class AuthStatusBanner extends StatelessWidget {
  const AuthStatusBanner({super.key, this.errorMessage, this.infoMessage});

  final String? errorMessage;
  final String? infoMessage;

  @override
  Widget build(BuildContext context) {
    final message = errorMessage ?? infoMessage;
    if (message == null || message.isEmpty) {
      return const SizedBox.shrink();
    }

    final isError = errorMessage != null;
    final scheme = Theme.of(context).colorScheme;
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isError ? scheme.errorContainer : scheme.secondaryContainer,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        message,
        style: TextStyle(
          color:
              isError ? scheme.onErrorContainer : scheme.onSecondaryContainer,
        ),
      ),
    );
  }
}
