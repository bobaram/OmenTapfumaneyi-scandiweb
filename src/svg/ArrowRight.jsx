import React from "react";

class ArrowRight extends React.Component {
  render() {
    return (
      <svg
        className={this.props.className}
        id={this.props.id}
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.75 1.06808L6.375 6.68711L0.75 12.3062"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
}

export default ArrowRight;
