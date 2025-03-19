import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const MyTour2 = () => {
  const [activeButtonStart, setActiveButtonStart] = useState<number>(0);
  const [activeButtonEnd, setActiveButtonEnd] = useState<number>(0);

  const handleButtonStart = (index: number) => {
    setActiveButtonStart(index);
  };
  const handleButtonEnd = (index: number) => {
    setActiveButtonEnd(index);
  };

  const buttonLabels: string[] = [
    "Rome",
    "Fiumicino Airport",
    "Ciampino Airport",
    "Civitavecchia Dock",
  ];
  const checkBox: string[] = [
    "Colosseum",
    "Trevi fountain",
    "Pantheon",
    "Saint Peter",
  ];

  const places: string[] = [
    "Saint Peter in Chains (+ 30 min)",
    "Castel Sant'Angelo (+ 30 min)",
    "Basilica of Saint Mary Major (+ 30 min)",
    "Basilica of Saint Mary of the Angels (+ 30 min)",
    "Basilica of Santa Maria del Popolo (+ 30 min)",
    "Saint Mary of Victory (+ 30 min)",
    "Terrace of Gianicolo and Acqua Paola Fountain (+ 30 min)",
    "Piazza Navona (+ 30 min)",
    "Piazza del Popolo (+ 30 min)",
    "Piazza della Minerva (+ 30 min)",
    "Victor Emmanuel II Monument (+ 30 min)",
    "Spanish Steps (+ 30 min)",
    "Circus Maximus (+ 30 min)",
    "Roman Forum (+ 30 min)",
  ];
  return (
    <div className="bgTour">
      <h1 className="montserrat pt-5 ms-4">Classic Tour</h1>
      <p className=" small ms-4">
        Select the monuments you do not want to miss.
      </p>
      <Container>
        <Row className=" justify-content-center">
          <Col className="col-11 bg-white">
            <p className="quicksand ms-3 mb-3 mt-4">Tour starting from</p>
            <Row className=" justify-content-center">
              {buttonLabels.map((label, index) => (
                <Col key={index} className="col-5 p-0 m-1">
                  <Button
                    variant="outline-primary"
                    className={`btn-gold-outline w-100  h-100 rounded-0 ${
                      activeButtonStart === index ? "active" : ""
                    }`}
                    onClick={() => handleButtonStart(index)}
                  >
                    {label}
                  </Button>
                </Col>
              ))}
            </Row>
            <Row className=" justify-content-center">
              <Col className="col-11">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="mt-2 quicksand">
                    Insert address
                  </Form.Label>
                  <Form.Control type="text" required className="custom-input" />
                </Form.Group>
              </Col>
            </Row>

            <Row className=" justify-content-center">
              <Col className="col-11">
                <Form.Label className="mt-3 quicksand">Select date</Form.Label>
                <input
                  type="datetime-local"
                  name="datetime"
                  required
                  className="custom-datetime-input"
                />
              </Col>

              <Col className="col-11">
                <Form.Label className="mt-3 quicksand">
                  Select number of passengers
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="custom-select"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                  <option value="3">5</option>
                  <option value="3">6</option>
                  <option value="3">7</option>
                  <option value="3">8</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className=" justify-content-center">
              <Col className="col-11">
                <Form.Label className="mt-3 quicksand">
                  Included in 4 hours:
                </Form.Label>
                {checkBox.map((label, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={label}
                    defaultChecked
                    className="custom-checkbox"
                  />
                ))}
              </Col>
              <Col className="col-11">
                <Form.Label className="mt-3 quicksand">
                  Optional monuments:
                </Form.Label>
                <div
                  style={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    padding: "10px",
                  }}
                >
                  {places.map((place, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={place}
                      className="custom-checkbox"
                    />
                  ))}
                </div>
              </Col>
            </Row>

            <Row className=" justify-content-center mt-5">
              {buttonLabels.map((label, index) => (
                <Col key={index} className="col-5 p-0 m-1 ">
                  <Button
                    variant="outline-primary"
                    className={`btn-gold-outline w-100  h-100 rounded-0 ${
                      activeButtonEnd === index ? "active" : ""
                    }`}
                    onClick={() => handleButtonEnd(index)}
                  >
                    {label}
                  </Button>
                </Col>
              ))}
            </Row>

            <Row className=" justify-content-center mb-5">
              <Col className="col-11">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="mt-2 quicksand">
                    Insert address
                  </Form.Label>
                  <Form.Control type="text" required className="custom-input" />
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col className="col-11 bg-white mt-4 mb-5">
            <Row className=" justify-content-center">
              <Col className="col-10 mt-5">
                <h2 className="montserrat">Summary</h2>
              </Col>
            </Row>
            <Row className=" justify-content-center">
              <Col className="col-10 mt-5">
                <h6 className="code">Tour ... hours</h6>
              </Col>
              <Col className="col-10">
                <Row className=" justify-content-between">
                  <Col className="col-8">
                    <h6 className="code"> Total for ... passengers </h6>
                  </Col>
                  <Col className="col-4 "> 319 $</Col>
                </Row>
              </Col>
            </Row>
            <Row className=" justify-content-center">
              <Col className="col-5 mt-5 mb-4">
                <Button variant="primary">Continue</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MyTour2;
