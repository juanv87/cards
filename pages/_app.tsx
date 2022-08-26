import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
import { UIProvider } from "../context/ui/UIProvider";
import { EntriesProvider } from "../context/entries";
import { ListsProvider } from "../context/lists";
import { NotesProvider } from "../context/notes";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
