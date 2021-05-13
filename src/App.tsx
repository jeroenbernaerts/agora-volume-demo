import './App.global.css';

import AgoraRTC, { IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import icon from '../assets/icon.svg';

const Hello = () => {
  const [microphoneTrack, setMicrophoneTrack] = useState<
    IMicrophoneAudioTrack
  >();

  useEffect(() => {
    let isMounted = true;
    let newMicrophoneTrack: IMicrophoneAudioTrack;
    const init = async () => {
      newMicrophoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
      newMicrophoneTrack.play();
      if (isMounted) {
        setMicrophoneTrack(newMicrophoneTrack);
      }
    };
    init();
    return () => {
      isMounted = false;
      newMicrophoneTrack?.stop();
      newMicrophoneTrack?.close();
    };
  }, []);

  // THIS DOES NOT WORK
  const changeFloorVolume = (volume: number) => {
    microphoneTrack?.setVolume(volume);
  };

  // THIS WORKS
  // (but not good when using a slider to change volume -> choppy audio when changing volume)
  // const changeFloorVolume = (volume: number) => {
  //   microphoneTrack?.stop();
  //   microphoneTrack?.setVolume(volume);
  //   microphoneTrack?.play();
  // };

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Volume Demo</h1>
      <div className="Hello">
        <button type="button" onClick={() => changeFloorVolume(100)}>
          Volume UP (100)
        </button>
        <button type="button" onClick={() => changeFloorVolume(0)}>
          Volume DOWN (0)
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
