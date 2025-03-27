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

import { useMemo, useState } from "react";
import ReserveData from "../types/ReserveData";

import TourData from "../types/TourData";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripePayment } from "./StripePayment";
import { useTranslation } from "react-i18next";
interface myReservationProps {
  form: ReserveData;
  tour: TourData;
  setForm: (newForm: ReserveData) => void;
  setTour: (newTour: TourData) => void;
}
const stripePromise = loadStripe(
  "pk_test_51R6qWc4bcd5G5tJwBBeDTQur6TY9LnDX57Ci1iujA6vFzIqlUt0UisczJDkk87txkQZ5X1IwwMi8CFi6AbNCVDYg00AfMbiz0B"
);
const CheckoutDetails = (props: myReservationProps) => {
  const { type } = useParams<{ type: "transfer" | "tour" }>();
  const { form, tour, setForm, setTour } = props;
  const isTour = type === "tour";

  //Match email
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  //Validazione errori campi obbligatori
  const [validationErrors, setValidationErrors] = useState({
    nameAndSurname: false,
    email: false,
    phone: false,
  });

  //Pagamento
  const [paymentError, setPaymentError] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const { t, } = useTranslation(); 

  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
    bookNow();
  };



  //validazioni degli errori
  const isFormValid = useMemo(() => {
    const errors = {
      nameAndSurname: !(isTour ? tour.passengerName : form.nameAndSurname).trim(),
      email: !(isTour ? tour.email : form.email).trim() || 
             !/\S+@\S+\.\S+/.test(isTour ? tour.email : form.email),
      phone: !(isTour ? tour.phoneNumber : form.phone).trim(),
    };
    
    setValidationErrors(errors);
    return !Object.values(errors).some(Boolean);
  }, [isTour, tour, form]);
  
  

  //verifica se le email corrispondono
  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmEmail(value);
    if (value !== (isTour ? tour.email : form.email)) {
      setEmailError("The emails do not match");
    } else {
      setEmailError("");
    }
  };
  const isEmailMatch = (isTour ? tour.email : form.email) === confirmEmail;


  //Richiesta di prenotazione
  const bookNow = function () {
    const endpoint = isTour ? "/tour/bookNow" : "/prenotazioni/bookNow";
    const payload = isTour ? tour : form;

    fetch(`http://localhost:8080${endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
         
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


  //Chiusura modale
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bgTour">
        <Container className=" sans text-black ">
          <Row>
            <Col className="col col-11 m-auto mt-3 ">
              <h1 className=" merriweather text-black  shadow p-3 mb-5 rounded bg-white text-center">
              {t("bookingDetails")}
              </h1>
            </Col>
          </Row>

          <Row>
            <Col className="col col-11 m-auto pt-3  bg-white rounded shadow p-3 mb-3 rounded ">
              <h4 className="text-black merriweather">{t("passengerInformation")}</h4>
              <Row>
                <Col className="col col-12 col-md-6 col-lg-5 m-auto merriweather ">
                  <Form>
                    <Form.Group
                      className="mb-3 mt-3 "
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="m-0 fw-bold code merriweather">
                      {t("passengerName")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name and Surname"
                        className="custom-inputReservation"
                        required
                        value={
                          isTour ? tour.passengerName : form.nameAndSurname
                        }
                        onChange={(e) => {
                          if (isTour) {
                            setTour({ ...tour, passengerName: e.target.value });
                          } else {
                            setForm({
                              ...form,
                              nameAndSurname: e.target.value,
                            });
                          }
                          setValidationErrors((prev) => ({
                            ...prev,
                            nameAndSurname: false,
                          }));
                        }}
                      />
                      {validationErrors.nameAndSurname && (
                        <p className="text-danger small">
                          {t("passengerNameRequired")}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="m-0 fw-bold code merriweather">
                      {t("email")}
                      </Form.Label>
                      <Form.Control
                        type="email"
                        required
                        value={isTour ? tour.email : form.email}
                        onChange={(e) => {
                          if (isTour) {
                            setTour({ ...tour, email: e.target.value });
                          } else {
                            setForm({ ...form, email: e.target.value });
                          }
                          setValidationErrors((prev) => ({
                            ...prev,
                            email: false,
                          }));
                        }}
                        className={`custom-inputReservation ${
                          validationErrors.email ? "border border-danger" : ""
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-danger small">
                          {!(isTour ? tour.email : form.email).trim()
                            ? "The email is required."
                            : "Please enter a valid email address."}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="m-0 fw-bold code merriweather">
                      {t("confirmEmail")}
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={confirmEmail}
                        onChange={handleConfirmEmailChange}
                        className="custom-inputReservation"
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
                      {t("mobilePhone")}
                      </Form.Label>
                      <PhoneInput
                        country={"us"}
                        placeholder="Number"
                        value={isTour ? tour.phoneNumber : form.phone}
                        onChange={(value) => {
                          if (isTour) {
                            setTour({ ...tour, phoneNumber: value });
                          } else {
                            setForm({ ...form, phone: value });
                          }
                          setValidationErrors((prev) => ({
                            ...prev,
                            phone: false,
                          }));
                        }}
                        inputClass={`custom-inputReservation ${
                          validationErrors.phone ? "border border-danger" : ""
                        }`}
                        inputStyle={{
                          width: "100%",
                        }}
                      />
                      {validationErrors.phone && (
                        <p className="text-danger small">
                            {t("phoneRequired")}
                        </p>
                      )}
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col className="col col-11 m-auto pt-3  bg-white rounded mt-3 px-5 mb-4 shadow p-3 mb-5 rounded">
              <h4 className="text-black mt-4 mb-5 merriweather">
                {isTour ? t("tourDetails")  : t("transferDetails")}
              </h4>
              <Row>
                <Col>
                  {isTour ? (
                    <>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary  merriweather">
                          {t("from")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1"> {props.tour.pickUp}</p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary merriweather">
                          {t("to")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1"> {props.tour.dropOff}</p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary merriweather">
                          {t("date")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1"> {props.tour.date}</p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary merriweather">
                          {t("pickUpTime")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">{props.tour.time}</p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary merriweather">
                          {t("passengers")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">
                            {props.tour.passengers}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary merriweather">
                          {t("duration")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">
                            {props.tour.duration} {t("hours")}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2 align-items-center">
                        <Col className="col col-12 col-md-4 col-lg-4">
                          <h6 className="m-0 text-thetriary fw-bold fs-4 merriweather">
                          {t("price")}
                          </h6>
                        </Col>
                        <Col className="col col-12 col-md-4 col-lg-4">
                          <p className=" fw-bold mb-1 fs-4   merriweather">
                            {props.tour.price}€
                          </p>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary code merriweather">
                          {t("from")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1"> {props.form.pickUp}</p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary code merriweather">
                          {t("to")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1"> {props.form.dropOff}</p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary code merriweather">
                          {t("date")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">
                            {" "}
                            {props.form.pickUpDate}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary code merriweather">
                          {t("pickUpTime")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">
                            {props.form.pickUpTime}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary code merriweather">
                          {t("passengers")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">
                            {props.form.passengers}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary code merriweather">
                          {t("luggagesAndCarryOn")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">
                            {props.form.suitcases} {t("big")} {props.form.backpack}{" "}
                            {t("small")}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="col col-11">
                          <h6 className="m-0 text-thetriary code merriweather">
                          {t("childSeats")}
                          </h6>
                        </Col>
                        <Col className="col col-11">
                          <p className=" fw-bold mb-1">
                            {props.form.childSeats}
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2 align-items-center">
                        <Col className="col col-12 col-md-4 col-lg-4">
                          <h6 className="m-0 text-thetriary code fw-bold fs-4 meFrriweather">
                          {t("discountPrice")}
                          </h6>
                        </Col>
                        <Col className="col col-12 col-md-4 col-lg-4">
                          <p className=" fw-bold mb-1 fs-4 ">
                            {props.form.price}€
                          </p>
                        </Col>
                      </Row>
                    </>
                  )}
                  <div className="mt-5">
                    <Elements stripe={stripePromise}>
                      <StripePayment
                        amount={isTour ? tour.price : form.price}
                        onSuccess={handlePaymentSuccess}
                        onError={setPaymentError}
                        disabled={
                          !isEmailMatch ||
                          isSubmitted || !isFormValid
                        }
                        customerEmail={isTour ? tour.email : form.email}
                      />
                    </Elements>
                    {isPaymentSuccessful && (
                      <div className="alert alert-success">
                           {t("paymentSuccessful")}
                      </div>
                    )}
                    {paymentError && (
                      <Alert variant="danger" className="mt-3">
                        {paymentError}
                      </Alert>
                    )}
                    

                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t("PrenotazioneCompletata")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <p>
              {t("yourBookingCompleted", { email: isTour ? tour.email : form.email })}
              </p>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
            {t("close")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default CheckoutDetails;
