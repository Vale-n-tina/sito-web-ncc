import { Button, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container fluid className="p-0">
      <div className="bg-imageSfondo pb-5">
        <Row
          className="justify-content-center align-items-center"
          style={{ position: "relative", zIndex: 2 }}
        >
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
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="no-margin-padding justify-content-center">
        <Col className="text-center col-12 p-0 no-margin-padding">
          <h1 className="h1-presentation ">Why choose us?</h1>
        </Col>
        <Col className="col-8 text-center mt-4">
          <i className="bi bi-clock "></i>
          <h2 className="mt-2 mb-3  sans fw-bold">Punctuality</h2>
          <p className="quicksand">
            Always available to assist you, offering quick and reliable
            transfers for a smooth and worry-free journey
          </p>
          <p className="quicksand fst-italic text-decoration-underline">
            No waiting, just smooth and reliable transfers.
          </p>
        </Col>
        <Col className="col-8 text-center mt-4 ">
          <i className="bi bi-gem"></i>
          <h2 className="mt-2 mb-3  sans fw-bold">Comfort</h2>
          <p className="quicksand">
            Vehicles equipped with all the comforts for a stress-free and
            comfortable journey.
          </p>
          <p className="quicksand fst-italic text-decoration-underline">
            Incredible experiences tailored for your ultimate comfort.
          </p>
        </Col>

        <Col className="col-8 text-center mt-4 ">
          <i className="bi bi-award-fill"></i>
          <h2 className="mt-2 mb-3  sans fw-bold">Personalization</h2>
          <p className="quicksand">
            Transfers and tours tailored to meet your individual preferences and
            requirements, ensuring a personalized experience every time.
          </p>
          <p className="quicksand fst-italic text-decoration-underline">
          Each aspect is crafted with your needs in mind
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
