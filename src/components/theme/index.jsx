import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import React from 'react';

export const theme = extendTheme({});

export default function Theme({ children }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
