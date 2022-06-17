import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({
    title: '',
    contactForm: {
      title: '',
      description: '',
      nameField: '',
      mailField: '',
      subject: '',
      button: '',
    },
    contactInfo: {
      title: '',
      description: '',
      emailTitle: '',
      email: '',
      phoneTitle: '',
      phone: '',
    },
    storeHours: {
      title: '',
      workingDays: [{ day: '', time: '' }],
    },
  });
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/contact')
      .then(({ data }) => {
        setDataSource(data);
      })
      .catch((err) => console.log(`error`, err));
  }, []);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      setTimeout(() => {
        setValidated(false);
        setSuccessMessage(true);
        event.target.reset();
        setLoading(false);
      }, 1700);
    }

    setValidated(true);
  };

  return (
    <Container className="mw-100 px-0">
      {dataSource ? (
        <React.Fragment>
          <div className="page-header">
            <Row className="container-fluid mx-auto d-flex align-items-center h-100">
              <span className="main-menu-title px-10px">
                {dataSource.title}
              </span>
            </Row>
          </div>
          <div className="google-map px-0">
            <iframe
              key="map"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2226.0949861281465!2d-106.66608164949255!3d52.12850153364328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5304f6d738698b5f%3A0xacc43ce7927c790c!2s120%202nd%20Ave%20N%2C%20Saskatoon%2C%20SK%20S7K%202B2%2C%20Canada!5e0!3m2!1sen!2sus!4v1655060326659!5m2!1sen!2sus"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <Container className="container-fluid">
            <Row className="form-section mx-0">
              <Col sm={8} className="text-center text-sm-start">
                <p className="form-title">{dataSource.contactForm.title}</p>
                <div className="form-subtitle pb-4">
                  {dataSource.contactForm.description}
                </div>
                <Form
                  id="demoForm"
                  noValidate
                  validated={validated}
                  onSubmit={onSubmit}
                  className="contact-form d-flex flex-column align-items-lg-start align-items-center"
                >
                  <Form.Group className="pb-3 col-5" controlId="formName">
                    <Form.Control
                      required
                      type="text"
                      placeholder={dataSource.contactForm.nameField}
                    />
                    <Form.Control.Feedback type="invalid" />
                  </Form.Group>
                  <Form.Group
                    className="pb-3 col-12 col-lg-5"
                    controlId="formEmail"
                  >
                    <Form.Control
                      required
                      type="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      placeholder={dataSource.contactForm.mailField}
                    />
                    <Form.Control.Feedback type="invalid" />
                  </Form.Group>
                  <Form.Group
                    className="pb-3 col-12 col-lg-5"
                    controlId="formSubject"
                  >
                    <Form.Control
                      type="text"
                      placeholder={dataSource.contactForm.subjectField}
                    />
                  </Form.Group>
                  <Form.Group
                    className="pb-3 col-lg-7 col-12"
                    controlId="formMessage"
                  >
                    <Form.Control
                      required
                      type="text"
                      as="textarea"
                      maxLength={1000}
                    />
                    <Form.Control.Feedback type="invalid" />
                  </Form.Group>
                  <Button
                    className="submit-btn"
                    variant="none"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        size="sm"
                      />
                    ) : (
                      <span>{dataSource.contactForm.button}</span>
                    )}
                  </Button>
                  <Form.Group className="mt-3">
                    <Alert
                      key="success"
                      variant="success"
                      show={successMessage}
                    >
                      {dataSource.contactForm.successMessage}
                    </Alert>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={4} className="text-center text-sm-start pt-5 pt-sm-0">
                <div className="contact-info">
                  <p className="contact-info-title">
                    {dataSource.contactInfo.title}
                  </p>
                  <div className="d-grid contact-info-subtitle">
                    <div>{dataSource.contactInfo.description}</div>
                    <div className="bold-info">
                      <div>
                        <b>{dataSource.contactInfo.emailTitle} </b>
                        <a href="mailto:info@display.com">
                          {dataSource.contactInfo.email}
                        </a>
                      </div>
                      <div>
                        <b>{dataSource.contactInfo.phoneTitle} </b>
                        {dataSource.contactInfo.phone}
                      </div>
                    </div>
                    <div>
                      {dataSource.contactInfo.addressLine1} <br />
                      {dataSource.contactInfo.addressLine2}
                    </div>
                  </div>
                </div>
                <div className="store-title">
                  <div className="mx-0 d-flex flex-column gap-1">
                    <Col className="mx-0">
                      <p className="store-hours-title">
                        {dataSource.storeHours.title}
                      </p>
                    </Col>
                    <Col>
                      <div className="store-hours">
                        <Row>
                          {dataSource.storeHours.workingDays.map((item) => {
                            return (
                              <React.Fragment>
                                <Col xs={6}>{item.day}</Col>
                                <Col xs={6} className="text-end">
                                  {item.time}
                                </Col>
                              </React.Fragment>
                            );
                          })}
                        </Row>
                      </div>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>
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

export default Contact;
