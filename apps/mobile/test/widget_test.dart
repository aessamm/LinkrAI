import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:linkrai_mobile/src/app/linkrai_app.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  testWidgets('Linkrai app shows login screen', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: LinkraiApp()));
    await tester.pump();

    expect(find.text('Linkrai'), findsOneWidget);
    expect(find.text('Welcome back'), findsOneWidget);
    expect(find.byType(TextFormField), findsNWidgets(2));
  });
}
