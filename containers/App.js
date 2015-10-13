import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Explore from '../components/Explore';
import { resetErrorMessage } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.pushState(null, `/${nextValue}`);
  }

  renderErrorMessage() {
    var errorMessage = this.props.errorMessage;
    if (errorMessage === 'Not Found') {
      const { inputValue } = this.props;
      errorMessage = inputValue + ' is not found. Your query must be structured as "user/repo" (e.g. twitter/recess)';
    }
    if (!errorMessage) {
      return null;
    }
    return (
      <div className="error-msg box-row">
        <p className="error-msg-msg">
          <b>{errorMessage}</b>
          {' '}
          <sup> <a className="dismiss" href="#"
              onClick={this.handleDismissClick}>
            X
          </a> </sup>
        </p>
      </div>
    );
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div className="app box-row">
        <Explore value={inputValue}
                 onChange={this.handleChange} />
        {this.renderErrorMessage()}
        {children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  };
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  pushState
})(App);
