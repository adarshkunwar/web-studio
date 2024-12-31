import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import GetAllUser from "./pages/gettAllUser";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<GetAllUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
