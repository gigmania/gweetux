import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRepo, loadIssues } from '../actions';


import Repo from '../components/Repo';
import Issue from '../components/Issue';
import List from '../components/List';

function loadData(props) {
  const { fullName } = props;
  props.loadRepo(fullName);
  props.loadIssues(fullName);
}

class RepoPage extends Component {
  constructor(props) {
    super(props);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadIssues(this.props.fullName, true);
  }

  renderIssue(issue) {
    return (
      <Issue issue={issue}
             key={issue.number} />
    );
  }

  render() {
    const { repo, name, fullName, repoIssues, repoIssuesPagination } = this.props;
    if (!repo) {
      return <h1><i>Loading {name} issues...</i></h1>;
    }
    return (
      <div className="repo-page container box-row">
        <Repo repo={repo} />
        <List renderItem={this.renderIssue}
              items={repoIssues}
              fullName={fullName}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading issues of ${name}...`}
              {...repoIssuesPagination} />
      </div>
    );
  }
}

RepoPage.propTypes = {
  repo: PropTypes.object,
  fullName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object,
  issues: PropTypes.array,
  repoIssues: PropTypes.array.isRequired,
  repoIssuesPagination: PropTypes.object,
  loadRepo: PropTypes.func.isRequired,
  loadIssues: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { login, name } = state.router.params;
  const {
    pagination: { issuesByRepo },
    entities: { users, repos, issues, comments }
  } = state;

  const fullName = `${login}/${name}`;
  const repoIssuesPagination = issuesByRepo[fullName] || { ids: [] };
  const repoIssues = repoIssuesPagination.ids.map(id => issues[id]);

  for (var key in repos) {
    var repo = repos[key];
    var owner = repos[key].organization;
  }

  return {
    fullName,
    name,
    repoIssues,
    repoIssuesPagination,
    repo,
    owner
  };
}

export default connect(mapStateToProps, {
  loadRepo,
  loadIssues
})(RepoPage);
