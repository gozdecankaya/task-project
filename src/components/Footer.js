import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  const [dataSource, setDataSource] = useState({
    firstSection: {
      title: '',
      button: '',
    },
    copyRight: '',
    menu: [],
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/footer')
      .then(({ data }) => {
        setDataSource(data);
      })
      .catch((err) => console.log(`error`, err));
  }, []);

  return (
    <footer>
      <Container className="first-section mw-100 px-0">
        <Row className="mx-0 container-fluid mx-auto h-100 align-items-center justify-content-center justify-content-sm-between">
          <Col xs={12} sm={6} className="banner-title">
            <div>{dataSource.firstSection.title}</div>
          </Col>
          <Col xs={12} sm={3}>
            <Button className="py-0 banner-button" size="lg" variant="none">
              <span>{dataSource.firstSection.button}</span>
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="copyright-section mw-100 px-0">
        <div className="mx-0 container-fluid mx-auto h-100 align-items-center justify-content-between">
          <Row className="mx-0 d-flex justify-content-between align-items-center h-100 px-10px">
            <Col xs={12} sm={4} className="copyright-text">
              {dataSource.copyRight}
            </Col>
            <Col xs={12} sm={4} className="links d-flex justify-content-end">
              {dataSource.menu.map((item, i) => (
                <a key={i} href={'/' + item}>
                  {item} {i < dataSource.menu.length - 1 ? ' / ' : ''}
                </a>
              ))}
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
