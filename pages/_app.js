import LoginContext from "../context/LoginContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <LoginContext>
      <Component {...pageProps} />
    </LoginContext>
  );
}

export default MyApp;
