import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    '& > :first-child': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    '& > :last-child': {
      borderBottom: 'none',
    },
  },
  accordionDetails: {
    padding: theme.spacing(0),
  },
}));

export default function Filter({ name, options, isExpanded, toggleExpand }) {
  const classes = useStyles();
  const router = useRouter();

  const key = router.query[name];
  const selected = options.find(option => option.key === key) ?? options[0];
  const filteredOptions = options.filter(option => {
    return option.key !== selected?.key;
  });

  const handleSelect = async (option) => {
    await router.push({
      query: {
        ...router.query,
        [name]: option.key,
        page: 1,
      },
    });
    toggleExpand();
  };

  return (
    <Accordion expanded={isExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={toggleExpand}
      >
        <Typography>
          {selected.label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <List className={classes.list}>
          {filteredOptions.map(option => (
            <ListItem
              dense
              button
              divider
              key={option.key}
              onClick={() => handleSelect(option)}
            >
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>
     </AccordionDetails>
    </Accordion>
  );
}