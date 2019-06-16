import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option',
]);

export default function App() {
  return <Routes />;
}
