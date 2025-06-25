import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/Routes";
import { AuthProvider } from "./store/AuthContext";
import { TitleProvider } from "./store/TitleContext";
import { SearchProvider } from "./store/SearchContext";

function App() {
  return (
    <>
      <AuthProvider>
        <TitleProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </TitleProvider>
      </AuthProvider>
    </>
  );
}

export default App;
