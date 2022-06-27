import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
import { UIProvider } from "../context/ui/UIProvider";
import { EntriesProvider } from "../context/entries";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <EntriesProvider>
        <UIProvider>
          <Component {...pageProps} />;
        </UIProvider>
      </EntriesProvider>
    </AuthProvider>
  );
}

export default MyApp;
