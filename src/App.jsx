// App.jsx
import { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const routeElements = useRoutes(routes(isSignedIn));

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {routeElements}
    </AuthContext.Provider>
  );
}

export default App;
