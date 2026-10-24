import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppSSR from './AppSSR';
import { SSRMetaProvider } from './context/SSRMetaContext';

export function render(url, initialMeta = {}) {
  const meta = { ...initialMeta };
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <SSRMetaProvider value={meta}>
        <StaticRouter location={url}>
          <AppSSR />
        </StaticRouter>
      </SSRMetaProvider>
    </React.StrictMode>
  );
  return { html, meta };
}
