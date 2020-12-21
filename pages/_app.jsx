import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';

import PropTypes from 'prop-types';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/layout/Layout';

import LanguageState from '../context/language/LanguageState';
import ProfileState from '../context/profile/ProfileState';
import ReviewState from '../context/review/ReviewState';

config.autoAddCss = false;

library.add(fab);

const MyApp = ({ Component, pageProps }) => (
  <LanguageState>
    <ProfileState>
      <ReviewState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReviewState>
    </ProfileState>
  </LanguageState>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
