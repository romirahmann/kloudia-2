import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./store/AuthContext";
import { QuerySearchProvider } from "./store/QuerySearchContext";
import { router } from "./routes/Routes";
import { AlertProvider } from "./store/AlertContext";

function App() {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <QuerySearchProvider>
            <RouterProvider router={router} />
          </QuerySearchProvider>
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default App;
