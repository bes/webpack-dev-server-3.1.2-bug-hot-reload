import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { HelloWorld } from "./hello-world";

const target = document.getElementById("root");

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    target
  );
};

render(HelloWorld);

if (module.hot) {
  module.hot.accept('./hello-world', () => {
    render(HelloWorld);
  });
}
