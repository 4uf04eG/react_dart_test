import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';

class GreetingPage extends StatefulWidget {
  const GreetingPage({Key? key}) : super(key: key);

  @override
  _GreetingPageState createState() => _GreetingPageState();
}

class _GreetingPageState extends State<GreetingPage> {
  var texts = [
    _textConstructor('Hi!'),
    _textConstructor('How are you?'),
    _textConstructor('Enter your login and password'),
  ];

  var tapCount = 0;

  static AnimatedText _textConstructor(String text) {
    return TypewriterAnimatedText(
      text,
      textStyle: const TextStyle(
        fontSize: 32.0,
        fontWeight: FontWeight.bold,
      ),
      speed: const Duration(milliseconds: 200),
    );
  }

  void _onTap() {
    tapCount++;

    if (tapCount == 1) {
      setState(() {
        texts = [
          _textConstructor("Please don't touch it"),
        ];
      });
    }

    if (tapCount == 2) {
      setState(() {
        texts = [
          _textConstructor('I SAID DO NOT TOUCH IT!!!'),
        ];
      });
    }

    if (tapCount == 3) {
      setState(() {
        texts = [
          _textConstructor('😡😡😡'),
        ];
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedTextKit(
        animatedTexts: texts,
        stopPauseOnTap: true,
        onTap: _onTap,
      ),
    );
  }
}
