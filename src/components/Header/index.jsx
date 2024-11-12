import { Box, Typography, Stack, Badge, IconButton } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";

const Header = ({ cartQuantity }) => {
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
        <IconButton size={"large"}>
          <Badge badgeContent={cartQuantity} color="secondary">
            <FaCartShopping
              color="secondary"
              style={{ width: 30, height: 30 }}
            />
          </Badge>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Header;
