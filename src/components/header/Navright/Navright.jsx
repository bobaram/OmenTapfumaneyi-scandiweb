import React from "react";
import classes from "./Navright.module.css";
import ReactDOM from "react-dom";
import MiniCartItem from "./MiniCartItem";
import Context from "../../context/Context";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import withRouter from "../../withRouter/WithRouter";
import ArrowDown from "../../../svg/ArrowDown";
import ArrowUp from "../../../svg/ArrowUp";
import CartIcon from "../../../svg/CartIcon";
const currency = gql`
  query getItemsByCategory {
    currencies {
      label
      symbol
    }
  }
`;
class Navright extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "$",
      dropDown: false,
      showCart: false,
      total: 0,
    };
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleCart = this.handleCart.bind(this);
    this.closeDropDowns = this.closeDropDowns.bind(this);
  }

  closeDropDowns(e) {
    if (e.target.getAttribute("id") === "overlay") {
      this.setState({ showCart: false });
      this.setState({ dropDown: false });
    }
    if (
      e.target.getAttribute("id") === "viewBag" ||
      e.target.getAttribute("id") === "checkout"
    ) {
      this.setState({ showCart: false });
      this.setState({ dropDown: false });
      this.props.router.navigate(`/cart`);
    }
  }
  componentDidMount() {
    window.addEventListener("click", this.closeDropDowns);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currency !== this.state.currency) {
      this.context.getCurrency(this.state.currency);
    }
    if (prevState.dropDown !== this.state.dropDown) {
      this.context.getCurrBool(this.state.dropDown);
    }
    if (prevState.showCart !== this.state.showCart) {
      this.context.getCartBool(this.state.showCart);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.closeDropDowns);
  }
  handleCurrency(e) {
    if (e.target.classList.contains(classes.dropbtn)) {
      this.setState({ dropDown: !this.state.dropDown });
    }

    if (e.target.classList.contains(classes.currency)) {
      let currencyVal = e.target.dataset.id;
      this.setState({ currency: currencyVal });
      this.setState({ dropDown: !this.state.dropDown });
    }
  }
  handleCart(e) {
    if (e.target.classList.contains(classes.cartIcon)) {
      this.setState({ showCart: !this.state.showCart });
    }
  }

  render() {
    return (
      <div className={classes.rightNav}>
        <div className={`${classes.item} ${classes.currency} `}>
          <span> {this.state.currency}</span>
          <div onClick={this.handleCurrency} className={classes.dropdown}>
            {!this.state.dropDown && <ArrowDown className={classes.dropbtn} />}
            {this.state.dropDown && <ArrowUp className={classes.dropbtn} />}
            {ReactDOM.createPortal(
              <div
                className={`${classes.dropDownCont} ${
                  this.state.dropDown ? classes.show : ""
                }`}
              >
                <Query query={currency}>
                  {({ loading, error, data }) => {
                    if (loading) return <h1>Loading...</h1>;
                    if (error) return <h1>Error...</h1>;

                    return data.currencies.map((price, index) => {
                      return (
                        <span
                          key={Math.floor(index * 100)}
                          className={classes.currency}
                          data-id={price.symbol}
                        >
                          {`${price.symbol}  ${price.label}`}
                        </span>
                      );
                    });
                  }}
                </Query>
              </div>,
              document.getElementById("portal-root")
            )}
          </div>
        </div>
        <div className={`${classes.cartContainer} ${classes.item} `}>
          <CartIcon onClick={this.handleCart} className={classes.cartIcon} />
          {this.context.cartObject.length !== 0 && (
            <span className={classes.cartNum}>
              {this.context.cartObject.length}
            </span>
          )}
          {ReactDOM.createPortal(
            <div
              className={`${classes.cartDropDown} ${
                this.state.showCart ? classes.show : " "
              } `}
            >
              <h3 className={classes.heading}>
                {` My  Bag, ${this.context.cartObject.length}   
                Items`}
              </h3>

              <div className={classes.cartItems}>
                {this.context.cartObject ? (
                  this.context.cartObject.map((item, index) => {
                    return (
                      <MiniCartItem
                        uniqueID={item.uniqueID}
                        key={item.uniqueID}
                        id={item.id}
                        brand={item.brand}
                        prices={item.prices}
                        images={item.gallery}
                        features={item.features}
                        attributes={item.attributes}
                      />
                    );
                  })
                ) : (
                  <h1>No Items Available!</h1>
                )}
              </div>
              <div className={classes.total}>
                <span>Total</span>
                <span>{`${this.context.currency} ${this.context.cartTotal}`}</span>
              </div>
              <div className={classes.buttons}>
                <button
                  id="viewBag"
                  onClick={this.closeDropDowns}
                  className={classes.viewBag}
                >
                  View Bag
                </button>
                <button id="checkout" className={classes.checkout}>
                  Checkout
                </button>
              </div>
            </div>,
            document.getElementById("portal-root")
          )}

          {ReactDOM.createPortal(
            <div
              id="overlay"
              className={` ${this.state.showCart ? classes.backdrop : " "}`}
            ></div>,
            document.getElementById("backdrop-root")
          )}
        </div>
      </div>
    );
  }
}

Navright.contextType = Context;
export default withRouter(Navright);
