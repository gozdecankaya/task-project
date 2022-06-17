import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Figure,
  Image,
  ListGroup,
  Row
} from 'react-bootstrap';
import { BsFillGridFill } from 'react-icons/bs';
import { FaAlignJustify } from 'react-icons/fa';

const Work = () => {
  // const [loading, setLoading] = useState(false);
  const [selectedView, setSelectedView] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dataSource, setDataSource] = useState({
    title: '',
    listCategory: [],
    works: [
      {
        id: 0,
        name: '',
        description: '',
        image: '',
        category: '',
      },
    ],
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/work')
      .then(({ data }) => {
        setDataSource(data);
      })
      .catch((err) => console.log(`error`, err));
  }, []);

  // const fetchMoreData = () => {};

  return (
    <Container className="mw-100 px-0">
      {dataSource ? (
        <React.Fragment>
          <div className="page-header">
            <Row className="container-fluid mx-auto d-flex align-items-center h-100">
              <span className="main-menu-title">{dataSource.title}</span>
            </Row>
          </div>
          <Container className="container-fluid">
            <Row className="mx-0 category d-flex justify-content-between">
              <Col
                className="filter d-flex align-items-center px-0"
                xs={12}
                sm={7}
              >
                <ButtonGroup aria-label="Basic example" className="d-flex flex-column flex-sm-row col-12 gap-lg-3">
                  {dataSource.listCategory.map((item, i) => (
                    <Button
                      key={'category' + i}
                      variant="link"
                      onClick={() => setSelectedFilter(item)}
                      className={selectedFilter === item ? 'btn-active' : ''}
                    >
                      <span>
                        {item}
                        {i < dataSource.listCategory.length - 1 ? ' / ' : ''}
                      </span>
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
              <Col className="views d-flex gap-2 text-right" xs={1} sm={3}>
                <div>
                  <Button
                    variant="none"
                    className={selectedView === 'grid' ? 'btn-active' : ''}
                    onClick={() => setSelectedView('grid')}
                  >
                    <BsFillGridFill />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="none"
                    className={selectedView === 'list' ? 'btn-active' : ''}
                    onClick={() => setSelectedView('list')}
                  >
                    <FaAlignJustify />
                  </Button>
                </div>
              </Col>
            </Row>
            {selectedView === 'grid' ? (
              <Row xs={1} md={12} className="portfolio d-flex mx-0">
                {dataSource.works
                  .filter((item) =>
                    selectedFilter === 'all'
                      ? item
                      : item.category === selectedFilter
                  )
                  .map((item) => {
                    return (
                      <Col key={'grid' + item.id} xs={4} className="image">
                        <Card>
                          <Card.Img src={item.image} alt="Card image" />
                          <Card.ImgOverlay className="d-flex justify-content-center">
                            <Card.Title className="link d-flex align-items-center justify-content-center"></Card.Title>
                          </Card.ImgOverlay>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            ) : (
              <Row md={12} className="list-view d-flex mx-0">
                <ListGroup xs={12} className="list-group">
                  {dataSource.works
                    .filter((item) =>
                      selectedFilter === 'all'
                        ? item
                        : item.category === selectedFilter
                    )
                    .map((item) => (
                      <ListGroup.Item
                        key={'list' + item.id}
                        as="li"
                        action
                        className="d-flex align-items-center"
                      >
                        <Figure className="list-image">
                          <Image
                            src={item.image}
                            height={30}
                            width={30}
                          ></Image>
                        </Figure>
                        <div className="ms-2 me-auto list-description">
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                        </div>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Row>
            )}
          </Container>
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

export default Work;
