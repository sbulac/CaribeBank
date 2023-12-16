import { Button, Modal, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import StyledButton from "../StyledButton";
import StyledInput from "../StyledInput";
import { AppContext } from "../Context";

const StyledModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [btnVariant2, setBtnVariant2] = useState("contained");

  const user = JSON.parse(localStorage.getItem("user"));

  const { onTransfer } = useContext(AppContext);

  return (
    <>
      <StyledButton
        variant={btnVariant2}
        color={"secondary"}
        sx={{
          flexGrow: { xs: 1, md: 0 },
          textTransform: "capitalize",
          fontSize: 16,
          color: "#eee",
          "&:hover": {
            color: "#F18517",
          },
        }}
        setBtnVariant={setBtnVariant2}
        onClick={() => setModalOpen(true)}
      >
        Transferir
      </StyledButton>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Stack
          spacing={3}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 600 },
            bgcolor: "background.paper",
            borderRadius: { xs: 2 },
            boxShadow: 24,
            px: { xs: 2, md: 4 },
            py: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: 28, textAlign: "center" }}
            color="primary"
          >
            ¡Realiza una transferencia!
          </Typography>
          <Stack spacing={1.5}>
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
              name={"Ingresa el numero de cuenta"}
              type={"number"}
              id={"outlinedNumberReceive"}
              sx={{
                "input::-webkit-inner-spin-button": {
                  appearance: "none",
                },
              }}
            />
            <StyledInput
              validation={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                validate: (value) => {
                  if (value < 50) {
                    return "El monto minimo de envio es de $50";
                  }
                  if (value > user.money) {
                    return "No tienes suficientes fondos";
                  }
                },
              }}
              name={"Ingresa el valor a transferir"}
              type={"number"}
              id={"outlinedMoney"}
              sx={{
                "input::-webkit-inner-spin-button": {
                  appearance: "none",
                },
              }}
            />
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={onTransfer}
            fullWidth
            sx={{ color: "#eee", textTransform: "capitalize", fontSize: 18 }}
          >
            Ingresar
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default StyledModal;
