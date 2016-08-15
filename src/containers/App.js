'use strict';

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import * as pageActions from '../actions/page';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import {bindActionCreators} from 'redux';

class App extends Component {
  render() {
    let children = this.props.children;

    console.log('CHILDRENS!', children);

    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Megalead" showMenuIconButton={false} />
          <div>
            {/* Fetch page loader */}
            {(() => {
              if(this.props.fetching) {
                return <div style={{textAlign:'center'}} mode="indeterminate">
                  <LinearProgress />
                </div>
              } else {
                return children
              }
            })()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  componentWillMount() {
    let {fetchPage} = this.props.pageActions;
    fetchPage();
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
  }
}


const mapStateToProps = (state) => {
  return {
    fetching : state.page.fetching,
    campaigns: state.page.campaigns,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
