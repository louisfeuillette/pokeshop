import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Typography, Stack, Badge, IconButton } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";

import { getCartItems } from "../../features/cart/carteSlice";

const Header = () => {
  const navigate = useNavigate();

  const cart = useSelector(getCartItems);

  const cartPrice = cart.reduce((acc, curr) => {
    return acc + curr.cardmarket.prices.averageSellPrice;
  }, 0);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100vw",
        height: "15vh",
        backgroundColor: "#242424",
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: 3,
        }}
      >
        <Box />
        <Typography
          variant="h1"
          sx={{ marginY: 2, textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Pokemon List
        </Typography>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ mr: 2 }}>
            {cartPrice.toFixed(2)}$
          </Typography>
          <IconButton
            size={"large"}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Badge badgeContent={cart.length} color="secondary">
              <FaCartShopping
                color="secondary"
                style={{ width: 30, height: 30 }}
              />
            </Badge>
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
