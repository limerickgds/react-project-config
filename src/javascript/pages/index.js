import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../../sass/app.scss';
import Header from '../components/header';

const MOUNT_NODE = document.getElementById('root');
const HH = 'hh';
ReactDOM.render(
  <Header className={styles.header} />,
  MOUNT_NODE
);
