import '../styles/globals.css';

import PropTypes from 'prop-types';

import Layout from '../components/layout/Layout';

import LanguageState from '../context/language/LanguageState';
import ProfileState from '../context/profile/ProfileState';
import ReviewState from '../context/review/ReviewState';

function MyApp({ Component, pageProps }) {
  return (
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
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
