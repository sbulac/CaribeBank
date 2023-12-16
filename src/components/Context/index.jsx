import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseUrl = "https://bank.jedidiazfagundez.site/api";
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = handleSubmit(
    ({ outlinedNumber: account, outlinedPassword: password }) => {
      try {
        axios
          .post(`${baseUrl}/login`, { account, password })
          .then(({ data: { token, user } }) => {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            navigation("/");
          });
      } catch (error) {
        console.error(error);
      }
    }
  );

  const onTransfer = handleSubmit(
    ({ outlinedNumberReceive: accountReceive, outlinedMoney: money }) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const { id } = JSON.parse(user);
      try {
        axios
          .post(`${baseUrl}/movements`, {
            amount: parseInt(money),
            token,
            account_recive: accountReceive,
            id,
          })
          .then(({ data: { new_money } }) => {
            let user = JSON.parse(localStorage.getItem("user"));
            user = {
              ...user,
              money: new_money,
            };
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(user));
            location.reload("/");
          });
      } catch (error) {
        console.error(error);
      }
    }
  );

  return (
    <AppContext.Provider
      value={{ register, errors, onLogin, onTransfer, baseUrl }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
