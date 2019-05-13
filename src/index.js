import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';




 import { Provider } from 'react-redux';
 import storeFactory from './app/store/store';
 import './styles/main.css';
 import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 
 // const store = storeFactory();
 
 ReactDOM.render(
	 <Provider store={storeFactory}>
		 <BrowserRouter basename="/chai">
		   <App />
		 </BrowserRouter>
	 </Provider>,
 
	 document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
