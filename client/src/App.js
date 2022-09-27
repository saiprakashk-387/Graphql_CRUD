import React, { useState, useEffect } from "react";
import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./Components/Header";
import Tablecomponent from "./Components/Tablecomponent";
import { UserProvider } from "./Context/MyContext";
 import InitlaLoader from "./Components/InitlaLoader";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 18000); ///18 seconds//
  }, []);
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <div className="App">
      {loading ? (
        <InitlaLoader/>
      ) : (
        <ApolloProvider client={client}>
          <UserProvider>
            <Header />
            <Tablecomponent />
          </UserProvider>
        </ApolloProvider>
      )}
    </div>
  );
}

export default App;
