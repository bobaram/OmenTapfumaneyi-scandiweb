import React from "react";
import classes from "./Navleft.module.css";
import { NavLink } from "react-router-dom";
import AppIconArrow from "../../../svg/AppIconArrow";
import ArrowPointer from "../../../svg/ArrowPointer";
class Navleft extends React.Component {
  render() {
    return (
      <nav className={classes.navbar}>
        <ul>
          <li className={classes.navItem}>
            <NavLink
              to="products/all"
              className={({ isActive }) => (isActive ? classes.highlight : " ")}
            >
              ALL
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="products/tech"
              className={({ isActive }) => (isActive ? classes.highlight : " ")}
            >
              TECH
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="products/clothes"
              className={({ isActive }) => (isActive ? classes.highlight : " ")}
            >
              CLOTHES
            </NavLink>
          </li>
        </ul>
        <div className={classes.cover}>
          <AppIconArrow />
          <ArrowPointer />
        </div>
      </nav>
    );
  }
}
export default Navleft;
