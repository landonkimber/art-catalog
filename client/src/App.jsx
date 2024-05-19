import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <Home />;
    }
  };

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        {renderContent()}
      </div>
    </ApolloProvider>
  );
}

export default App;
