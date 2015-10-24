import React, { Component, PropTypes } from 'react';

import Issue from './Issue';
import Gazer from './Gazer';

export default class List extends Component {

  //renders the 'see more issues' button to load issues in pages of 25
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <div className="load-more box-row">
        <div className="see-more">
          <h1     className="see-more-btn"
                  style={{ fontSize: '150%' }}
                  onClick={onLoadMoreClick}
                  disabled={isFetching}>
            {isFetching ? 'Loading more issues...' : 'see more issues'}
          </h1>
        </div>
      </div>
    );
  }

  render() {
    const {
      isFetching,
      nextPageUrl,
      pageCount,
      items,
      renderItem,
      loadingLabel,
      fullName,
      gazer } = this.props;
      console.log(this.props);

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>;
    }
    const isLastPage = !nextPageUrl;
    console.log(items);

    if (fullName && gazer !== 'true') {
      return (
        <div className="list box-row">
          { this.props.items.map(function(item, i) {
            return (
              <Issue issue={item}
                     key={i}
                     fullName={fullName} />
                 );
               }, this)
             }
          {pageCount > 0 && !isLastPage && this.renderLoadMore()}
        </div>
      );
    }

    return (
      <div className="list box-row">
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
}

List.propTypes = {
  loadingLabel: PropTypes.string,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  onLoadMoreClick: PropTypes.func,
  nextPageUrl: PropTypes.string,
  fullName: PropTypes.string,
};
