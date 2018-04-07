import React from 'react';

import style from "./hello-world.module.less";

class HelloWorld extends React.Component {
  render() {
    return (
      <div className={style.someClass}>
        Hello world.
      </div>
    );
  }
}

export {
  HelloWorld,
};
