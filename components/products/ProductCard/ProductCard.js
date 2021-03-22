import Image from 'next/image';
import Link from 'next/link';
import {
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
  CardContent,
  Button,
} from '@material-ui/core';
import { toImageUrl, toCurrency } from '../../../lib/utils';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actionArea: {
    overflow: 'hidden',
  },
  media: {
    textAlign: 'center',
    margin: theme.spacing(2),
    transitionProperty: 'all',
    transitionDuration: 700,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    transform: 'scale(1)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  content: {
    flexGrow: 2,
    paddingTop: theme.spacing(1),
    paddingBottom: 0,
  },
  actions: {
    padding: theme.spacing(0, 2, 2, 2),
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    width: '100%',
    paddingTop: theme.spacing(2),
  },
}));

export default function ProductCard({ product }) {
  const { query } = useRouter();
  const classes = useStyles();
  const ariaLabel = `View details of ${product.name}`;

  const link = {
    pathname: '/products/[slug]',
    query: {
      slug: product.slug,
      term: query.term,
    },
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia className={classes.media}>
          <Link href={link} passHref>
            <a aria-label={ariaLabel}>
              <Image
                src={toImageUrl(product.image?.url)}
                alt={product.name}
                width={400}
                height={400}
                objectFit="contain"
              />
            </a>
          </Link>
        </CardMedia>
      </CardActionArea>

      <CardContent className={classes.content}>
        <Typography variant="body1" gutterBottom align="center">
          {product.name}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <div className={classes.actionsWrapper}>
          <Typography variant="h6" color="primary">
            {toCurrency(product.price)}
          </Typography>
          <Link href={link} passHref>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              aria-label={ariaLabel}
            >
              View
            </Button>
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}