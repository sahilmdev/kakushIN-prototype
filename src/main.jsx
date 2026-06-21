import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { HealthScoreProvider } from './context/HealthScoreContext';
import { AdminProvider } from './context/AdminContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AdminProvider>
          <HealthScoreProvider>
            <App />
          </HealthScoreProvider>
        </AdminProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
