import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  toggleAddPostSection = () => {
  };

  render() {
    return (
       <h1>MyMern</h1>
    );
  }
}
