import React from "react";
import Context from "../../context/Context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
class Cart extends React.Component {
  render() {
    if (this.context.cartObject.length === 0) {
      return (
        <div className={classes.cart}>
          <h1>Cart</h1>
          <h2>Cart Is Empty</h2>
        </div>
      );
    }

    return (
      <div className={classes.cartCont}>
        <div className={classes.cart}>
          <h1>Cart</h1>
          {this.context.cartObject.map((item, index) => {
            return (
              <CartItem
                key={item.uniqueID}
                uniqueID={item.uniqueID}
                id={item.id}
                brand={item.brand}
                prices={item.prices}
                images={item.gallery}
                features={item.features}
                attributes={item.attributes}
              />
            );
          })}
        </div>
        <div className={classes.info}>
          <span>
            Tax 21% :{" "}
            <strong>{(this.context.cartTotal * 0.21).toFixed(2)}</strong>
          </span>
          <span>
            Quantity : <strong>{this.context.cartQuantity}</strong>
          </span>
          <span>
            Total:{" "}
            <strong>{`${this.context.currency} ${this.context.cartTotal}`}</strong>
          </span>
          <button onClick={this.context.clearCart} className={classes.order}>
            ORDER
          </button>
        </div>
      </div>
    );
  }
}
Cart.contextType = Context;
export default Cart;
