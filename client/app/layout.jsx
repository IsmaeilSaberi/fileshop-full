import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

import ContextProvider from "../context/context-provider";

const RootLayout = ({ children }) => {
  return (
    <html lang="fa-IR">
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width ,initial-scale=1" />
        <link rel="shortcut icon" href="/ismaeil1.ico" type="image/x-icon" />
      </>
      <body>
        <ContextProvider>
          <Header />
          {children}
          {/* <Footer /> */}
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
