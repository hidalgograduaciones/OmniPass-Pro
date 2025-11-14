
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './hooks/useLanguage';
import { AuthProvider } from './hooks/useAuth';
import { SocketProvider } from './hooks/useSocket';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);