import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./components/Context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Movements from "./pages/Movements";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movements/:id" element={<Movements />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
