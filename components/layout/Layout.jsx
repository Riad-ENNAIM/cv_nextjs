import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Resume of a software engineer and full stack JavaScript developer (React & Node.js)"
      />
      <meta
        name="keywords"
        content="Riad ENNAIM, Riad, ENNAIM, Computer science, Developer, Development, Informatique, Développeur, Développement, Full-Stack, Full Stack, Front-End, Front End, Back-End, Back End, React, React.js, ReactJs, Node.js, HTML, CSS, JavaScript"
      />
      <meta name="author" content="Riad ENNAIM" />
      <link rel="apple-touch-icon" href="logo192.png" />
      <link rel="manifest" href="manifest.json" />
      <title>Riad ENNAIM | Développeur Full Stack JavaScript</title>
    </Head>
    <Header />
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
