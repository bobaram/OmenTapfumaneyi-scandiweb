import React from "react";
class ArrowUp extends React.Component {
  render() {
    return (
      <svg
        className={this.props.className}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 3.5L4 0.5L7 3.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export default ArrowUp;
