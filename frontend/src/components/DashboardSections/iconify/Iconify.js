import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon: IconComponent, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} sx={{ width, height: width, ...sx }} {...other}>
    <IconComponent />
  </Box>
));

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.elementType,  // change this line to accept a MUI Icon component
};

export default Iconify;