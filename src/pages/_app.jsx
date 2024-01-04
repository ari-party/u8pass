import propTypes from 'prop-types';
import React from 'react';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: propTypes.any.isRequired,
  pageProps: propTypes.any.isRequired,
};

export default App;
