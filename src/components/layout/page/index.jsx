import React from 'react';
import Box from '@mui/joy/Box';

import Theme from '@/components/theme';

export default function Page({ children, centered }) {
  return (
    <Theme>
      <Box
        component="main"
        sx={{
          width: '100%',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: centered ? 'center' : undefined,
          p: 2,
        }}
      >
        <Box width="100%" maxWidth="500px">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              p: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Theme>
  );
}
