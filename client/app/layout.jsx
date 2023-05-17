import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

import ContextProvider from "../context/context-provider";

const RootLayout = ({ children }) => {
  return (
    <html lang="fa-IR">
      <body>
        <ContextProvider>
          <Header />
          {children}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
