import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadGazers } from '../actions';

import Repo from '../components/Repo';

function loadData(props) {
  const { fullName } = props;
  props.loadGazers(fullName);
}

class GazerPage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props);
    loadData(this.props);
  }

  render() {
    const { repo } = this.props;
    return (
      <div className="repo-page container box-row">
        <Repo repo={repo} />
      </div>
    );
  }
}

GazerPage.propTypes = {
  repo: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { login, name } = state.router.params;
  const {
    entities: { repos, gazers }
  } = state;

  const fullName = `${login}/${name}`;
  console.log(fullName);
  var repo = repos[fullName];
  console.log(gazers);

  return {
    repo,
    fullName
  };
}

export default connect(mapStateToProps, {
  loadGazers
})(GazerPage);
