import React from 'react';
import {RTCView} from 'react-native-webrtc';

export default function Video({stream}) {
  return <RTCView streamURL={stream.toURL()} style={{flex: 1}} />;
}
