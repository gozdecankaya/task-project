import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Figure, Nav, Row, Tab } from 'react-bootstrap';
import { GoDeviceCamera } from 'react-icons/go';

const About = () => {
  const [dataSource, setDataSource] = useState({
    title: '',
    firstParagraph: '',
    secondParagraph: '',
    missionStatement: { title: '', description: '' },
    funFacts: { title: '', description: '' },
    services: {
      title: '',
      categories: [
        { id: 0, title: '', description: '', list: [{ id: 0, content: '' }] },
      ],
    },
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/about')
      .then(({ data }) => {
        setDataSource(data);
      })
      .catch((err) => console.log(`error`, err));
  }, []);

  return (
    <Container className="mw-100 px-0">
      {dataSource ? (
        <React.Fragment>
          <div className="page-header">
            <Row className="container-fluid mx-auto d-flex h-100 align-items-center">
              <span className="main-menu-title">{dataSource.title}</span>
            </Row>
          </div>
          <Container className="container-fluid about-section">
            <Row className="text-center text-sm-start mx-0">
              <Col xs={12} sm={5}>
                <Figure className="m-0 about">
                  <Figure.Image
                    width={380}
                    height={260}
                    alt="about-us"
                    src="./images/about-us.jpeg"
                  />
                </Figure>
              </Col>
              <Col xs={12} sm={7} className="description-about">
                <div className="px-2">{dataSource.firstParagraph}</div>
                <br />
                <div className="px-2">{dataSource.secondParagraph}</div>
              </Col>
            </Row>
            <Row className="second-section text-center text-sm-start gap-5 gap-sm-0 mx-0">
              <Col
                xs={12}
                sm={6}
                className="mission-section d-flex flex-column gap-4"
              >
                <div className="section-title">
                  {dataSource.missionStatement.title}
                </div>
                <div className="second-section-description">
                  {dataSource.missionStatement.description}
                </div>
              </Col>
              <Col
                xs={12}
                sm={6}
                className="fun-facts-section d-flex flex-column gap-4"
              >
                <div className="section-title px-2">
                  {dataSource.funFacts.title}
                </div>
                <div className="second-section-description px-2">
                  {dataSource.funFacts.description}
                </div>
              </Col>
            </Row>
            <Row className="service-section text-center text-sm-start mx-0">
              <div className="section-title"> {dataSource.services.title} </div>
            </Row>
          </Container>
          <Tab.Container defaultActiveKey="web">
            <div className="tabs mt-4 mx-0">
              <Container className="container-fluid">
                <Row className="mx-0">
                  <Nav
                    variant="pills"
                    className="service-tabs d-flex flex-column flex-sm-row align-items-center"
                  >
                    {dataSource.services.categories.map((item, i) => (
                      <Nav.Link
                        eventKey={item.title}
                        className="tabs-link flex-sm-fill d-flex justify-content-center"
                      >
                        {item.title}
                      </Nav.Link>
                    ))}

                    <Nav.Link
                      eventKey="photography"
                      className="tabs-link flex-sm-fill d-flex justify-content-center"
                    >
                      <div>
                        <GoDeviceCamera />
                      </div>
                      <div></div>photography
                    </Nav.Link>
                  </Nav>
                </Row>
              </Container>
            </div>
            <Container className="container-fluid">
              <Row className="mx-0 content pt-4">
                <Tab.Content>
                  {dataSource.services.categories.map((item, i) => {
                    return (
                      <Tab.Pane eventKey={item.title} key={item.id}>
                        {item.description}
                        <ul className="arrow-list pt-3">
                          {item.list.map((item, i) => (
                            <li key={i}>{item.content}</li>
                          ))}
                        </ul>
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Row>
            </Container>
          </Tab.Container>
        </React.Fragment>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default About;
