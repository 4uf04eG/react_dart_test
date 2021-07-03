@JS()
library callable_functions;

import 'package:english_words/english_words.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:js';
import 'package:js/js.dart';
import 'package:path/path.dart' as p;

void showAlert() {
  context.callMethod('alert', ['Success']);
}

@JS('getCoords')
external set _getCoords(Future<Position> Function() callback);

Future<Position> _determinePosition() async {
  bool serviceEnabled;
  LocationPermission permission;

  // Test if location services are enabled.
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    // Location services are not enabled don't continue
    // accessing the position and request users of the
    // App to enable the location services.
    return Future.error('Location services are disabled.');
  }

  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      // Permissions are denied, next time you could try
      // requesting permissions again (this is also where
      // Android's shouldShowRequestPermissionRationale
      // returned true. According to Android guidelines
      // your App should show an explanatory UI now.
      return Future.error('Location permissions are denied');
    }
  }

  if (permission == LocationPermission.deniedForever) {
    // Permissions are denied forever, handle appropriately.
    return Future.error(
        'Location permissions are permanently denied, we cannot request permissions.');
  }

  // When we reach here, permissions are granted and we can
  // continue accessing the position of the device.

  return await Geolocator.getCurrentPosition();
}

@JS('testFuture')
external set testFuture(Future<void> Function() callback);

Future<void> _testFuture() async {
  return Future.delayed(Duration(minutes: 1));
}

@JS('testPath')
external set testPath(Future<String> Function() callback);

Future<String> _testPath() async {
  return p.current;
}

@JS('getSyllables')
external set _getSyllablesNumber(int Function(String) callback);

int getSyllablesNumber(String message) {
  return message.split(' ').map((it) => syllables(it)).reduce((sum, n) => sum + n);
}

void initFunctions() {
  context['showAlert'] = allowInterop(showAlert);
  _getSyllablesNumber = allowInterop(getSyllablesNumber);
  _getCoords = allowInterop(_determinePosition);
  testFuture = allowInterop(_testFuture);
  testPath = allowInterop(_testPath);
}

