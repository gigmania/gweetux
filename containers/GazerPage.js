import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadGazers } from '../actions';

import Repo from '../components/Repo';
import Gazer from '../components/Gazer';
import List from '../components/List';

function loadData(props) {
  const { fullName } = props;
  props.loadGazers(fullName);
}

class GazerPage extends Component {

  constructor(props) {
    super(props);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadGazers(this.props.fullName, true);
  }

  renderGazer(gazer) {
    return (
      <Gazer gazer={gazer}
             key={gazer.login} />
    );
  }

  render() {
    const { repo, repoGazers, repoGazersPagination } = this.props;
    console.log(repoGazers);
    return (
      <div className="gazer-page box-row">
        <Repo repo={repo} />
        <List renderItem={this.renderGazer}
              items={repoGazers}
              fullName={repo.fullName}
              gazer = 'true'
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading stargazers of ${name}...`}
              {...repoGazersPagination} />
      </div>
    );
  }
}

GazerPage.propTypes = {
  repo: PropTypes.object.isRequired,
  fullName: PropTypes.string,
  repoGazers: PropTypes.array.isRequired,
  repoGazersPagination: PropTypes.object,
  loadGazers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { login, name } = state.router.params;
  const {
    pagination: { gazersByRepo },
    entities: { repos, gazers }
  } = state;

  const fullName = `${login}/${name}`;
  const repoGazersPagination = gazersByRepo[fullName] || { ids: [] };
  const repoGazers = repoGazersPagination.ids.map(id => gazers[id]);
  var repo = repos[fullName];
  console.log(gazers);
  console.log(repoGazers);

  return {
    repo,
    repoGazers,
    repoGazersPagination,
    fullName
  };
}

export default connect(mapStateToProps, {
  loadGazers
})(GazerPage);
