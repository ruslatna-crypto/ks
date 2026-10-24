import React, { createContext, useContext } from 'react';

const SSRMetaContext = createContext(null);

export const SSRMetaProvider = ({ value, children }) => (
  <SSRMetaContext.Provider value={value}>
    {children}
  </SSRMetaContext.Provider>
);

export const useSSRMeta = () => useContext(SSRMetaContext);
