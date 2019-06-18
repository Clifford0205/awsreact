import React from 'react';
import classes from './Main.module.css';
import Header from './Header/Header';
import FastLink from './FastLink/FastLink';
import Popular from './PopurlarLink/Popular';

const main = props => {
  return (
    <div className={classes.Main}>
      <Header />
      <div className={classes.HeaderBtm11} />
      {/* <FastLink />
      <Popular /> */}
    </div>
  );
};

export default main;
