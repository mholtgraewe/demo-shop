import { makeStyles, Box, Typography, Link } from '@material-ui/core';
import fontColor from '@material-ui/core/colors/indigo';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  typography: {
    fontSize: '0.7rem',
    lineHeight: '0.9rem',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box
      component="footer"
      textAlign="center"
      py={2}
      color={fontColor}
      fontSize="small"
      className={classes.root}
    >
      <Typography className={classes.typography}>
        Created with Next.js, Material-UI and Strapi<br />
        Marcus Holtgräwe &copy; 2021
        {' | '}
        <Link
          href={process.env.NEXT_PUBLIC_SOURCE_URL}
          color="secondary"
          target="_blank"
          rel="noreferrer"
        >
          source code
        </Link>
      </Typography>
    </Box>
  );
}