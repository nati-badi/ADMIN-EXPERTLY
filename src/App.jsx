import { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const routeElements = useRoutes(
    routes.map((route) => {
      if (route.element && route.element.type?.name === "AdminLayout") {
        return {
          ...route,
          element: <route.element.type isSignedIn={isSignedIn} />,
        };
      }
      return route;
    })
  );

  return routeElements;
}

export default App;
