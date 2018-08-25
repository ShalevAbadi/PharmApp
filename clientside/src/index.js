import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App user={{ name: 'Shalev', loggedAt: new Date() }} />, document.getElementById('root'));
registerServiceWorker();
