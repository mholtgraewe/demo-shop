import { Grid, AppBar, Toolbar, makeStyles } from '@material-ui/core';
import Searchbar from '../Searchbar';
import UserMenu from '../UserMenu';
import Logo from '../Logo';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    flexDirection: 'vertical',
    alignItems: 'center',
    flexBasis: '50%',
    flexGrow: 2,
    order: 1,
    '& img': {
      padding: theme.spacing(0.5, 0),
    },
  },
  menu: {
    display: 'flex',
    flexDirection: 'vertical',
    justifyContent: 'flex-end',
    flexBasis: '50px',
    flexGrow: 1,
    order: 2,
  },
  search: {
    flexGrow: 3,
    order: 3,
  },
  [theme.breakpoints.up('sm')]: {
    toolbar: {
      paddingBottom: 0,
    },
    logo: {
      flexBasis: 'auto',
      order: 1,
      padding: 0,
      '& img': {
        padding: 0,
      },
    },
    search: {
      order: 2,
      flexBasis: 'auto',
      marginBottom: 0,
    },
    menu: {
      order: 3,
      flexBasis: 'auto',
    },
  },
}));

export default function Navigation() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Grid container>
        <Grid item lg={2} />

        <Grid item xs={12} lg={8}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.logo}>
                <Logo />
              </div>

              <div className={classes.search}>
                <Searchbar />
              </div>

              <div className={classes.menu}>
                <UserMenu />
              </div>
            </Toolbar>
        </Grid>

        <Grid item lg={2} />
      </Grid>
    </AppBar>
  );
}