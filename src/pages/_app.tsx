import store from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/styles/Base.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>

}
