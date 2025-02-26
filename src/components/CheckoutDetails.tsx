import { useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CheckoutDetails = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="bg-image">
      <Container className=" sans text-black">
        <Row>
          <Col className="col col-11 m-auto mt-3 mb-3">
            <h1 className="code text-black ">Booking details</h1>
          </Col>
        </Row>

        <Row>
          <Col className="col col-11 m-auto pt-3 bg-light bg-opacity-75 rounded ">
            <h4 className="text-black">Passenger Information</h4>
            <Row>
              <Col className="col col-12 m-auto ">
                <Form>
                  <Form.Group
                    className="mb-3 mt-3 "
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold code">
                      Passenger Name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Name and Surname" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold code">Email </Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold code">
                      Confirm Email
                    </Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>

                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold code">
                      Mobile phone
                    </Form.Label>
                    <PhoneInput
                      country={"us"}
                      placeholder="Number"
                      value={phone}
                      onChange={setPhone}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col className="col col-11 m-auto pt-3  bg-light bg-opacity-75 rounded mt-3 ">
            <h4 className="text-black code">Transfer Details</h4>
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">From</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> hotel astoriaaa</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">To</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> fiumicinooo areoportoooo</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Date</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> mai</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Pick-Up Time</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">12:00</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Passengers</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">4</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Luggages & Carry-on</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">4 big/2 small</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Child Seats</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">No child seat</p>
                  </Col>
                </Row>
                <Row className="mb-2 mt-4">
                  <Col className="col col-4 align-self-center">
                    <h6 className="m-0 text-thetriary code">Estimated Distance</h6>
                  </Col>
                  <Col className="col col-6">
                    <p className=" fw-bold mb-1">34.2 km</p>
                  </Col>
                </Row>
                <Row className="mb-2 ">
                  <Col className="col col col-4 align-self-center">
                    <h6 className="m-0 text-thetriary code">Estimated Trip Time</h6>
                  </Col>
                  <Col className="col col-6">
                    <p className=" fw-bold mb-1">40 mins</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col col-4 align-self-center">
                    <h6 className="m-0 text-thetriary code">List Price</h6>
                  </Col>
                  <Col className="col col-6">
                    <p className=" fw-bold mb-1 "> <s>70$</s></p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col col-4 align-self-center">
                    <h6 className="m-0 text-thetriary code">Discount Price</h6>
                  </Col>
                  <Col className="col col-6">
                    <p className=" fw-bold mb-1 fs-4 "> 50$</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default CheckoutDetails;
