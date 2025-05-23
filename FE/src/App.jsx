import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/Routes";
import { AuthProvider } from "./store/AuthContext";
import { TitleProvider } from "./store/TitleContext";

function App() {
  return (
    <>
      <AuthProvider>
        <TitleProvider>
          <RouterProvider router={router} />
        </TitleProvider>
      </AuthProvider>
    </>
  );
}

export default App;
