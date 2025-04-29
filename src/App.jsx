import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routeElements = useRoutes(routes());

  return (
    <AuthProvider>
      {routeElements}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
