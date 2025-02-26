import { Col, Container, Row, Form, Alert } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormInterface from "../types/Form";
import { useState } from "react";

interface myReservationProps {
  form: FormInterface;
  setForm: (newForm: FormInterface) => void;
}

const CheckoutDetails = (props: myReservationProps) => {
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmEmail(value);
    if (value !== props.form.email) {
      setEmailError("Le email non coincidono");
    } else {
      setEmailError("");
    }
  };
  //const isEmailMatch = props.form.email === confirmEmail; <----- lo usero quando ci sara il bottone per il redirect
  /*<Button
              variant="primary"
              size="lg"
              disabled={!isEmailMatch}
              onClick={() => {
                if (isEmailMatch) {
                  alert("Prenotazione confermata!");
                }
              }}
            >
              Prenota
            </Button>*/

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
                    <Form.Control
                      type="text"
                      placeholder="Name and Surname"
                      required
                      value={props.form.nameAndSurname}
                      onChange={(e) => {
                        props.setForm({
                          ...props.form,
                          nameAndSurname: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold code">Email </Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={props.form.email}
                      onChange={(e) => {
                        props.setForm({ ...props.form, email: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold code">
                      Confirm Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={confirmEmail}
                      onChange={handleConfirmEmailChange}
                    />
                    {emailError && (
                      <Alert variant="danger" className="mt-2">
                        {emailError}
                      </Alert>
                    )}
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
                      value={props.form.phone}
                      onChange={(value) => {
                        props.setForm({ ...props.form, phone: value });
                      }}
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
                    <p className=" fw-bold mb-1"> {props.form.pickUp}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">To</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> {props.form.dropOff}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Date</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> {props.form.pickUpDate}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Pick-Up Time</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">{props.form.pickUpTime}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Passengers</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">{props.form.passengers}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">
                      Luggages & Carry-on
                    </h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">{props.form.suitcases} big/ {props.form.backpack} small</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code">Child Seats</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">{props.form.childSeats}</p>
                  </Col>
                </Row>
                <Row className="mb-2 mt-4">
                  <Col className="col col-4 align-self-center">
                    <h6 className="m-0 text-thetriary code">
                      Estimated Distance
                    </h6>
                  </Col>
                  <Col className="col col-6">
                    <p className=" fw-bold mb-1">34.2 km</p>
                  </Col>
                </Row>
                <Row className="mb-2 ">
                  <Col className="col col col-4 align-self-center">
                    <h6 className="m-0 text-thetriary code">
                      Estimated Trip Time
                    </h6>
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
                    <p className=" fw-bold mb-1 ">
                      {" "}
                      <s>70$</s>
                    </p>
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
