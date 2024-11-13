import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";

import { getCartItems, deleteItem } from "../../features/cart/carteSlice";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCartItems);

  const [cartItems, setCartItems] = useState([]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
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
    setCartItems(cartRendered);
  }, [cart]);

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
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.name}</TableCell>
                  <TableCell align="right">{card.quantity}</TableCell>
                  <TableCell align="right">{card.price}</TableCell>
                  <TableCell align="right">
                    {card.price * card.quantity}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(card.id)}
                    >
                      <FaTrash />
                    </IconButton>
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
