import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => (
  <>
    <Header />
    <main>{props.children}</main>
    <Footer />
  </>
);
export default Layout;
