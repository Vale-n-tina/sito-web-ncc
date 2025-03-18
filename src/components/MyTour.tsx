import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const MyTour = () => {
  const [activeButton, setActiveButton] =useState<number>(0);
  const handleButtonClick = (index:number) => {
    setActiveButton(index);
  };
  return (
    <div className="bg-info">
      <Container>
        <h1>Classic Tour</h1>
        <p>Select the monuments you do not want to miss.</p>
        <Row className=" justify-content-center">
          <Col className="bg-white col-11 ">
            <p>Tour starting from</p>
            <Row className=" justify-content-center">
              {[0, 1, 2, 3].map((index) => (
                <Col key={index} className="col-5 p-0 m-1">
                  <Button
                    variant="outline-primary"
                    className={`btn-gold-outline w-100 rounded-0 ${
                      activeButton === index ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(index)}
                  >
                    Primary
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyTour;
