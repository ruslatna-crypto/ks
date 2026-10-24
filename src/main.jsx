import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App, { getPageComponentForPath } from './App.jsx';
import './styles/index.css';

async function bootstrap() {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const app = (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    // Preload current page component before hydrating so initial UI matches SSG HTML synchronously
    const targetComponent = getPageComponentForPath(window.location.pathname);
    if (targetComponent && typeof targetComponent.preload === 'function') {
      try {
        await targetComponent.preload();
      } catch (err) {
        console.error('Failed to preload route component for hydration:', err);
      }
    }
    ReactDOM.hydrateRoot(rootElement, app);
  } else {
    ReactDOM.createRoot(rootElement).render(app);
  }
}

bootstrap();
