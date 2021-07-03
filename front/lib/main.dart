import 'package:example/pages/greeting_page.dart';
import 'package:example/pages/introduction_page.dart';
import 'package:example/pages/main_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

import 'functions.dart';

void main() {
  initFunctions();
  setUrlStrategy(PathUrlStrategy());
  runApp(MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      routes: {
        '/intro': (context) => Introduction(),
        '/greeting': (context) => GreetingPage(),
        '/main': (context) => MainPage(),
      },
      initialRoute: '/intro',
    );
  }
}
