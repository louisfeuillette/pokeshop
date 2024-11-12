import { Box, Typography, Stack, Badge, IconButton } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";

const Header = ({ cart }) => {
  const cartPrice = cart.reduce((acc, curr) => {
    return acc + curr.cardmarket.prices.averageSellPrice;
  }, 0);

  console.log(cartPrice);

  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
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
        <Typography variant="h1" sx={{ marginY: 2, textAlign: "center" }}>
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
          <IconButton size={"large"}>
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
