import React from "react";
import classes from "./ProductPage.module.css";
import PageRight from "./PageRight";
import PageLeft from "./PageLeft";
import PageMiddle from "./PageMiddle";
import withRouter from "../../withRouter/WithRouter";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
const GetData = gql`
  query GetData($id: String!) {
    product(id: $id) {
      id
      brand
      description
      inStock
      gallery
      attributes {
        id
        items {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          symbol
          label
        }
      }
    }
  }
`;

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { largeImg: " " };
    this.getImage = this.getImage.bind(this);
  }

  getImage(e) {
    if (e.target.getAttribute("id") === "image") {
      const src = e.target.getAttribute("src");
      this.setState({ largeImg: src });
    }
  }

  render() {
    return (
      <div className={classes.container}>
        <Query
          pollInterval={1000}
          query={GetData}
          variables={{ id: this.props.router.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) return <h1>Error...</h1>;

            return (
              <React.Fragment>
                <PageLeft
                  getImage={this.getImage}
                  images={data.product.gallery}
                />
                <PageMiddle
                  instock={data.product.instock}
                  images={data.product.gallery}
                  largeImg={this.state.largeImg}
                  indexImg={data.product.gallery[0]}
                />
                <PageRight
                  id={data.product.id}
                  description={data.product.description}
                  brand={data.product.brand}
                  prices={data.product.prices}
                  attributes={data.product.attributes}
                  instock={data.product.inStock}
                  gallery={data.product.gallery}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(ProductPage);
