import React from "react";
import {ApolloProvider} from "@apollo/client";
import client from './apollo/index'
import RoutesList from "./Routes";


const App: React.FC = () => {

  return (
    <>
        <ApolloProvider client={client}>
                <RoutesList/>
        </ApolloProvider>
    </>
  );
};

export default App;