import { useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/src/shared/types.js";

import TransferResponse from "../types/TransferResponse";
import { Modal, Tab, Table, Tabs } from "react-bootstrap";
import TourResponse from "../types/TourResponse";
const MyAdministration = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [transfers, setTransfers] = useState<TransferResponse[]>([]);
  const [tours, setTours] = useState<TourResponse[]>([]);
  const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [activeTab, setActiveTab] = useState<"Transfer" | "Tour">("Transfer");
  const [fullscreen, setFullscreen] = useState<
    | true
    | "sm-down"
    | "md-down"
    | "lg-down"
    | "xl-down"
    | "xxl-down"
    | undefined
  >(true);
  const [show, setShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<
    TransferResponse | TourResponse | null
  >(null);

  const handleRowClick = (
    booking: TransferResponse | TourResponse,
    breakpoint:
      | true
      | "sm-down"
      | "md-down"
      | "lg-down"
      | "xl-down"
      | "xxl-down"
  ) => {
    setSelectedBooking(booking);
    setFullscreen(breakpoint);
    setShow(true);
  };

  const handleTabChange = (tab: "Transfer" | "Tour") => {
    setActiveTab(tab);
  };

  //fetch
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setDate(value);

      // Formatta la data come "YYYY-MM-DD"
      const formattedDate = value.toLocaleDateString("en-CA");
      const authToken = localStorage.getItem("authToken");

      // Effettua una richiesta API per ottenere i trasferimenti/tour
      fetch(
        `http://localhost:8080/prenotazioni/by-date?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore durante il fetch dei trasferimenti");
          }
          return response.json();
        })
        .then((data: TransferResponse[]) => {
          setTransfers(data); // Imposta i trasferimenti nello stato
        })
        .catch((error) => {
          console.error("Errore durante il fetch dei trasferimenti:", error);
        });

      fetch(`http://localhost:8080/tour/by-date?date=${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore durante il fetch dei tour");
          }
          return response.json();
        })
        .then((data: TourResponse[]) => {
          setTours(data); // Imposta i tour nello stato
        })
        .catch((error) => {
          console.error("Errore durante il fetch dei tour:", error);
        });
    }
  };
  
  const handleDelete = () => {
    const authToken = localStorage.getItem("authToken");
    if (selectedBooking) {
      fetch(`http://localhost:8080/tour/delete/${selectedBooking.id}`, {
        method: "DELETE", headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Usa la key dinamica
        },
      })
      
        .then(() => {
          
          setShow(false);
          setTours((prevTours) =>
            prevTours.filter((tour) => tour.id !== selectedBooking.id)
          );
        })
        .catch((error) => {
          console.error("Errore:", error);
        });
    }
  };

  // Funzione per gestire la modifica
  const handleEdit = () => {
    if (selectedBooking) {
      // Logica per modificare la prenotazione
      console.log("Modificato:", selectedBooking);
    }
  };

  return (
    <div className=" overflow-hidden">
      <h1 className="text-center merriweather m-3">Seleziona una data</h1>
      <div className="fullscreen-calendar">
        <Calendar
          onChange={handleDateChange} // Gestisce il cambio di data
          value={date} // Imposta la data selezionata
        />
      </div>

      <h3 className="mt-4 mb-5 text-center merriweather ">
        {activeTab === "Transfer" ? "Trasferimenti" : "Tour"} per il giorno{" "}
        {date.toLocaleDateString()}
      </h3>
      <Tabs
        activeKey={activeTab}
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={(key) => handleTabChange(key as "Transfer" | "Tour")}
      >
        <Tab eventKey="Transfer" title="Transfer">
          <div className="table-responsive">
            <Table striped bordered hover size="sm ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>PickUp</th>
                  <th>DropOff</th>
                  <th>Passengers</th>
                  <th>Day and time</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((booking) => (
                  <tr
                    key={booking.id}
                    onClick={() => handleRowClick(booking, "lg-down")}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{booking.id}</td>
                    <td>{booking.pickUp}</td>
                    <td>{booking.dropOff}</td>
                    <td>{booking.passengers}</td>
                    <td>
                      {booking.pickUpDate}/{booking.pickUpTime}
                    </td>
                    <td>{booking.price}€</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="Tour" title="Tour" className="mb-5">
          <div className="table-responsive">
            <Table striped bordered hover size="sm ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>PickUp</th>
                  <th>DropOff</th>
                  <th>Passengers</th>
                  <th>Day and time</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr
                    key={tour.id}
                    onClick={() => handleRowClick(tour, "lg-down")}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{tour.id}</td>
                    <td>{tour.pickUp}</td>
                    <td>{tour.dropOff}</td>
                    <td>{tour.passengers}</td>
                    <td>
                      {tour.date}/{tour.time}
                    </td>
                    <td>{tour.price}€</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      {/* Modale per mostrare i dettagli della prenotazione */}

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Dettagli Prenotazione
            <div>
              <i className="bi bi-trash3-fill me-3" onClick={handleDelete}></i>
              <i className="bi bi-pen-fill" /*onClick={handleEdit}*/></i>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Table borderless>
              <tbody>
                {activeTab === "Transfer" ? (
                  // Dettagli per i trasferimenti
                  <>
                    <tr className="table-light">
                      <td>
                        <strong>Nome:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).nameAndSurname}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Pickup:</strong>
                      </td>
                      <td>{(selectedBooking as TransferResponse).pickUp}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Dropoff:</strong>
                      </td>
                      <td>{(selectedBooking as TransferResponse).dropOff}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Passeggeri:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).passengers}
                      </td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Valigie:</strong>
                      </td>
                      <td>{(selectedBooking as TransferResponse).suitcases}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Zaini:</strong>
                      </td>
                      <td>{(selectedBooking as TransferResponse).backpack}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Orario pickup:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).pickUpTime}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Trasporto:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).transportDetails}
                      </td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Seggiolini bambini:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).childSeats}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Richieste:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).requests ||
                          "Nessuna richiesta"}
                      </td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{(selectedBooking as TransferResponse).email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Telefono:</strong>
                      </td>
                      <td>+{(selectedBooking as TransferResponse).phone}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Nome cartello:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).nameOnBoard}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Prezzo:</strong>
                      </td>
                      <td>
                        <h4>{(selectedBooking as TransferResponse).price}€</h4>
                      </td>
                    </tr>
                  </>
                ) : (
                  // Dettagli per i tour
                  <>
                    <tr className="table-light">
                      <td>
                        <strong>Nome:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).passengerName}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Start:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).startLocation}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Pickup:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).pickUp}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>End:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).endLocation}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Dropoff:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).dropOff}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Passeggeri:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).passengers}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Data:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).date}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Orario:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).time}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Fermate:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).optionalStops}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Prezzo:</strong>
                      </td>
                      <td>
                        <h4>{selectedBooking.price}€</h4>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default MyAdministration;
