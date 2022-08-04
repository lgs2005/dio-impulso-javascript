import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserCardLoader from './UserCardLoader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div style={{ padding: 50 }}>
      <UserCardLoader username='lgs2005'/>
    </div>
  </React.StrictMode>
);