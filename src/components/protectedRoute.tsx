import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
