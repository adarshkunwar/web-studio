import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import GetAllUser from "./pages/gettAllUser";
import ProtectedRoute from "./components/protectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GetAllUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
