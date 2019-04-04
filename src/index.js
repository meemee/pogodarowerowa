import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {StoreContext} from 'redux-react-hook';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import store from './store';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        secondary: orange,
    },
    status: {
        danger: 'orange'
    }
  });

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </StoreContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
