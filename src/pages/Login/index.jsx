import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Stack,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/Context";

import logo from "../../assets/CaribeBank.png";
import background from "../../assets/loginBackground.png";
import StyledInput from "../../components/StyledInput";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { onLogin } = useContext(AppContext);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        onLogin();
      }
    };

    // Agrega un event listener al montar el componente
    document.addEventListener("keydown", handleKeyPress);

    // Remueve el event listener al desmontar el componente
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onLogin]);

  return (
    <Stack
      minHeight="100vh"
      minWidth="100vw"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundImage: `url(${background})` }}
    >
      <Stack
        spacing={2.5}
        bgcolor="#eee"
        sx={{
          borderRadius: 1,
          py: 3,
          px: 3,
          width: { xs: "90%", sm: "50%", lg: "26%" },
        }}
        alignItems="center"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          spacing={{ xs: 0.6, sm: 1.5 }}
        >
          <Typography sx={{ fontSize: { xs: 20 }, fontWeight: 300 }}>
            Entra a tu cuenta
          </Typography>
          <Box
            component="img"
            sx={{ width: { xs: 120, sm: 160 } }}
            src={logo}
          />
        </Stack>
        <Stack spacing={2} width="100%">
          {/* account Input */}
          <StyledInput
            validation={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              minLength: {
                value: 3,
                message: "El numero de cuenta tiene minimo 3 digitos",
              },
              maxLength: {
                value: 3,
                message: "El numero de cuenta tiene maximo 3 digitos",
              },
            }}
            name={"Ingresa tu numero de cuenta"}
            type={"number"}
            id={"outlinedNumber"}
            sx={{
              "input::-webkit-inner-spin-button": {
                appearance: "none",
              },
            }}
          />
          {/* password input */}
          <StyledInput
            validation={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            }}
            name={"Ingresa tu numero de cuenta"}
            type={!showPassword ? "password" : "text"}
            id={"outlinedPassword"}
            sx={{
              "input::-webkit-inner-spin-button": {
                appearance: "none",
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(false)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOffRounded color="primary" />
                  ) : (
                    <VisibilityRounded color="primary" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          onClick={onLogin}
          fullWidth
          sx={{ color: "#eee", textTransform: "capitalize", fontSize: 18 }}
        >
          Ingresar
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
