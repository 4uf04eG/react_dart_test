@JS()
library f;

import 'dart:html';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:js/js.dart';
import 'package:qr_flutter/qr_flutter.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  void addHtml() {
    ui.platformViewRegistry.registerViewFactory(
        'insert-div',
        (int viewId) => IFrameElement()
          ..width = '900'
          ..height = '360'
          ..allow = 'camera *;microphone *'
          ..src = 'https://gtuner.herokuapp.com/'
          ..style.border = 'none');

    ui.platformViewRegistry.registerViewFactory(
        'webcam',
        (int viewId) => IFrameElement()
          ..width = '500'
          ..height = '360'
          ..allow = 'camera *;microphone *'
          ..src = 'https://webcammictest.com/'
          ..style.border = 'none');
  }

  @override
  void initState() {
    addHtml();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                content: SizedBox(width: 500, child: HtmlElementView(viewType: 'insert-div')),
              );
            },
          );
        },
        child: Column(
          children: [
            QrImage(
              data: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              version: QrVersions.auto,
              size: 200,
            ),
            SizedBox(width: 8),
            Expanded(child: HtmlElementView(viewType: 'webcam'))
          ],
        ),
      ),
    );
  }
}
