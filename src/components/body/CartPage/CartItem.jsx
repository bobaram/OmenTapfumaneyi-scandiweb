import React from "react";
import classes from "./CartItem.module.css";

import Context from "../../context/Context";
import ArrowLeft from "../../../svg/ArrowLeft";
import ArrowRight from "../../../svg/ArrowRight";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 1, imgIndex: 0 };
    this.getIndex = this.getIndex.bind(this);
  }

  getIndex(e) {
    if (this.state.imgIndex > this.props.images.length) {
      this.setState({ imgIndex: 0 });
    }
    if (this.state.imgIndex < 0) {
      this.setState({ imgIndex: this.props.images.length });
    }
    if (e.target.getAttribute("id") === "add") {
      this.setState({ amount: this.state.amount + 1 });
      this.context.updateTotal({
        action: "add",
        uniqueID: this.props.uniqueID,
      });
    }
    if (e.target.getAttribute("id") === "minus" && this.state.amount > 1) {
      this.context.updateTotal({
        action: "minus",
        uniqueID: this.props.uniqueID,
      });
      this.setState({ amount: this.state.amount - 1 });
    }
    if (e.target.getAttribute("id") === "next") {
      this.setState({ imgIndex: this.state.imgIndex + 1 });
      console.log("i do");
    }
    if (e.target.getAttribute("id") === "prev") {
      this.setState({ imgIndex: this.state.imgIndex - 1 });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.amount === 0) {
      this.setState({ amount: 1 });
    }
    if (this.state.imgIndex === this.props.images.length) {
      this.setState({ imgIndex: 0 });
    }

    if (this.state.imgIndex < 0) {
      this.setState({ imgIndex: 0 });
    }
  }
  render() {
    return (
      <div className={classes.cartItem}>
        <div className={classes.left}>
          <h5 className={classes.brand}>{this.props.brand}</h5>
          <h4 className={classes.type}>{this.props.id}</h4>
          {this.props.prices.map((price, index) => {
            if (price.currency.symbol === this.context.currency) {
              return (
                <span key={Math.random() * index} className={classes.price}>{`${
                  price.currency.symbol
                } ${(price.amount * this.state.amount).toFixed(2)}`}</span>
              );
            }
            return (
              <React.Fragment key={Math.random() * index}></React.Fragment>
            );
          })}
          <div className={classes.sizes}>
            {this.props.attributes.map((item, index) => {
              if (item.id === "Color") {
                return (
                  <div
                    className={classes.attribute}
                    key={Math.random() * index}
                  >
                    <span>{item.id}: </span>
                    <div className={classes.boxes}>
                      {item.items.map((el, index) => {
                        for (let num of this.props.features) {
                          if (num[item.id] === el.value) {
                            return (
                              <div
                                style={{
                                  backgroundColor: el.value,
                                  border: "2px solid #5ece7b",
                                }}
                                key={Math.random() * index}
                                className={classes.box}
                              ></div>
                            );
                          }
                        }

                        return (
                          <div
                            style={{ backgroundColor: el.value }}
                            key={Math.random() * index}
                            className={classes.box}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              if (item.id !== "Color") {
                return (
                  <div
                    className={classes.attribute}
                    key={Math.random() * index}
                  >
                    <span>{item.id}: </span>
                    <div className={classes.boxes}>
                      {item.items.map((el, index) => {
                        for (let num of this.props.features) {
                          if (num[item.id] === el.value) {
                            return (
                              <div
                                style={{
                                  backgroundColor: "black",
                                }}
                                key={Math.random() * index}
                                className={classes.box}
                              >
                                <span
                                  style={{
                                    color: "#FFFFFF",
                                  }}
                                >
                                  {el.value}
                                </span>
                              </div>
                            );
                          }
                        }
                        return (
                          <div
                            key={Math.random() * index}
                            className={classes.box}
                          >
                            <span> {el.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <React.Fragment key={Math.random() * index}></React.Fragment>
              );
            })}
          </div>
        </div>
        <div className={classes.right}>
          <div onClick={this.getIndex} className={classes.numbers}>
            <div className={classes.sign}>
              <span id="add">+</span>
            </div>
            <div className={classes.amount}>
              <span>{`${this.state.amount}`}</span>
            </div>
            <div className={classes.sign}>
              <span id="minus">-</span>
            </div>
          </div>
          <div onClick={this.getIndex} className={classes.image}>
            <ArrowLeft id="prev" className={classes.prev} />
            <ArrowRight id="next" className={classes.next} />
            <img src={this.props.images[this.state.imgIndex]} alt="nature" />
          </div>
        </div>
      </div>
    );
  }
}
CartItem.contextType = Context;
export default CartItem;
