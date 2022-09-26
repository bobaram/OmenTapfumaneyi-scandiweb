import React from "react";
import classes from "./MiniCartItem.module.css";
import Context from "../../context/Context";

class MiniCartItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { amount: 1 };
    this.getIndex = this.getIndex.bind(this);
  }
  getIndex(e) {
    if (e.target.getAttribute("id") === "add") {
      this.setState({ amount: this.state.amount + 1 });
      this.context.updateTotal({
        action: "add",
        uniqueID: this.props.uniqueID,
      });
    }
    if (e.target.getAttribute("id") === "minus" && this.state.amount > 1) {
      this.setState({ amount: this.state.amount - 1 });
      this.context.updateTotal({
        action: "minus",
        uniqueID: this.props.uniqueID,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.amount === 0) {
      this.setState({ amount: 1 });
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
          <div className={classes.image}>
            <img src={this.props.images[0]} alt="nature" />
          </div>
        </div>
      </div>
    );
  }
}
MiniCartItem.contextType = Context;
export default MiniCartItem;
