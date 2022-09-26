import classes from "./Product.module.css";
import React from "react";
import ProductCart from "../../svg/ProductCart";
import withRouter from "../withRouter/WithRouter";
import Context from "../context/Context";

class Product extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showCart: false, showForm: false };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }
  handleForm(event) {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const data = {
      brand: this.props.product.brand,
      id: this.props.id,
      prices: this.props.product.prices,
      gallery: this.props.product.gallery,
      features: [],
      attributes: this.props.product.attributes,
      amount: 1,
      uniqueID:
        "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
    };
    for (let [key, value] of formData.entries()) {
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
    this.setState({ showForm: !this.state.showForm });
  }

  closeModal(e) {
    if (e.target.getAttribute("id") === "overlay" && this.state.showModal) {
      this.setState({ showModal: false });
    }
  }

  mouseEnter() {
    this.setState({ showCart: true });
  }

  mouseLeave() {
    this.setState({ showCart: false });
  }
  handleClicks(e) {
    if (
      e.target.getAttribute("id") === "imageCont" ||
      e.target.getAttribute("id") === "image"
    ) {
      this.props.router.navigate(`/product-page/${this.props.product.id}`);
    }
    if (e.target.getAttribute("id") === "openCart") {
      this.setState({ showForm: true });
    }
    if (e.target.getAttribute("id") === "cancel") {
      this.setState({ showForm: false });
    }
  }
  render() {
    return (
      <div
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.handleClicks}
        className={classes.container}
      >
        {this.state.showForm && (
          <form onSubmit={this.handleForm}>
            {this.props.product.inStock &&
              this.props.product.attributes.map((attribute, index) => {
                return (
                  <React.Fragment key={Math.random() * index}>
                    <label htmlFor={attribute.id}>{attribute.id} </label>

                    <select id={attribute.id} name={attribute.id}>
                      {attribute.items.map((item, index) => {
                        return (
                          <React.Fragment key={Math.random() * index}>
                            {attribute.id === "Color" ? (
                              <option
                                key={Math.random() * index}
                                value={item.value}
                                style={{ backgroundColor: item.value }}
                              >
                                {item.displayValue}
                              </option>
                            ) : (
                              <option
                                key={Math.random() * index}
                                value={item.value}
                              >
                                {item.displayValue}
                              </option>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </select>
                  </React.Fragment>
                );
              })}
            {!this.props.product.inStock && <h3>OUT OF STOCK...</h3>}
            <div className={classes.buttons}>
              <button id="cancel" className={classes.cancel}>
                CANCEL
              </button>
              <button
                disabled={!this.props.product.inStock}
                className={`${classes.submit} ${
                  !this.props.product.inStock ? classes.disabled : ""
                }`}
                type="submit"
              >
                ADD TO CART
              </button>
            </div>
          </form>
        )}
        {!this.state.showForm && (
          <>
            {" "}
            <div
              id="imageCont"
              className={`${classes.image} ${
                this.props.product.inStock ? " " : classes.overlay
              }`}
            >
              <img id="image" src={this.props.product.gallery[0]} alt="nice" />
              <div
                id="openCart"
                className={` ${classes.cartCont} ${
                  this.state.showCart ? classes.show : " "
                }`}
              >
                <ProductCart className={classes.cart} />
              </div>
            </div>
            <div className={classes.text}>
              <h2 className={classes.title}>{this.props.product.id}</h2>
              {this.props.product.prices.map((price, index) => {
                if (price.currency.symbol === this.context.currency) {
                  return (
                    <span
                      key={Math.random() * index}
                      className={classes.price}
                    >{`${price.currency.symbol} ${price.amount}`}</span>
                  );
                }
                return (
                  <React.Fragment key={Math.random() * index}></React.Fragment>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

Product.contextType = Context;
export default withRouter(Product);
