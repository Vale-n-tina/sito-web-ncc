import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="bg-imageSfondo">
      <Container>
        <Row className="justify-content-center align-items-center">
            <Col className="text-center col-12 text-white mt-5">
            <h1 className="title-shadow mb-4 mt-5">Rome Chauffeured Car</h1>
            </Col>
            <Col className="col-10">
            <p className="text-white text-center p-fade-in code mt-3 mb-5 ">
            An exclusive service in Rome offering private transfers, personalized tours, and trips to any location. Enjoy comfort, reliability, and professionalism at every step.
            </p>
            </Col>
            <Col className="col-10">
            <Row>
                <Col className="col-5"> button</Col>
                <Col className="col-5">button</Col>
            </Row>
            </Col>
        </Row>
        
      </Container>
    </div>
  );
};
export default Home;
