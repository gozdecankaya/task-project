import { Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from './components/404';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Layout from './components/Layout';
import Work from './components/Work';
import './styles/index.scss';

function App() {
  return (
    <Fragment>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
