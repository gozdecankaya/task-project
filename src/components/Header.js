import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import {
  FaDribbble,
  FaFacebookF,
  FaGooglePlusG,
  FaPinterestP,
  FaRss,
  FaTwitter,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [dataSource, setDataSource] = useState({
    logo: '',
    menu: [],
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/header')
      .then(({ data }) => {
        setDataSource(data);
      })
      .catch((err) => console.log(`error`, err));
  }, []);
  return (
    <header>
      <Container className="container-fluid px-0">
        <Row className="menu navbar navbar-expand-lg navbar-light py-0 px-10px mx-0 d-flex justify-content-between">
          <Col xs={3} className="logo px-0">
            <a
              className="navbar-brand logo d-flex align-items-center gap-3"
              href="/"
            >
              <img
                src="./images/logo.png"
                width="50"
                height="50"
                className="d-inline-block align-top logo"
                alt="DISPLAY"
              />
              <span className="logo-title">{dataSource.logo}</span>
            </a>
          </Col>
          <Col
            xs={4}
            className="socials d-none d-sm-flex align-items-center justify-content-end p-0"
          >
            <NavLink activeclassname="active" className="about-link" to="/">
              <FaTwitter />
            </NavLink>
            <NavLink activeclassname="active" className="portfolio-link" to="/">
              <FaFacebookF />
            </NavLink>
            <NavLink activeclassname="active" className="contact-link" to="/">
              <FaRss />
            </NavLink>
            <NavLink activeclassname="active" className="contact-link" to="/">
              <FaPinterestP />
            </NavLink>
            <NavLink activeclassname="active" className="contact-link" to="/">
              <FaGooglePlusG />
            </NavLink>
            <NavLink activeclassname="active" className="contact-link" to="/">
              <FaDribbble />
            </NavLink>
          </Col>
          <Col xs={4} className="mobile-menu w-auto d-block d-sm-none p-0">
            <DropdownButton className="mobile-menu-button" title="Menu">
              {dataSource.menu.map((item,i) => {
                return <Dropdown.Item key={i} href={'/' + item}>{item}</Dropdown.Item>;
              })}
            </DropdownButton>
          </Col>
        </Row>
        <hr className="dropdown-divider my-0" />
        <Row className="main-menu d-none d-sm-flex px-10px p-0">
          <Col
            sm={5}
            className="header-links d-flex align-items-center gap-sm-28px p-0"
          >
            <NavLink
              exact="true"
              activeclassname="active"
              to="/"
              className={({ isActive }) => (isActive ? 'link-active' : 'link')}
            >
              HOME
            </NavLink>
            <NavLink
              activeclassname="active"
              className={({ isActive }) => (isActive ? 'link-active' : 'link')}
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              activeclassname="active"
              className={({ isActive }) => (isActive ? 'link-active' : 'link')}
              to="/work"
            >
              WORK
            </NavLink>
            <NavLink
              activeclassname="active"
              className={({ isActive }) => (isActive ? 'link-active' : 'link')}
              to="/contact"
            >
              CONTACT
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
