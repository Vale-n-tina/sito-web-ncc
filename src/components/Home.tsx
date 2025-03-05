import { Button, Col, Container, Row } from "react-bootstrap";
import AccordionFAQ from "./AccordionFAQ";

const Home = () => {
  return (
    <Container fluid className="p-0">
      <div className="bg-imageSfondo pb-5">
        <Row
          className="justify-content-center align-items-center"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Col className="text-center col-12 col-md-6 text-white mt-5">
            <h1 className="title-shadow mb-4 mt-5">Rome Chauffeured Car</h1>
          </Col>
          <Col className="col-10 col-md-7">
            <p className="text-white text-center p-fade-in code mt-3 mb-5 ">
              An exclusive <span className="fw-bold">service in Rome</span>{" "}
              offering private transfers, personalized tours, and trips to any
              location. Enjoy comfort, reliability, and professionalism at every
              step.
            </p>
          </Col>
          <Col className="col-12">
            <Row className=" justify-content-center">
              <Col className="col-8 col-md-3 col-lg-2 mb-3">
                <Button
                  variant="gold"
                  className="custom-gold-btn fw-bold sans p-md-2"
                >
                  BOOK NOW
                </Button>
              </Col>
              <Col className="col-8 col-md-3  col-lg-2 mb-5">
                <Button
                  variant="dark"
                  className="custom-black-btn fw-bold sans p-md-2"
                >
                  VIEW TOUR
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="no-margin-padding justify-content-center">
        <Col className="text-center col-8 col-md-9 p-0 no-margin-padding mt-2 mb-md-3 ">
          <h1 className="h1-presentation mb-4 mb-md-5 ">Why choose us?</h1>
          <hr className=" " />
        </Col>

        <Col className="col-8 col-md-4 text-center mt-3">
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
        <Col className="col-8 col-md-4 text-center mt-4 ">
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

        <Col className="col-8 col-md-4 text-center mt-4  mb-3">
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
      <div className="bg-imageSfondo2 pb-5">
        <Row
          style={{ position: "relative", zIndex: 2 }}
          className=" justify-content-center"
        >
          <Col className="text-center mt-5 col-9">
            <h1 className="text-white merriweather mb-4 ">
              Contact Us Anytime
            </h1>
            <p className="text-white mb-4">
              We’re always here to answer your questions and provide the best
              assistance. Whether you need information about our services or
              help with your next transfer, don’t hesitate to reach out. Your
              satisfaction is our priority.
            </p>
            <Row className=" justify-content-center">
              <Col className="col-5">
                <Button
                  variant="gold"
                  className="custom-gold-btn fw-bold sans p-md-2 mt-3"
                >
                  Contact us
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="no-margin-padding justify-content-center mt-4 ">
        <Col className="no-margin-padding col-8">
          <h2 className="d-flex justify-content-center text-center ">
            Frequently Asked Questions
          </h2>
        </Col>
        <Col className="col-12">
          <Row>
            <Col >
           <AccordionFAQ/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
