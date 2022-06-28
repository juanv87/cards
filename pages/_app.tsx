import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
import { UIProvider } from "../context/ui/UIProvider";
import { EntriesProvider } from "../context/entries";
import { ListsProvider } from "../context/lists";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ListsProvider>
        <EntriesProvider>
          <UIProvider>
            <Component {...pageProps} />;
          </UIProvider>
        </EntriesProvider>
      </ListsProvider>
    </AuthProvider>
  );
}

export default MyApp;
