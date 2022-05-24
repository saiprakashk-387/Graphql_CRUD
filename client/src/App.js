import React from "react";
import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./Components/Header";
import Tablecomponent from "./Components/Tablecomponent";
import { UserProvider } from "./Context/MyContext";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <UserProvider>
          <Header />
          <Tablecomponent />
        </UserProvider>
      </ApolloProvider>
      ,
    </div>
  );
}

export default App;
