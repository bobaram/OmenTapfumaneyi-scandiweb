import React from "react";
import classes from "./Products.module.css";
import Product from "./Product";
import FilterCont from "./Filters/FilterCont";
import withRouter from "../withRouter/WithRouter";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
const Data = gql`
  query GetData($id: String!) {
    category(input: { title: $id }) {
      products {
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        id
        gallery
        brand
        description
        inStock
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;
class Products extends React.Component {
  constructor() {
    super();
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(data) {
    let finalArr = [];
    const obj = {};
    for (let el of data.category.products) {
      for (let item of el.attributes) {
        for (let attr of item.items) {
          if (
            (attr.id =
              "Color" &&
              this.props.router.searchParams.get(item.id) &&
              this.props.router.searchParams.get(item.id) === attr.displayValue)
          ) {
            obj[el.id] = el;
            continue;
          }
          if (
            this.props.router.searchParams.get(item.id) &&
            this.props.router.searchParams.get(item.id) === attr.value
          ) {
            obj[el.id] = el;
          }
        }
      }
    }

    if (JSON.stringify(obj) !== "{}") {
      for (let el in obj) {
        finalArr.push(obj[el]);
      }
    }
    return finalArr;
  }

  render() {
    return (
      <div className={classes.plp}>
        <div className={classes.left}>
          <FilterCont />
        </div>
        <div className={classes.right}>
          <div className={classes.header}>
            <h2>
              {this.props.router.params.id.charAt(0).toUpperCase() +
                this.props.router.params.id.slice(1)}
            </h2>
          </div>
          <div className={classes.items}>
            <Query
              fetchPolicy="no-cache"
              query={Data}
              variables={{ id: this.props.router.params.id }}
            >
              {({ loading, error, data }) => {
                if (loading) return <h1>Loading...</h1>;
                if (error) return <h1>Error...</h1>;
                const newData = this.handleFilter(data);
                if (newData.length) {
                  return newData.map((product, index) => {
                    return (
                      <Product
                        id={product.id}
                        key={Math.random() * 1000 * index}
                        product={product}
                      />
                    );
                  });
                }
                return data.category.products.map((product, index) => {
                  return (
                    <Product
                      id={product.id}
                      key={Math.random() * 1000 * index}
                      product={product}
                    />
                  );
                });
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Products);
