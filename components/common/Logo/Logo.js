import Link from 'next/link';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      maxHeight: '40px',
      maxWidth: '100%',
    },
  },
});

export default function Logo() {
  const classes = useStyles();

  return (
    <Link href="/" passHref>
      <a className={classes.link}>
        <img
          src="/logo.png"
          alt={process.env.NEXT_PUBLIC_APP_NAME}
        />
      </a>
    </Link>
  );
}