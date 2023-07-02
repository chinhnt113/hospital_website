import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import moment from 'moment';
import localization from 'moment/locale/vi';

moment.updateLocale('vi', localization);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
