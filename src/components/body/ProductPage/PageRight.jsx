import React from "react";
import classes from "./PageRight.module.css";
import { Interweave } from "interweave";
import Context from "../../context/Context";

class PageRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClicks = this.handleClicks.bind(this);
    this.onsubmitForm = this.onsubmitForm.bind(this);
    this.addToCartHandle = this.addToCartHandle.bind(this);
    this.resetHandle = this.resetHandle.bind(this);
  }
  onsubmitForm(bool) {
    this.setState({ showModal: bool });
  }
  handleClicks(e) {
    const obj = {};
    if (e.target.dataset.value) {
      obj[e.target.dataset.parent] = e.target.dataset.value;
      this.setState({ ...obj });
    }
  }
  resetHandle() {
    let newObj = {};
    for (let key in this.state) {
      newObj[key] = null;
    }
    this.setState({ ...newObj });
  }
  addToCartHandle() {
    if (!this.props.instock) {
      return alert("Item Out Of Stock");
    }
    for (let el in this.state) {
      if (this.state[el] === null) {
        return alert("Select All Fields!");
      }
    }
    const data = {
      brand: this.props.brand,
      id: this.props.id,
      prices: this.props.prices,
      gallery: this.props.gallery,
      features: [],
      attributes: this.props.attributes,
      amount: 1,
      uniqueID:
        "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
    };

    for (let [key, value] of Object.entries(this.state)) {
      data.features.push({ [key]: value });
    }
    if (this.context.cartObject) {
      let numCheck = 0;
      for (let obj of this.context.cartObject) {
        for (let i = 0; i < obj.features.length; i++) {
          const values1 = Object.values(obj.features[i]);
          if (i === data.features.length) {
            break;
          }
          const values2 = Object.values(data.features[i]);
          if (values1[0] === values2[0]) {
            numCheck++;
          }
        }
        if (numCheck === obj.features.length) {
          numCheck = 0;
          return alert("Item With Similar Specs Already In Cart");
        }
        numCheck = 0;
      }
    }
    this.context.getCartObject(data);
    this.resetHandle();
  }

  componentDidMount() {
    const newObjs = {};

    this.props.attributes.map((item, index) => {
      return (newObjs[item.id] = null);
    });
    this.setState({ ...newObjs });
  }

  render() {
    return (
      <div onClick={this.handleClicks} className={classes.right}>
        <div className={classes.title}>
          <h3>{this.props.brand}</h3>
          <h2>{this.props.id}</h2>
        </div>
        {this.props.attributes.length === 0 ? (
          <div className={classes.size}>
            <h2>No Attributes Available!</h2>
          </div>
        ) : (
          this.props.attributes.map((product, index) => {
            if (product.id === "Color") {
              return (
                <div key={Math.random() * index} className={classes.size}>
                  <h4>{product.id}:</h4>
                  <div className={classes.sizes}>
                    {product.items.map((item, index) => {
                      return (
                        <div
                          data-parent={product.id}
                          data-value={item.value}
                          style={{
                            backgroundColor: item.value,
                          }}
                          key={Math.random() * index}
                          className={`${
                            this.state[product.id] === item.value
                              ? classes.colorSelect
                              : classes.colorBox
                          } `}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div key={Math.random() * index} className={classes.size}>
                <h4>{product.id}:</h4>
                <div className={classes.sizes}>
                  {product.items.map((item, index) => {
                    return (
                      <div
                        data-parent={product.id}
                        data-value={item.value}
                        key={Math.random() * index}
                        className={`${
                          this.state[product.id] === item.value
                            ? classes.boxSelect
                            : ""
                        } ${classes.sizeBox}`}
                      >
                        <span>{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        <div className={classes.price}>
          <h4>PRICE:</h4>
          {this.props.prices.map((price, index) => {
            if (price.currency.symbol === this.context.currency) {
              return (
                <span key={Math.random() * index} className={classes.price}>{`${
                  price.currency.symbol
                } ${price.amount.toFixed(2)}`}</span>
              );
            }
            return (
              <React.Fragment key={Math.random() * index}></React.Fragment>
            );
          })}
        </div>
        <button onClick={this.addToCartHandle} className={classes.button}>
          ADD TO CART
        </button>
        <div className={classes.description}>
          <Interweave content={this.props.description} />
        </div>
      </div>
    );
  }
}
PageRight.contextType = Context;
export default PageRight;
