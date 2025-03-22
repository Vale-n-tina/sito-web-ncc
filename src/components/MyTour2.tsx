import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TourData from "../types/TourData";
import { Link } from "react-router-dom";
import PriceDataTour from "../types/PriceDataTour";

interface myReservationPropsTour {
  tour: TourData;
  setTour: (newForm: TourData) => void;
  checkBox: string[];
}
const MyTour2 = (props: myReservationPropsTour) => {
  const [activeButtonStart, setActiveButtonStart] = useState<number>(0);
  const [activeButtonEnd, setActiveButtonEnd] = useState<number>(0);
  const [selectedButtonStart, setSelectedButtonstart] = useState<number>(0);
  const [selectedButtonEnd, setSelectedButtonEnd] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    pickUp: false,
    dropOff: false,
    dateTime: false,
    optionalStops: false,
  });
  const validateForm = () => {
    const errors = {
      pickUp: !props.tour.pickUp,
      dropOff: !props.tour.dropOff,
      dateTime: !props.tour.date || !props.tour.time,
      optionalStops: props.tour.optionalStops.length === 0,
    };
    setValidationErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleButtonStart = (index: number) => {
    setActiveButtonStart(index);
    setSelectedButtonstart(index);
    const selectedLocation = buttonLabels[index];
    props.setTour({ ...props.tour, startLocation: selectedLocation });
  };

  const handleButtonEnd = (index: number) => {
    setActiveButtonEnd(index);
    setSelectedButtonEnd(index);
    const selectedLocation = buttonLabels[index];
    props.setTour({ ...props.tour, endLocation: selectedLocation });
  };

  //funzione per vedere se è selezionata una checkBox
  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    const cleanedLabel = label.replace(/ \(\+ \d+ min\)/, "");
    if (isChecked) {
      props.setTour({
        ...props.tour,
        optionalStops: [...props.tour.optionalStops, cleanedLabel],
      });
    } else {
      props.setTour({
        ...props.tour,
        optionalStops: props.tour.optionalStops.filter(
          (monument) => monument !== cleanedLabel
        ),
      });
    }
  };

  const buttonLabels: string[] = [
    "Rome",
    "Fiumicino Airport",
    "Ciampino Airport",
    "Civitavecchia Dock",
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

  const renderFormGroup = (field: keyof TourData, button: number) => {
    switch (button) {
      case 0: // Rome
        return (
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="mt-2 quicksand">Insert address</Form.Label>
            <Form.Control
              type="text"
              required
              className="custom-input"
              value={props.tour[field]}
              onChange={(e) => {
                props.setTour({ ...props.tour, [field]: e.target.value });
                setValidationErrors((prev) => ({ ...prev, [field]: false }));
              }}
            />
          </Form.Group>
        );
      case 1: // Fiumicino Airport
      case 2: // Ciampino Airport
        return (
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="mt-2 quicksand">
              Insert number fly
            </Form.Label>
            <Form.Control
              type="text"
              required
              className="custom-input"
              value={props.tour[field]}
              onChange={(e) => {
                props.setTour({ ...props.tour, [field]: e.target.value });
                setValidationErrors((prev) => ({ ...prev, [field]: false }));
              }}
            />
          </Form.Group>
        );
      case 3: // Civitavecchia Dock
        return (
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="mt-2 quicksand">
              Insert cruise ship name
            </Form.Label>
            <Form.Control
              type="text"
              required
              className="custom-input"
              value={props.tour[field]}
              onChange={(e) => {
                props.setTour({ ...props.tour, [field]: e.target.value });
                setValidationErrors((prev) => ({ ...prev, [field]: false }));
              }}
            />
          </Form.Group>
        );
      default:
        return null;
    }
  };

  const sendPriceDataToBackend = function (priceDataTour: PriceDataTour) {
    setError(null);
    fetch("http://localhost:8080/tour/price-calculation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(priceDataTour),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella richiesta");
        }
      })
      .then((result) => {
        console.log("Risultato:", result);
        setPrice(result.price);
        setDuration(result.duration);
        props.setTour({
          ...props.tour,
          price: result.price,
          duration: result.duration,
        });
      })
      .catch((error) => {
        console.error("Errore:", error);
        setError("An error occurred while calculating the price.");
        setPrice(null);
        setDuration("");
      });
  };

  useEffect(() => {
    const priceDataTour: PriceDataTour = {
      optionalStops: props.tour.optionalStops,
      passengers: props.tour.passengers,
      startLocation: props.tour.startLocation,
      endLocation: props.tour.endLocation,
    };
    sendPriceDataToBackend(priceDataTour);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.tour.optionalStops,
    props.tour.passengers,
    props.tour.startLocation,
    props.tour.endLocation,
  ]);

  return (
    <div className="bgTour">
      <Container>
        <h1 className="montserrat pt-5 ms-4">Classic Tour</h1>
        <p className=" small ms-4">
          Select the monuments you do not want to miss.
        </p>
        <Row className=" justify-content-center">
          <Col className="col-11 bg-white col-lg-8 mb-lg-5">
            <p className="quicksand ms-3 mb-3 mt-4">Tour starting from</p>
            <Row className=" justify-content-center ">
              {buttonLabels.map((label, index) => (
                <Col key={index} className="col-5 p-0 m-1 ">
                  <Button
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
                {renderFormGroup("pickUp", selectedButtonStart)} {}
                {validationErrors.pickUp && (
                  <p className="text-danger small">
                    The PickUp Address is required.
                  </p>
                )}
              </Col>
            </Row>

            <Row className=" justify-content-center justify-content-lg-around ">
              <Col className="col-11 col-lg-5">
                <Form.Label className="mt-3 quicksand">Select date</Form.Label>
                <input
                  type="datetime-local"
                  name="datetime"
                  required
                  className="custom-datetime-input"
                  value={`${props.tour.date}T${props.tour.time}`}
                  min={new Date().toISOString().slice(0, 16)} 
                  onChange={(e) => {
                    const datetimeValue = e.target.value;
                    const [date, time] = datetimeValue.split("T");

                    props.setTour({
                      ...props.tour,
                      date: date || "",
                      time: time || "",
                    });
                    setValidationErrors((prev) => ({
                      ...prev,
                      dateTime: false,
                    }));
                  }}
                />
                {validationErrors.dateTime && (
                  <p className="text-danger small">
                    The date and time are required.
                  </p>
                )}
              </Col>

              <Col className="col-11 col-lg-5">
                <Form.Label className="mt-3 quicksand">
                  Select number of passengers
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="custom-select"
                  value={props.tour.passengers}
                  onChange={(e) => {
                    props.setTour({
                      ...props.tour,
                      passengers: parseInt(e.target.value),
                    });
                  }}
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

            <Row className=" justify-content-center justify-content-lg-around">
              <Col className="col-11 col-lg-5">
                <Form.Label className="mt-3 quicksand">
                  Included in 4 hours:
                </Form.Label>
                {props.checkBox.map((label, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={label}
                    className="custom-checkbox"
                    checked={props.tour.optionalStops.includes(label)}
                    onChange={(e) =>
                      handleCheckboxChange(label, e.target.checked)
                    }
                  />
                ))}
              </Col>
              <Col className="col-11  col-lg-5">
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
                      checked={props.tour.optionalStops.includes(
                        place.replace(/ \(\+ \d+ min\)/, "")
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(place, e.target.checked)
                      }
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
                {renderFormGroup("dropOff", selectedButtonEnd)} {}
                {validationErrors.dropOff && (
                  <p className="text-danger small">
                    The DropOff Address is required.
                  </p>
                )}
              </Col>
            </Row>
          </Col>

          <Col className="col-11 bg-white mt-4 mt-lg-0 mb-5 ms-1 col-lg-3">
            <Row className=" justify-content-center">
              <Col className="col-10 mt-5 p-0">
                <h2 className="montserrat">Summary</h2>
              </Col>
            </Row>
            <Row className=" justify-content-center">
              <Col className="col-10 mt-5 p-0">
                <h6 className="merriweather">Tour {duration} hours</h6>
              </Col>
              <Col className="col-10 p-0">
                <Row className=" justify-content-between">
                  <Col className="col-7">
                    <h6 className="merriweather">
                      {" "}
                      Total for {props.tour.passengers} passengers{" "}
                    </h6>
                  </Col>

                  <Col>
                    <h4 className="col-3 merriweather fw-bold  "> {price}€</h4>
                  </Col>
                </Row>
                {!error && <p className="text-danger small">{error}</p>}
              </Col>
            </Row>
            <Row className=" justify-content-center">
              <Col className="col-5 mt-4 mb-4">
                <Link to="/CheckoutDetails/tour">
                  <Button
                    className="custom-button"
                    onClick={(e) => {
                      if (!validateForm()) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Continue
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MyTour2;
