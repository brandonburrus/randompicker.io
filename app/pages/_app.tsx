import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, storePersistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Pane, Spinner } from "evergreen-ui";

import "../styles/reset.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Pane
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Pane>
        }
        persistor={storePersistor}
      >
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
