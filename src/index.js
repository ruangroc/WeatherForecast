/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
  @import '~leaflet/dist/leaflet.css';
  body {
    font-family: 'Noto Sans JP', sans-serif;
    background: #BCE1F0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
