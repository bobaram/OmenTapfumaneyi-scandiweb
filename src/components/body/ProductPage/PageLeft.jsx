import React from "react";
import classes from "./PageLeft.module.css";

class PageLeft extends React.Component {
  render() {
    return (
      <div onClick={this.props.getImage} className={classes.left}>
        {this.props.images.map((product, index, arr) => {
          if (index < 5) {
            return (
              <div key={Math.random() * index} className={classes.imgCont}>
                <img id="image" src={product} alt="" />
              </div>
            );
          }
          return <React.Fragment key={Math.random() * index}></React.Fragment>;
        })}
      </div>
    );
  }
}

export default PageLeft;
