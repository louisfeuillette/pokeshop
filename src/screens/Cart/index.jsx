import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { getCartItems } from "../../features/cart/carteSlice";

const Cart = () => {
  const cart = useSelector(getCartItems);

  const cartRendered = Object.values(
    cart.reduce((acc, card) => {
      if (!acc[card.name]) {
        acc[card.name] = {
          id: card.id,
          name: card.name,
          quantity: 0,
          price: card.cardmarket.prices.averageSellPrice,
        };
      }
      acc[card.name].quantity += 1;
      return acc;
    }, {})
  );

  console.log(cartRendered);

  return (
    <Container maxWidth={false} sx={{ height: "85vh" }}>
      {cart.length ? (
        <TableContainer component={Paper} sx={{ maxWidth: 850 }}>
          <Table aria-label="cart-pokemon-caard">
            <TableHead>
              <TableRow>
                <TableCell>Card Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartRendered.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.name}</TableCell>
                  <TableCell align="right">{card.quantity}</TableCell>
                  <TableCell align="right">{card.price}</TableCell>
                  <TableCell align="right">
                    {card.price * card.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h4" sx={{ fontWeight: "700" }}>
          Cart is empty
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
