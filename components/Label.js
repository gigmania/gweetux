
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Label extends Component {

  render() {
  	const { name, color } = this.props.label;
    return (
      <div className="label">
      	<span className="list-label" background={color}>
      		{name}
      	</span>
      </div>
    );
  }
}

Label.propTypes = {
  label: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired
};
