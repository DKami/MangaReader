import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Search from '../containers/SearchContainer';
import { Link } from 'react-router';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
  render(){

    const { loading } = this.props;
    return (
      <MuiThemeProvider>
          <div>
              <AppBar
              title={<Link to='/' target='_self' style={{ textDecoration: 'none', color: 'white' }}>MangaReader</Link>}
              iconElementLeft={<IconButton></IconButton>}
              iconElementRight={<Search />}
              >
              </AppBar>
              <div id="container">
              {  this.props.children }
              </div>
          </div>
      </MuiThemeProvider>);
  }
}
