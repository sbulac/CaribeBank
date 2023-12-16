import { Stack, Box, IconButton, Drawer, List, ListItem } from "@mui/material";
import StyledButton from "../../components/StyledButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/CaribeBank.png";
import { useState } from "react";
import StyledModal from "../StyledModal";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnVariant1, setBtnVariant1] = useState("contained");

  const [drawer, setDrawer] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = user;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={2}
    >
      <Stack direction="row" component={Link} to="/">
        <Box component="img" src={logo} width={{ xs: 200, sm: 300 }} />
      </Stack>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton size="large" onClick={() => setDrawer(true)}>
          <MenuIcon fontSize="large" color="primary" />
        </IconButton>
      </Box>

      <Drawer open={drawer} anchor="top" onClose={() => setDrawer(false)}>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ListItem>
            <StyledButton
              path={`/movements/${id}`}
              variant={btnVariant1}
              color={"primary"}
              sx={{
                flexGrow: 1,
                textTransform: "capitalize",
                fontSize: 16,
                color: "#eee",
                "&:hover": {
                  color: "#00877B",
                },
              }}
              setBtnVariant={setBtnVariant1}
            >
              Movimientos
            </StyledButton>
          </ListItem>
          <ListItem>
            <StyledModal />
          </ListItem>
        </List>
      </Drawer>

      <Stack display={{ xs: "none", sm: "flex" }} direction="row" spacing={2}>
        <StyledButton
          path={`/movements/${id}`}
          variant={btnVariant1}
          color={"primary"}
          sx={{
            textTransform: "capitalize",
            fontSize: 16,
            color: "#eee",
            "&:hover": {
              color: "#00877B",
            },
          }}
          setBtnVariant={setBtnVariant1}
        >
          Movimientos
        </StyledButton>

        <StyledModal />
      </Stack>
    </Stack>
  );
};

export default Header;
