import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
  }

  getInputValue() {
    return this.refs.input.value;
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  }

  handleGoClick() {
    console.log('handling go click');
    this.props.onChange(this.getInputValue());
  }

  render() {
    return (
      <div className="explore box-row">
        <div className="explore-head-name">
          <Link to="/">
            <h1 className="explore-head"> gweetux </h1>
          </Link>
        </div>
        <div className="github-inputs box-row">
          <input    className="value-input"
                    ref="input"
                    defaultValue="npm/npm"
                    onKeyUp={this.handleKeyUp} />

          <div className="get-repo">
            <span className="get-repo-btn" onClick={this.handleGoClick}>
              Get Issues
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
