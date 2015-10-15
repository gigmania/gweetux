import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { resetErrorMessage } from '../actions';

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
      this.handleGoClick(e);
    }
  }

  handleGoClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault;
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
  onChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage
  };
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(Explore);
