import React from "react";
import classes from "./App.module.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Context from "./components/context/Context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div
          className={`${
            this.context.cartBool ? classes.noscroll : classes.App
          }`}
        >
          <Header />
          <Body />
        </div>
      </ApolloProvider>
    );
  }
}
App.contextType = Context;
export default App;
