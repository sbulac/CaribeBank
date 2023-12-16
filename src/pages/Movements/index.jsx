import { Stack } from "@mui/material";
import Header from "../../components/Header";
import background from "../../assets/homeBackground.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../components/Context";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "amount", headerName: "Monto", width: 70 },
  { field: "name_user_send", headerName: "Username Send", width: 150 },
  { field: "account_usuario_send", headerName: "Account Send", width: 150 },
  { field: "name_user_recive", headerName: "Username Recive", width: 150 },
  { field: "account_usuario_recive", headerName: "Account Recive", width: 150 },
];

const Movements = () => {
  const { baseUrl } = useContext(AppContext);
  const { id } = JSON.parse(localStorage.getItem("user"));

  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const getMovements = async () => {
      try {
        axios.get(`${baseUrl}/movements/${id}`).then(({ data }) => {
          const newMovements = data.map((item) => {
            return {
              id: item.id_transaction,
              amount: item.amount,
              name_user_send: item.name_user_send,
              account_usuario_send: item.account_usuario_send,
              name_user_recive: item.name_user_recive,
              account_usuario_recive: item.account_usuario_recive,
            };
          });

          setMovements(newMovements.reverse());
        });
      } catch (error) {
        console.error(error);
      }
    };
    getMovements();
  }, []);

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
      <Stack
        alignSelf="center"
        alignItems="center"
        sx={{ width: { xs: "95%" } }}
        flexGrow={1}
        my={2}
      >
        <DataGrid
          sx={{
            width: { xs: "95%", md: "auto" },
          }}
          autoPageSize
          disableColumnFilter
          rows={movements}
          columns={columns}
        />
      </Stack>
    </Stack>
  );
};

export default Movements;
