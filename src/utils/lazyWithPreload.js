import React from 'react';

/**
 * Enhanced lazy loading wrapper with synchronous fallback when preloaded.
 * Prevents Suspense fallback mismatches during React 18 hydration.
 */
export function lazyWithPreload(factory) {
  let LoadedComponent = null;
  let factoryPromise = null;

  function preload() {
    if (!factoryPromise) {
      factoryPromise = factory().then(module => {
        LoadedComponent = module.default || module;
        return LoadedComponent;
      });
    }
    return factoryPromise;
  }

  const LazyComponent = React.lazy(preload);

  const Component = React.forwardRef((props, ref) => {
    if (LoadedComponent) {
      return React.createElement(LoadedComponent, Object.assign({}, props, { ref }));
    }
    return React.createElement(LazyComponent, Object.assign({}, props, { ref }));
  });

  Component.preload = preload;
  return Component;
}
