import {
  Col,
  Container,
  Row,
  Form,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useState } from "react";
import ReserveData from "../types/ReserveData";
import MyFooter from "./MyFooter";

interface myReservationProps {
  form: ReserveData;
  setForm: (newForm: ReserveData) => void;
}

const CheckoutDetails = (props: myReservationProps) => {
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmEmail(value);
    if (value !== props.form.email) {
      setEmailError("Le email non coincidono");
    } else {
      setEmailError("");
    }
  };
  const isEmailMatch = props.form.email === confirmEmail;

  const bookNow = function (form: ReserveData) {
    fetch("http://localhost:8080/prenotazioni/bookNow", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Prenotazione effettuata con successo!");
          setIsSubmitted(true);
          setShowModal(true);
          return;
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <div className="bg-image">
      <Container className=" sans text-black merriweather">
        <Row>
          <Col className="col col-11 m-auto mt-3 ">
            <h1 className="code text-black merriweather shadow p-3 mb-5 rounded bg-light bg-opacity-75 text-center">Booking details</h1>
          </Col>
        </Row>

        <Row>
          <Col className="col col-11 m-auto pt-3 bg-light bg-opacity-75 rounded shadow p-3 mb-3 rounded ">
            <h4 className="text-black merriweather">Passenger Information</h4>
            <Row>
              <Col className="col col-12 col-md-6 col-lg-5 m-auto merriweather ">
                <Form>
                  <Form.Group
                    className="mb-3 mt-3 "
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold code merriweather">
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
                    <Form.Label className="m-0 fw-bold code merriweather">Email </Form.Label>
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
                    <Form.Label className="m-0 fw-bold code merriweather">
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
                    <Form.Label className="m-0 fw-bold code merriweather">
                      Mobile phone
                    </Form.Label>
                    <PhoneInput
                      country={"us"}
                      placeholder="Number"
                      value={props.form.phone}
                      onChange={(value) => {
                        props.setForm({ ...props.form, phone: value });
                      }}
                      inputStyle={{
                        width: "100%",
                      }}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col className="col col-11 m-auto pt-3  bg-light bg-opacity-75 rounded mt-3 px-5 mb-4 shadow p-3 mb-5 rounded">
            <h4 className="text-black code mt-4 mb-5 merriweather">Transfer Details</h4>
            <Row>
              <Col >
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code merriweather">From</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> {props.form.pickUp}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code merriweather">To</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> {props.form.dropOff}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code merriweather">Date</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1"> {props.form.pickUpDate}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code merriweather">Pick-Up Time</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">{props.form.pickUpTime}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code merriweather">Passengers</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">{props.form.passengers}</p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code merriweather">
                      Luggages & Carry-on
                    </h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">
                      {props.form.suitcases} big/ {props.form.backpack} small
                    </p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="col col-11">
                    <h6 className="m-0 text-thetriary code merriweather">Child Seats</h6>
                  </Col>
                  <Col className="col col-11">
                    <p className=" fw-bold mb-1">{props.form.childSeats}</p>
                  </Col>
                </Row>
                <Row className="mb-2 align-items-center">
                  <Col className="col col-12 col-md-4 col-lg-4">
                    <h6 className="m-0 text-thetriary code fw-bold fs-4 merriweather">
                      Discount Price
                    </h6>
                  </Col>
                  <Col className="col col-12 col-md-4 col-lg-4">
                    <p className=" fw-bold mb-1 fs-4 ">{props.form.price}€</p>
                  </Col>
                  <Col className="col col-12 col-md-12 col-lg-12 my-3 merriweather">
                    <Button
                      variant="success"
                      disabled={!isEmailMatch || isSubmitted}
                      onClick={() => bookNow(props.form)}
                    >
                      BOOK NOW
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your booking has been successfully completed, we will send you a confirmation email to the address {props.form.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <MyFooter/>
    </>
  );
};
export default CheckoutDetails;
