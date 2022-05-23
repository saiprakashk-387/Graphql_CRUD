import React from "react";
import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./Components/Header";
import Tablecomponent from "./Components/Tablecomponent";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  }); 
  
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Header />
        <Tablecomponent />
      </ApolloProvider>
      ,
    </div>
  );
}

export default App;
