import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

function createNestedViews(childrenViews = [], Parent, NotFound) {
  return class ParentView extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    static get propTypes() {
      return {
        match: PropTypes.object,
      };
    }

    render() {
      const { match } = this.props;
      return (
        <Switch>
          {Parent && <Route path={match.url} component={Parent} exact />}
          {!!childrenViews.length &&
            childrenViews.map((child, index) => {
              const Child = child.component;
              return (
                <Route
                  path={`/${child.path}`}
                  render={props => <Child {...props} />}
                  key={index}
                />
              );
            })}
          {NotFound && <Route component={NotFound} />}
        </Switch>
      );
    }
  };
}

export default createNestedViews;
