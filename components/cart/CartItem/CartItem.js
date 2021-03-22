import {
  makeStyles,
  Typography,
  IconButton,
  ButtonBase,
  InputBase,
  Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { toImageUrl, toCurrency } from '../../../lib/utils';
import { useUiContext } from '../../../lib/contexts/UiContext';
import { useCartContext } from '../../../lib/contexts/CartContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef } from 'react';
import useDebounce from '../../../lib/hooks/useDebounce';

const IMAGE_SIZE = 60;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0, 2, 0),
    display: 'flex',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  imageColumn: {
    display: 'flex',
    padding: theme.spacing(1),
    flex: `0 0 ${IMAGE_SIZE}px`,
    marginRight: theme.spacing(2),
    background: theme.palette.common.white,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  infoColumn: {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  description: {
    cursor: 'pointer',
    fontWeight: theme.typography.fontWeightMedium,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  iconButton: {
    color: theme.palette.text.secondary,
    '&:disabled': {
      color: theme.palette.text.secondary,
      pointerEvents: 'auto',
      cursor: 'wait',
    },
  },
  quantityInput: {
    width: '4ch',
    padding: '2px',
    textAlign: 'center',
    background: theme.palette.common.white,
    color: theme.palette.text.disabled,
    borderRadius: theme.shape.borderRadius,
  },
  priceColumn: {
    flex: '0 0 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  deleteButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
    '&:disabled': {
      color: theme.palette.text.secondary,
      pointerEvents: 'auto',
      cursor: 'wait',
    },
  },
}));

export default function CartItem({ item }) {
  const classes = useStyles();
  const router = useRouter();
  const { closeDrawer } = useUiContext();
  const { isLoading, updateItem } = useCartContext();
  const quantityRef = useRef(null);

  const goToProductPage = async () => {
    await router.push({
      pathname: '/products/[slug]',
      query: {
        ...router.query,
        slug: item.slug,
      },
    });
    closeDrawer();
  };

  const removeItemFromCart = () => {
    updateItem(item.productId, 0);
  };

  const updateQuantityDebounced = useDebounce(quantity => {
    updateItem(item.productId, quantity);
  }, 700);

  const updateQuantity = (value) => {
    const oldQuantity = parseInt(quantityRef.current.value, 10);
    const newQuantity = Math.max(oldQuantity + value, 1);
    quantityRef.current.value = newQuantity;
    updateQuantityDebounced(newQuantity);
  }

  return (
    <div className={classes.root}>
      <Divider />

      <div
        className={classes.imageColumn}
        onClick={goToProductPage}
      >
        <Image
          src={toImageUrl(item.thumbnail)}
          alt={item.name}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          objectFit="contain"
        />
      </div>

      <div className={classes.infoColumn}>
        <Typography
          variant="caption"
          onClick={goToProductPage}
          className={classes.description}
        >
          {item.name}
        </Typography>

        <div className={classes.controls}>
          <IconButton
            size="small"
            className={classes.iconButton}
            onClick={() => updateQuantity(-1)}
            disabled={isLoading}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <InputBase
            classes={{ input: classes.quantityInput }}
            defaultValue={item.quantity}
            inputRef={quantityRef}
            size="small"
            readOnly
          />
          <IconButton
            size="small"
            className={classes.iconButton}
            onClick={() => updateQuantity(1)}
            disabled={isLoading}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className={classes.priceColumn}>
        <Typography color="primary">
          {toCurrency(item.price * item.quantity)}
        </Typography>
        <ButtonBase
          disableRipple
          aria-label={`Remove ${item.name} from cart`}
          className={classes.deleteButton}
          onClick={removeItemFromCart}
          disabled={isLoading}
        >
          <DeleteIcon />
        </ButtonBase>
      </div>
    </div>
  );
}