import { fade, makeStyles, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
  },
}));

export default function Searchbar({ searchPath = '/', maxLength = 40 }) {
  const classes = useStyles();
  const router = useRouter();
  const [term, setTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Blur to hide keyboard on mobile
    document.activeElement.blur();

    router.push({
      pathname: searchPath,
      query: {
        ...router.query,
        page: 1,
        term,
      },
    });
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  useEffect(() => {
    setTerm(router.query.term ?? '');
  }, [router.query]);

  return (
    <form className={classes.search} onSubmit={handleSubmit}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search products…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={term}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'search products',
          maxLength,
        }}
      />
    </form>
  );
}