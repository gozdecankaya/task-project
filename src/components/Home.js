import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  Button, Col,
  Container,
  Figure,
  Image,
  Modal,
  Row
} from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa';

const Home = () => {
  const [dataSource, setDataSource] = useState({
    banner: { description: '', button: '' },
    youtubeSection: { title: '', secondDescription: '' },
    projectSection: {
      sectionTitle: '',
      sectionDescription: '',
      sliderItems: [{ id: 0, image: '', title: '', description: '' }],
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(3);
  const [targetImage, setTargetImage] = useState(4);
  const targetRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/home')
      .then(({ data }) => {
        setDataSource(data);
      })
      .catch((err) => console.log(`error`, err));
  }, []);

  const nextImage = () => {
    setCurrentImage(
      currentImage === dataSource.sliderItems.length - 1 ? 0 : currentImage + 1
    );
  };

  const prevImage = () => {
    setCurrentImage(
      currentImage === 0 ? dataSource.sliderItems.length - 1 : currentImage - 1
    );
  };

  return (
    <Container className="mw-100 px-0">
      <div className="animation"> 
        <div className='slide'>

        </div>
      </div>
      <div className="youtube-section">
        <Row className="container-fluid mx-auto d-flex align-items-center h-100">
          <Col xs={12} sm={5} className="video">
            <Figure className="d-flex align-items-center justify-content-center">
              <Button
                id="youtube-video"
                variant="none"
                onClick={() => setShowModal(true)}
              >
                <FaPlay />
              </Button>
              <Modal
                id="videoModal"
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <iframe
                    title="video"
                    width="100%"
                    height="400px"
                    frameborder="0"
                    allowfullscreen=""
                    src="http://www.youtube.com/embed/dP15zlyra3c?html5=1"
                  ></iframe>
                </Modal.Body>
              </Modal>
            </Figure>
          </Col>
          <Col xs={12} sm={7} className="description">
            <div className="title text-uppercase d-flex flex-column">
              {dataSource.youtubeSection.title}
            </div>
            <div>{dataSource.youtubeSection.firstDescription}</div>
            <div>{dataSource.youtubeSection.secondDescription}</div>
          </Col>
        </Row>
      </div>
      <div className="slider-section">
        <Row className="container-fluid mx-auto d-flex justify-content-center align-items-center">
          <Col sm={6} className="slider-section-title text-uppercase">
            {dataSource.projectSection.sectionTitle}
          </Col>
          <Col sm={10} className="slider-section-description text-center">
            {dataSource.projectSection.sectionDescription}
          </Col>
        </Row>
      </div>
      <Row className="carousel d-flex mx-auto">
        <div className="slide d-flex justify-content-center">
          {dataSource.projectSection.sliderItems.map((pic, i) => {
            return (
              <div
                key={i}
                is
                ref={i === targetImage ? targetRef : null}
                className={
                  i === currentImage ? 'slide-item active' : 'slide-item'
                }
              >
                {i === currentImage ? (
                  <Figure className="carousel-image" id={'picture' + pic.id}>
                    <Image src={pic.image} />
                  </Figure>
                ) : (
                  <Figure className="carousel-image" id={'picture' + pic.id}>
                    <Image src={pic.image} />
                  </Figure>
                )}
              </div>
            );
          })}
        </div>
      </Row>
      <Row className="carousel-info mx-0">
        <div className="icon">
          <FaAngleLeft onClick={prevImage} />
        </div>
        <div className="slider-image-title"></div>
        <div className="slider-image-description"></div>
        <div className="icon">
          <FaAngleRight onClick={nextImage} />
        </div>
      </Row>
    </Container>
  );
};

export default Home;
