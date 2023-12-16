import { Stack, Typography, IconButton, Button } from "@mui/material";
import background from "../../assets/homeBackground.png";
import { Navigate, useNavigate } from "react-router-dom";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useState } from "react";
import Header from "../../components/Header";

const Home = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const navigation = useNavigate();

  const [showMoney, setShowMoney] = useState(true);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = () => {
    localStorage.clear();
    navigation("/login");
  };

  return (
    <Stack
      minHeight="100vh"
      bgcolor="#FEF5E7"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <Stack mt={10} spacing={4} alignItems="center">
        <Stack direction="row" spacing={1.5}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: 26, sm: 40 } }}
            fontWeight={300}
          >
            Bienvenido de nuevo
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: 26, sm: 40 } }}
            fontWeight={300}
            color="secondary"
          >
            {user.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 25, sm: 30 } }}
            color="primary"
            fontWeight={300}
          >
            Disponible
          </Typography>
          <IconButton onClick={() => setShowMoney(!showMoney)}>
            {showMoney ? (
              <VisibilityOffRounded color="primary" />
            ) : (
              <VisibilityRounded color="primary" />
            )}
          </IconButton>
        </Stack>
        <Stack>
          <Typography variant="h2">
            $ {showMoney ? user.money : "•••••"}
          </Typography>
        </Stack>
      </Stack>
      <Button
        sx={{
          position: "absolute",
          bottom: { xs: 5, md: 30 },
          left: { xs: 5, md: 30 },
          px: 3,
          textTransform: "inherit",
          fontSize: 18,
        }}
        variant="text"
        color="primary"
        onClick={onLogout}
      >
        Salir de la cuenta
      </Button>
    </Stack>
  );
};

export default Home;
