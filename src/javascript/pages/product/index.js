import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/header';
import styles from '../../../sass/app.scss';
import bgImage from '../../../../res/background.jpg';
import errorImage from '../../../../res/error.png';

const MOUNT_NODE = document.getElementById('root1');
ReactDOM.render(
  <Header className={styles.header} />,
  MOUNT_NODE
);
