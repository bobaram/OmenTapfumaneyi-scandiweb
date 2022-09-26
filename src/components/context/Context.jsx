import React from "react";

const Context = React.createContext();
class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.getCartObject = this.getCartObject.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.getCartBool = this.getCartBool.bind(this);
    this.getCurrBool = this.getCurrBool.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.state = {
      currency: "$",
      cartObject: JSON.parse(window.sessionStorage.getItem("cartObject")) || [],
      currBool: false,
      cartBool: false,
      cartTotal: 0,
      cartQuantity: 0,
    };
  }
  updateTotal(obj) {
    if (obj.action === "add") {
      this.setState({
        cartObject: this.state.cartObject.map((item, index) => {
          if (item.uniqueID === obj.uniqueID) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        }),
      });
    }
    if (obj.action === "minus") {
      this.setState({
        cartObject: this.state.cartObject.map((item, index) => {
          if (item.uniqueID === obj.uniqueID) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        }),
      });
    }
  }
  clearCart() {
    this.setState({ cartObject: [] });
  }

  getCurrBool(bool) {
    this.setState({ currBool: bool });
  }
  getCartBool(bool) {
    this.setState({ cartBool: bool });
  }

  getCurrency(curr) {
    this.setState({ currency: curr });
  }
  getCartObject(object) {
    this.setState({ cartObject: [...this.state.cartObject, object] });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartObject !== this.state.cartObject) {
      window.sessionStorage.setItem(
        "cartObject",
        JSON.stringify(this.state.cartObject)
      );
      let sum = 0;
      let itemCount = 0;
      for (let obj of this.state.cartObject) {
        itemCount += obj.amount;
        for (let price of obj.prices) {
          if (price.currency.symbol === this.state.currency) {
            let newSum = price.amount * obj.amount;
            sum += newSum;
            break;
          }
        }
      }
      this.setState({ cartTotal: sum.toFixed(2), cartQuantity: itemCount });
    }
    if (prevState.currency !== this.state.currency) {
      let sum = 0;
      for (let obj of this.state.cartObject) {
        for (let price of obj.prices) {
          if (price.currency.symbol === this.state.currency) {
            sum += price.amount;
            break;
          }
        }
      }
      this.setState({ cartTotal: sum });
    }
  }
  render() {
    const cartQuantity = this.state.cartQuantity;
    const updateTotal = this.updateTotal;
    const currency = this.state.currency;
    const cartObject = this.state.cartObject;
    const getCartObject = this.getCartObject;
    const getCurrency = this.getCurrency;
    const getCurrBool = this.getCurrBool;
    const getCartBool = this.getCartBool;
    const cartBool = this.state.cartBool;
    const currBool = this.state.currBool;
    const clearCart = this.clearCart;
    const cartTotal = this.state.cartTotal;
    return (
      <Context.Provider
        value={{
          cartQuantity,
          updateTotal,
          cartTotal,
          clearCart,
          currency,
          cartObject,
          getCurrency,
          getCartObject,
          cartBool,
          currBool,
          getCartBool,
          getCurrBool,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
export { ContextProvider };
