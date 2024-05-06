import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import logo1 from 'src/assets/images/logo.svg';
import logo_s from 'src/assets/images/modi.svg';

import { RouterLink } from 'src/routes/components';
import { useSettingsContext } from '../settings';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const settings = useSettingsContext();
    console.log('🚀 ~ settings:', settings.themeLayout);

    const isMini = settings.themeLayout === 'mini';

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          // width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <img src={isMini ? logo_s : logo1} alt="logo" style={{ width: '160px' }} />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
