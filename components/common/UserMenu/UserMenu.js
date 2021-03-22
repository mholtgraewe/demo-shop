import { Tooltip, IconButton, Badge } from '@material-ui/core';
import { useUiContext } from '../../../lib/contexts/UiContext';
import { useCartContext } from '../../../lib/contexts/CartContext';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function UserMenu() {
  const { isDrawerOpen, toggleDrawer } = useUiContext();
  const { items } = useCartContext();

  const tooltip = (isDrawerOpen ? 'Hide' : 'Show') + ' cart';
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tooltip title={tooltip} aria-label={tooltip}>
      <IconButton
        color="inherit"
        aria-label="shopping cart"
        onClick={toggleDrawer}
        edge="end"
      >
        <Badge
          color="secondary"
          badgeContent={quantity}
          invisible={quantity <= 0}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}