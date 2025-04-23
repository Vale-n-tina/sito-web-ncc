import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import PriceData from "../types/PriceData";
import ReserveData from "../types/ReserveData";
import { useTranslation } from "react-i18next";

//props
interface myReservationProps {
  form: ReserveData;
  setForm: (newForm: ReserveData) => void;
}
const MyReservation = (props: myReservationProps) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  //Salva il ounto di partenza
  const [origin, setOrigin] = useState("");
  //Salva il punto di destinazione
  const [destination, setDestination] = useState("");
  const [requested, setRequested] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  //Memorizza la durata del percorso
  const [duration, setDuration] = useState<string | null>(null);
  //Memorizza la distanza del percorso in km
  const [distanceKm, setDistanceKm] = useState<string | null>(null);
  //Memorizza la distanza del percorso in metri
  const [distanceM, setDistanceM] = useState<number | null>(null);
  //Memorizza il tipo di pick-up, aereo, treno , other
  const [pickUpType, setPickUpType] = useState<
    "airport" | "port" | "train_station" | "other"
  >("other");

  //Spinner calcolo prezzo
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);

  //Memorizza il prezzo della corsa
  const [price, setPrice] = useState<number | null>(null);
  const originRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    pickUp: false,
    dropOff: false,
    pickUpDate: false,
    pickUpTime: false,
  });
  //Stati per la gestione della API Key
  const [googleMapsApiKey, setGoogleMapsApiKey] =useState<string>("");
  const [keyLoading, setKeyLoading] = useState(true);
  const [keyError, setKeyError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/prenotazioni/maps-key")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((key) => {
       
        setGoogleMapsApiKey(key.apikey);
        setKeyLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Google Maps API key:", error);
        setKeyError("Could not load Google Maps. Please try again later.");
        setKeyLoading(false);
      });
  }, []);

  const validateForm = () => {
    const errors = {
      pickUp: !props.form.pickUp,
      dropOff: !props.form.dropOff,
      pickUpDate: !props.form.pickUpDate,
      pickUpTime: !props.form.pickUpTime,
    };
    setValidationErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const center = {
    lat: 41.9027835,
    lng: 12.4963655,
  };
  const handleDirectionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: string
  ) => {
    if (status === "OK" && result) {
      if (
        result.routes &&
        result.routes[0] &&
        result.routes[0].legs &&
        result.routes[0].legs[0] &&
        result.routes[0].legs[0].duration &&
        result.routes[0].legs[0].distance
      ) {
        const duration = result.routes[0].legs[0].duration.text;
        const distanceKm = result.routes[0].legs[0].distance.text;
        const distanceM = result.routes[0].legs[0].distance.value;

        setDistanceM(distanceM);
        setDirections(result);
        setDuration(duration);
        setDistanceKm(distanceKm);
        setRequested(true);
      } else {
        console.error("La struttura della risposta non è valida:", result);
      }
    } else {
      console.log("Errore nelle direzioni:", status);
    }
  };

  //da inviare al back and per calcolare il prezzo

  const sendPriceDataToBackend = function (priceData: PriceData) {
    setError(null);
    fetch("http://localhost:8080/prenotazioni/price-calculation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(priceData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella richiesta");
        }
      })
      .then((result) => {
        
        setPrice(result);
        props.setForm({ ...props.form, price: result });
        setIsCalculatingPrice(false);
      })
      .catch((error) => {
        console.error("Errore:", error);
        setError("An error occurred while calculating the price.");
        setIsCalculatingPrice(false);
      });
  };
  //Fa la chiamata del cacolo del prezzo ogni volta che uno di questi parametri cambia
  useEffect(() => {
    if (distanceM !== null) {
      setIsCalculatingPrice(true);
      const priceData: PriceData = {
        distanceM: distanceM,
        passengers: props.form.passengers,
        suitcases: props.form.suitcases,
        backpack: props.form.backpack,
        pickUpTime: props.form.pickUpTime,
        childSeats: props.form.childSeats,
      };
      sendPriceDataToBackend(priceData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    distanceM,
    props.form.passengers,
    props.form.suitcases,
    props.form.backpack,
    props.form.pickUpTime,
    props.form.childSeats,
  ]);

  useEffect(() => {
    setRequested(false);
  }, [origin, destination]);

  // Funzione di callback per quando la libreria è caricata
  const onLoad = (
    autocomplete: google.maps.places.Autocomplete,
    type: "origin" | "destination"
  ) => {
    if (type === "origin") {
      originRef.current = autocomplete;
    } else {
      destinationRef.current = autocomplete;
    }
  };

  // Funzione di caricamento script
  const onScriptLoad = () => {
    setIsScriptLoaded(true);
  };
  const { t } = useTranslation();

  
  // Mostra lo stato di caricamento o errore prima di renderizzare la mappa
  if (keyLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading map...</span>
      </div>
    );
  }

  if (keyError) {
    return (
      <div className="alert alert-danger text-center m-5">
        {keyError}
      </div>
    );
  }

  if (!googleMapsApiKey) {
    return (
      <div className="alert alert-warning text-center m-5">
        Google Maps API key not available
      </div>
    );
  }

  return (
    <>
      <div className="bgTour">
        <Container>
          <Row className="justify-content-center">
            <Col className="col col-11 col-lg-6  m-auto ms-lg-0  mt-5 bg-white rounded shadow p-3  ">
              <Row>
                <Col className="col-11 m-auto p-0">
                  <h1 className="montserrat mt-3">
                    {t("ReservationBookTrip")}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col className=" bg-please col-11 m-auto mb-3 pt-3 color">
                  <p className="text-black quicksand">
                    {t("ReservationBookTripText")}
                  </p>
                </Col>
              </Row>

              <Form className="pt-2 max ">
                <Form.Group
                  className="mb-4 position-relative mt-3 z-1  rounded "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="m-0 label text-black z-2">
                    {t("ReservationPickUp")}
                  </Form.Label>
                  {isScriptLoaded && (
                    <Autocomplete
                      onLoad={(autocomplete) => onLoad(autocomplete, "origin")}
                      onPlaceChanged={() => {
                        if (originRef.current) {
                          const place = originRef.current.getPlace();
                          if (place && place.formatted_address) {
                            const formattedAddress = place.formatted_address;

                            // Determina il tipo di pick-up (airport, port, train_station, other)
                            let pickUpType:
                              | "airport"
                              | "port"
                              | "train_station"
                              | "other" = "other";
                            if (place.types?.includes("airport")) {
                              pickUpType = "airport";
                            } else if (
                              place.types?.includes("port") ||
                              place.name?.toLowerCase().includes("porto") ||
                              place.formatted_address
                                .toLowerCase()
                                .includes("port")
                            ) {
                              pickUpType = "port";
                            } else if (
                              place.types?.includes("train_station") ||
                              place.name?.toLowerCase().includes("stazione") ||
                              place.formatted_address
                                .toLowerCase()
                                .includes("stazione")
                            ) {
                              pickUpType = "train_station";
                            }

                            // Aggiorna tutti gli stati in un'unica operazione
                            setOrigin(formattedAddress);
                            setPickUpType(pickUpType);
                            props.setForm({
                              ...props.form,
                              pickUp: formattedAddress,
                              transportType: pickUpType,
                              transportDetails: "",
                            });
                          } else {
                            console.error("Indirizzo non valido o mancante.");
                          }
                        }
                      }}
                      options={{ componentRestrictions: { country: "it" } }}
                    >
                      <Form.Control
                        type="text"
                        placeholder={t("ReservationPlaceholder")}
                        required
                        value={origin} // Sincronizza il valore del campo con lo stato `origin`
                        onChange={(e) => {
                          const value = e.target.value;
                          setOrigin(value); // Aggiorna lo stato `origin` quando l'utente digita
                          props.setForm({ ...props.form, pickUp: value });
                          setValidationErrors((prev) => ({
                            ...prev,
                            pickUp: false,
                          }));
                        }}
                        className={`custom-inputReservation ${
                          validationErrors.pickUp ? "border border-danger" : ""
                        }`}
                      />
                    </Autocomplete>
                  )}
                  {validationErrors.pickUp && (
                    <p className="text-danger small  fw-bold">
                      {t("ReservationErrorPickUp")}
                    </p>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3 position-relative mt-3 z-1  rounded "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="m-0 label text-black z-2">
                    {t("ReservationDropOff")}
                  </Form.Label>
                  {isScriptLoaded && (
                    <Autocomplete
                      onLoad={(autocomplete) =>
                        onLoad(autocomplete, "destination")
                      }
                      onPlaceChanged={() => {
                        if (destinationRef.current) {
                          const place = destinationRef.current.getPlace();
                          if (place && place.formatted_address) {
                            setDestination(place.formatted_address);

                            props.setForm({
                              ...props.form,
                              dropOff: place.formatted_address,
                            });
                          } else {
                            console.error("Indirizzo non valido o mancante.");
                          }
                        }
                      }}
                      options={{ componentRestrictions: { country: "it" } }}
                    >
                      <Form.Control
                        type="text"
                        placeholder={t("ReservationPlaceholder")}
                        required
                        value={destination}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDestination(value);
                          props.setForm({ ...props.form, dropOff: value });
                          setValidationErrors((prev) => ({
                            ...prev,
                            dropOff: false,
                          }));
                        }}
                        className={`custom-inputReservation ${
                          validationErrors.dropOff ? "border border-danger" : ""
                        }`}
                      />
                    </Autocomplete>
                  )}
                  {validationErrors.dropOff && (
                    <p className="text-danger small fw-bold">
                      {t("ReservationErrorDropOff")}
                    </p>
                  )}
                </Form.Group>
                <div className="position-relative">
                  <i className="bi bi-person labelPerson fs-4 text-black "></i>
                  <Form.Select
                    aria-label="Default select example"
                    className=" custom-inputReservation rounded  position-relative"
                    required
                    value={props.form.passengers}
                    onChange={(e) => {
                      props.setForm({
                        ...props.form,
                        passengers: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </Form.Select>
                  <p className="small"> {t("ReservationPassengers")}</p>
                </div>

                <Row>
                  <Col className=" position-relative col-6">
                    <i className="bi bi-suitcase-lg-fill labelSuitcase fs-5 text-black"></i>
                    <Form.Select
                      aria-label="Default select example"
                      required
                      className="custom-inputReservation"
                      value={props.form.suitcases}
                      onChange={(e) => {
                        props.setForm({
                          ...props.form,
                          suitcases: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </Form.Select>
                    <p className="small">{t("ReservationSuitcases")} </p>
                  </Col>
                  <Col className=" position-relative col-6">
                    <i className="bi bi-backpack-fill fs-5 labelSuitcase text-black"></i>
                    <Form.Select
                      aria-label="Default select example"
                      className="custom-inputReservation"
                      required
                      value={props.form.backpack}
                      onChange={(e) => {
                        props.setForm({
                          ...props.form,
                          backpack: parseInt(e.target.value),
                        });
                      }}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </Form.Select>
                    <p className="small">{t("ReservationBackpack")}</p>
                  </Col>
                </Row>
                <Row className="align-items-baseline">
                  <Col className=" position-relative col-6 col-lg-3">
                    <i className="bi bi-calendar-fill labelCalendar text-black "></i>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      min={`${new Date().getFullYear()}-${(
                        new Date().getMonth() + 1
                      )
                        .toString()
                        .padStart(2, "0")}-${new Date()
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`}
                      required
                      value={props.form.pickUpDate}
                      onChange={(e) => {
                        props.setForm({
                          ...props.form,
                          pickUpDate: e.target.value,
                        });
                        setValidationErrors((prev) => ({
                          ...prev,
                          pickUpDate: false,
                        }));
                      }}
                      className={`custom-inputReservation ${
                        validationErrors.pickUpDate
                          ? "border border-danger"
                          : ""
                      }`}
                    />
                    {validationErrors.pickUpDate && (
                      <p className="text-danger small  fw-bold">
                        {t("ReservationErrorDate")}
                      </p>
                    )}
                    <br />
                    <label htmlFor="data" className="small">
                      {t("ReservationDate")}
                    </label>
                  </Col>
                  <Col className=" position-relative  col-6 ps-0 col-lg-3">
                    <i className="bi bi-clock-fill labelClock text-black"></i>
                    <input
                      type="time"
                      id="ora"
                      name="data"
                      required
                      value={props.form.pickUpTime}
                      onChange={(e) => {
                        props.setForm({
                          ...props.form,
                          pickUpTime: e.target.value,
                        });
                        setValidationErrors((prev) => ({
                          ...prev,
                          pickUpTime: false,
                        }));
                      }}
                      className={`custom-inputReservation${
                        validationErrors.pickUpTime
                          ? "border border-danger"
                          : ""
                      }`}
                    />
                    {validationErrors.pickUpTime && (
                      <p className="text-danger small  fw-bold">
                        {t("ReservationErrorTime")}
                      </p>
                    )}{" "}
                    <br />
                    <label htmlFor="data" className="small">
                      {t("ReservationTime")}
                    </label>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    {pickUpType === "airport" && (
                      <Form.Group
                        className=" position-relative mt-3 z-1  rounded "
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="m-0 labelAirplane text-black z-2 ">
                          <i className="bi bi-airplane-fill fs-5 "></i>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="AA 567"
                          required
                          className="custom-inputReservation"
                          value={props.form.transportDetails || ""}
                          onChange={(e) => {
                            props.setForm({
                              ...props.form,
                              transportDetails: e.target.value,
                            });
                          }}
                        />
                      </Form.Group>
                    )}
                    {pickUpType === "port" && (
                      <Form.Group
                        className=" position-relative mt-3 z-1 rounded "
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="m-0 labelShip text-black z-2 ">
                          <i className="bi bi-arrow-down-right-circle-fill fs-6"></i>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="custom-inputReservation"
                          placeholder={t("ReservationLabelCruise")}
                          required
                          value={props.form.transportDetails || ""}
                          onChange={(e) => {
                            props.setForm({
                              ...props.form,
                              transportDetails: e.target.value,
                            });
                          }}
                        />
                      </Form.Group>
                    )}
                    {pickUpType === "train_station" && (
                      <Form.Group
                        className=" position-relative mt-3 z-1 rounded "
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="m-0 labelShip text-black z-2 ">
                          <i className="bi bi-train-front-fill fs"></i>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="custom-inputReservation"
                          placeholder={t("ReservationLabelTrain")}
                          required
                          value={props.form.transportDetails || ""}
                          onChange={(e) => {
                            props.setForm({
                              ...props.form,
                              transportDetails: e.target.value,
                            });
                          }}
                        />
                      </Form.Group>
                    )}
                    <p className="small m-0">
                      {pickUpType === "airport"
                        ? t("ReservationLabelPlane")
                        : pickUpType === "port"
                        ? t("ReservationLabelCruise")
                        : pickUpType === "train_station"
                        ? t("ReservationLabelTrain")
                        : ""}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-12 ">
                    <Form.Group
                      className=" position-relative mt-3 z-1  rounded "
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className="m-0 labelPaper text-black z-2">
                        <i className="bi bi-sticky-fill fs-5"></i>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("ReservationPlaceholderHolds")}
                        className="custom-inputReservation"
                        value={props.form.nameOnBoard}
                        onChange={(e) => {
                          props.setForm({
                            ...props.form,
                            nameOnBoard: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <p className="small">{t("ReservationHolds")}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className=" position-relative col-6">
                    <i className="bi bi-person-arms-up labelChild fs-5 text-black"></i>

                    <Form.Select
                      aria-label="Default select example"
                      required
                      className="custom-inputReservation"
                      value={props.form.childSeats}
                      onChange={(e) => {
                        props.setForm({
                          ...props.form,
                          childSeats: e.target.value,
                        });
                      }}
                    >
                      <option value="noChildSeats">
                        {t("ReservationChilsSeatsOption")}
                      </option>
                      <option value="1ChildSeat">1</option>
                      <option value="2ChildSeat">2</option>
                      <option value="3ChildSeat">3</option>
                      <option value="4ChildSeat">4</option>
                    </Form.Select>
                    <p className="small">{t("ReservationChilsSeats")}</p>
                  </Col>
                </Row>
                <Form.Group
                  className="mb-3 position-relative"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="labelRequest text-black">
                    {t("ReservationRequest")}
                  </Form.Label>
                  <Form.Control
                    placeholder={t("ReservationRequestPlaceholder")}
                    as="textarea"
                    className="custom-inputReservation"
                    rows={3}
                    value={props.form.requests}
                    onChange={(e) => {
                      props.setForm({
                        ...props.form,
                        requests: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col className="col col-11 col-lg-6 m-sm-auto p-0 m-lg-0 ">
              <Row>
                <Col className="col col-11 m-auto mt-5 bg-light bg-opacity-75 rounded p-0 shadow">
                
                  <LoadScript
                    googleMapsApiKey={googleMapsApiKey}
                    libraries={["places"]}
                    onLoad={onScriptLoad}
                  >
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "450px" }}
                      center={center}
                      zoom={12}
                      options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                    >
                      {origin && destination && !requested && (
                        <DirectionsService
                          options={{
                            origin: origin,
                            destination: destination,
                            travelMode: google.maps.TravelMode.DRIVING,
                          }}
                          callback={handleDirectionsCallback}
                        />
                      )}

                      {directions && (
                        <DirectionsRenderer
                          options={{
                            directions: directions,
                          }}
                        />
                      )}
                    </GoogleMap>
                  </LoadScript>
                  {error && <Alert variant="danger">{error}</Alert>}
                </Col>
                <Col className="col col-11 m-auto mt-3 bg-white rounded px-5 shadow p-3 mb-5 max2">
                  <Row className="mt-3">
                    <Col className="text-center">
                      <h2 className="montserrat ">{t("ReservationSummary")}</h2>
                    </Col>
                  </Row>
                  <Row className="mt-3 mb-3">
                    <Col>
                      <h6 className="merriweather">
                        {t("ReservationEstimatedDistace")}{" "}
                      </h6>
                    </Col>
                    <Col>
                      <p className=" fw-bold"> {distanceKm}</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <h6 className="merriweather">
                        {t("ReservationEstimatedTime")}
                      </h6>
                    </Col>
                    <Col>
                      <p className=" fw-bold">{duration}</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <h6 className="merriweather">
                        {t("ReservationListPrice")}{" "}
                      </h6>
                    </Col>
                    <Col>
                      <p className=" fw-bold">
                        {price !== null && (
                          <del>
                            {price < 20
                              ? Math.round(price * 1.2)
                              : Math.round(price * 1.1)}
                            €
                          </del>
                        )}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <h6 className="merriweather">
                        {t("ReservationDiscountPrice")}{" "}
                      </h6>
                    </Col>
                    <Col>
                      {isCalculatingPrice ? (
                        <div className="d-flex align-items-center">
                          <Spinner animation="border" variant="secondary" />
                        </div>
                      ) : (
                        <p className="merriweather fw-bold">
                          {price !== null ? `${price}€` : "-"}
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center mb-4 mt-2">
                      <Link
                        to="/CheckoutDetails/transfer"
                        style={{
                          pointerEvents:
                            isCalculatingPrice || error !== null
                              ? "none"
                              : "auto",
                          display: "inline-block",
                        }}
                      >
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            if (!validateForm()) {
                              e.preventDefault();
                            }
                          }}
                          disabled={isCalculatingPrice || error !== null}
                        >
                          {t("ReservationContinue")}
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default MyReservation;
