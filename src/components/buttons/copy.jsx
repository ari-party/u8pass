import ContentCopy from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/joy/IconButton';
import propTypes from 'prop-types';
import React from 'react';

function Copy({ value }) {
  return (
    <IconButton onClick={() => navigator.clipboard.writeText(value)}>
      <ContentCopy />
    </IconButton>
  );
}

Copy.propTypes = {
  value: propTypes.any,
};

export default Copy;
