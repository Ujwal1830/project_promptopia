import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
  icons: {
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png'],
  }
};

const RootLayout = async  ({ children }) => {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Provider>
          {/* <div className="main" >
            <div className="gradients"></div>
          </div> */}
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
