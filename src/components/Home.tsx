import { Button, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="bg-imageSfondo">
      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className="justify-content-center align-items-center">
          <Col className="text-center col-12 text-white mt-5">
            <h1 className="title-shadow mb-4 mt-5">Rome Chauffeured Car</h1>
          </Col>
          <Col className="col-10">
            <p className="text-white text-center p-fade-in code mt-3 mb-5 ">
              An exclusive <span className="fw-bold">service in Rome</span>{" "}
              offering private transfers, personalized tours, and trips to any
              location. Enjoy comfort, reliability, and professionalism at every
              step.
            </p>
          </Col>
          <Col className="col-12">
            <Row className=" justify-content-center">
              <Col className="col-8 mb-3">
                <Button variant="gold" className="custom-gold-btn fw-bold sans">
                  BOOK NOW
                </Button>
              </Col>
              <Col className="col-8 mb-5">
                <Button
                  variant="dark"
                  className="custom-black-btn fw-bold sans"
                >
                  VIEW TOUR
                </Button>
              </Col  >
              <Col  className="col-8 mb-5">
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
