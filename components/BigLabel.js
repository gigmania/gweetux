
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class BigLabel extends Component {

  render() {
  	const { name, color } = this.props.label;
    return (
      <div className="big-label">
      	<span className='big-label-label' background={color}>
      		{name}
      	</span>
      </div>
    );
  }
}

BigLabel.propTypes = {
  label: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired
};
