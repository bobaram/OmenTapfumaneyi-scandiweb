import React from "react";
import classes from "./Header.module.css";
import Navleft from "./Navleft/Navleft";
import Navright from "./Navright/Navright";

class Header extends React.Component {
  render() {
    return (
      <section className={classes.header}>
        <Navleft />
        <Navright />
      </section>
    );
  }
}
export default Header;
