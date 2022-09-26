import React from "react";
import Filter from "./Filter";
import classes from "./FilterCont.module.css";
import withRouter from "../../withRouter/WithRouter";
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
      }
    }
  }
`;
class FilterCont extends React.Component {
  constructor() {
    super();
    this.filter = this.filter.bind(this);
  }
  filter(obj) {
    let cartArr = [];
    for (let el of obj.category.products) {
      for (let item of el.attributes) {
        let temp = {};
        temp.type = item.id;
        temp[item.id] = item.items;
        cartArr.push(temp);
      }
    }

    const newObj = {};
    const finalArr = [];
    for (let i = 0; i < cartArr.length; i++) {
      if (newObj[cartArr[i].type]) {
        if (
          newObj[cartArr[i].type][cartArr[i].type][0].value !==
          cartArr[i][cartArr[i].type][0].value
        ) {
          newObj[cartArr[i].type][cartArr[i].type] = [
            ...newObj[cartArr[i].type][cartArr[i].type],
            ...cartArr[i][cartArr[i].type],
          ];
        }
        continue;
      }
      newObj[cartArr[i].type] = cartArr[i];
    }
    for (let value of Object.values(newObj)) {
      finalArr.push(value);
    }
    return finalArr;
  }
  render() {
    return (
      <div className={classes.filterCont}>
        <h2>Filters</h2>
        <div className={classes.filters}>
          <Query
            fetchPolicy="no-cache"
            query={Data}
            variables={{ id: this.props.router.params.id }}
          >
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              if (error) return <h1>Error...</h1>;
              const newData = this.filter(data);
              return newData.map((item, index) => {
                return <Filter data={item} key={Math.random() * index} />;
              });
            }}
          </Query>
        </div>
      </div>
    );
  }
}
export default withRouter(FilterCont);
