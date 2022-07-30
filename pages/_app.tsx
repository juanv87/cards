import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
import { UIProvider } from "../context/ui/UIProvider";
import { EntriesProvider } from "../context/entries";
import { ListsProvider } from "../context/lists";
import { NotesProvider } from "../context/notes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default MyApp;
