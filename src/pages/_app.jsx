import { MenuProvider } from "../context/MenuContext";
import "src/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <MenuProvider>
      <Component {...pageProps} />
    </MenuProvider>
  );
}