import React from "react";
import withRouter from "../../withRouter/WithRouter";
import classes from "./Filter.module.css";
class Filter extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.getAttribute("id") === "selection" && e.target.value) {
      this.props.router.searchParams.delete(this.props.data.type);
      this.props.router.searchParams.append(
        e.target.dataset.parent,
        e.target.value
      );
      this.props.router.setSearchParams(this.props.router.searchParams);
      return;
    } else if (e.target.getAttribute("id") === "selection" && !e.target.value) {
      this.props.router.searchParams.delete(this.props.data.type);
      this.props.router.setSearchParams(this.props.router.searchParams);
      return;
    }

    if (
      e.target.getAttribute("id") === "checkbox" &&
      e.target.value &&
      e.target.value !==
        this.props.router.searchParams.get(this.props.data.type)
    ) {
      this.props.router.searchParams.delete(this.props.data.type);
      this.props.router.searchParams.append(
        e.target.dataset.parent,
        e.target.value
      );
      this.props.router.setSearchParams(this.props.router.searchParams);
      return;
    } else if (
      e.target.getAttribute("id") === "checkbox" &&
      e.target.value ===
        this.props.router.searchParams.get(this.props.data.type)
    ) {
      this.props.router.searchParams.delete(this.props.data.type);
      this.props.router.setSearchParams(this.props.router.searchParams);
      return;
    }
    if (
      e.target.getAttribute("id") === "color" &&
      e.target.dataset.value &&
      e.target.dataset.value !==
        this.props.router.searchParams.get(this.props.data.type)
    ) {
      this.props.router.searchParams.delete(this.props.data.type);
      this.props.router.searchParams.append(
        e.target.dataset.parent,
        e.target.dataset.value
      );
      this.props.router.setSearchParams(this.props.router.searchParams);
      return;
    } else if (
      e.target.getAttribute("id") === "color" &&
      e.target.dataset.value ===
        this.props.router.searchParams.get(this.props.data.type)
    ) {
      this.props.router.searchParams.delete(this.props.data.type);
      this.props.router.setSearchParams(this.props.router.searchParams);
      return;
    }
  }

  componentDidMount() {
    const newObjs = {};
    newObjs[this.props.data.type] = "";
    this.setState({ ...newObjs });
  }
  render() {
    return (
      <div className={classes.filterCont}>
        {this.props.data.type !== "Color" &&
          this.props.data[this.props.data.type][0].value !== "Yes" &&
          this.props.data[this.props.data.type][0].value !== "No" && (
            <>
              <label htmlFor="selection">{this.props.data.type}</label>
              <select
                data-parent={this.props.data.type}
                onChange={this.handleChange}
                value={
                  this.props.router.searchParams.get(this.props.data.type) ||
                  undefined
                }
                name="selection"
                id="selection"
              >
                {this.props.data[this.props.data.type].map((item, index) => {
                  return (
                    <option key={Math.random() * index} value={item.value}>
                      {item.displayValue}
                    </option>
                  );
                })}
                <option value="">none</option>
              </select>
            </>
          )}
        {this.props.data.type === "Color" && (
          <>
            <label>{this.props.data.type}</label>
            <div className={classes.boxes}>
              {this.props.data[this.props.data.type].map((item, index) => {
                return (
                  <div
                    id="color"
                    onClick={this.handleChange}
                    key={Math.random() * index}
                    data-parent={this.props.data.type}
                    data-value={item.displayValue}
                    style={{
                      backgroundColor: item.value,
                    }}
                    className={`${
                      this.props.router.searchParams.get(
                        this.props.data.type
                      ) === item.displayValue
                        ? classes.colorSelect
                        : ""
                    } ${classes.box}`}
                  ></div>
                );
              })}
            </div>
          </>
        )}

        {(this.props.data[this.props.data.type][0].value === "Yes" ||
          this.props.data[this.props.data.type][0].value === "No") && (
          <>
            <label>{this.props.data.type}</label>
            <div className={classes.boxes}>
              {this.props.data[this.props.data.type].map((item, index) => {
                return (
                  <div key={Math.random() * index}>
                    <label>
                      {item.value}
                      <input
                        id="checkbox"
                        onChange={this.handleChange}
                        type="checkbox"
                        data-parent={this.props.data.type}
                        value={item.value}
                        data-value={item.value}
                        className={classes.box}
                        checked={
                          this.props.router.searchParams.get(
                            this.props.data.type
                          ) === item.value
                            ? true
                            : false
                        }
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}
export default withRouter(Filter);
