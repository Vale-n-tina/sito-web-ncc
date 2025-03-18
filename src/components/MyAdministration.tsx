import { useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/src/shared/types.js";
import "react-calendar/dist/Calendar.css";
import TransferResponse from "../types/TransferResponse";
import { Button, Modal, Tab, Table, Tabs } from "react-bootstrap";
const MyAdministration = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [transfers, setTransfers] = useState<TransferResponse[]>([]);
  const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  interface Booking {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    pickUp: string;
    dropOff: string;
    passengers: number;
    suitcases: number;
    backpack: number;
    pickUpTime: string;
    transportDetails: string;
    childSeats: number;
    requests: string;
    email: string;
    phone: string;
    price: string;
  }

  const handleRowClick = (
    booking: Booking,
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

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setDate(value);

      // Formatta la data come "YYYY-MM-DD"
      const formattedDate = value.toISOString().split("T")[0];

      const authToken = localStorage.getItem("authToken");

      // Effettua una richiesta API per ottenere i trasferimenti
      fetch(
        `http://localhost:8080/prenotazioni/by-date?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Includi il token JWT nell'header
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore durante il fetch dei trasferimenti");
          }
          return response.json();
        })
        .then((data) => {
          setTransfers(data); // Imposta i trasferimenti nello stato
        })
        .catch((error) => {
          console.error("Errore:", error);
        });
    }
  };

  const bookings: Booking[] = [
    {
      id: 1,
      firstName: "Mark",
      lastName: "Otto",
      username: "@mdo",
      pickUp: "Airport",
      dropOff: "Hotel XYZ",
      passengers: 2,
      suitcases: 2,
      backpack: 1,
      pickUpTime: "14:00",
      transportDetails: "Luxury Sedan",
      childSeats: 1,
      requests: "No smoking",
      email: "mark.otto@example.com",
      phone: "+123456789",
      price: "€50",
    },
    {
      id: 2,
      firstName: "Jacob",
      lastName: "Thornton",
      username: "@fat",
      pickUp: "Train Station",
      dropOff: "Conference Center",
      passengers: 3,
      suitcases: 1,
      backpack: 0,
      pickUpTime: "10:30",
      transportDetails: "SUV",
      childSeats: 0,
      requests: "Extra space",
      email: "jacob.thornton@example.com",
      phone: "+987654321",
      price: "€70",
    },
  ];

  return (
    <div>
      <h1 className="text-center merriweather m-3">Seleziona una data</h1>
      <div className="fullscreen-calendar">
        <Calendar
          onChange={handleDateChange} // Gestisce il cambio di data
          value={date} // Imposta la data selezionata
        />
      </div>

      <h2 className="mt-4 mb-5 text-center merriweather ">Trasferimenti per il giorno {date.toLocaleDateString()}</h2>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Transfer" title="Transfer">
            <div className="table-responsive" ><Table striped bordered hover size="sm ">
            <thead>
              <tr>
                <th>#</th>
                <th>PickUp</th>
                <th>DropOff</th>
                <th>Passengers</th>
                <th>Time</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  onClick={() => handleRowClick(booking, "lg-down")}
                  style={{ cursor: "pointer" }}
                >
                  <td>{booking.id}</td>
                  <td>{booking.firstName}</td>
                  <td>{booking.lastName}</td>
                  <td>{booking.pickUp}</td>
                  <td>{booking.dropOff}</td>
                  <td>{booking.price}</td>
                </tr>
              ))}
            </tbody>
          </Table></div>
          
        </Tab>
        <Tab eventKey="Tour" title="Tour">
          Tab content for Tour
        </Tab>
      </Tabs>

      {/* Modale per mostrare i dettagli della prenotazione */}

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Table borderless>
              <tbody>
                <tr className="table-light">
                  <td>
                    <strong>Nome:</strong>
                  </td>
                  <td>
                    {selectedBooking.firstName} {selectedBooking.lastName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Username:</strong>
                  </td>
                  <td>{selectedBooking.username}</td>
                </tr>
                <tr className="table-light">
                  <td>
                    <strong>Pickup:</strong>
                  </td>
                  <td>{selectedBooking.pickUp}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Dropoff:</strong>
                  </td>
                  <td>{selectedBooking.dropOff}</td>
                </tr>
                <tr className="table-light">
                  <td>
                    <strong>Passeggeri:</strong>
                  </td>
                  <td>{selectedBooking.passengers}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Valigie:</strong>
                  </td>
                  <td>{selectedBooking.suitcases}</td>
                </tr>
                <tr className="table-light">
                  <td>
                    <strong>Zaini:</strong>
                  </td>
                  <td>{selectedBooking.backpack}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Orario pickup:</strong>
                  </td>
                  <td>{selectedBooking.pickUpTime}</td>
                </tr>
                <tr className="table-light">
                  <td>
                    <strong>Trasporto:</strong>
                  </td>
                  <td>{selectedBooking.transportDetails}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Seggiolini bambini:</strong>
                  </td>
                  <td>{selectedBooking.childSeats}</td>
                </tr>
                <tr className="table-light">
                  <td>
                    <strong>Richieste:</strong>
                  </td>
                  <td>{selectedBooking.requests}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{selectedBooking.email}</td>
                </tr>
                <tr className="table-light">
                  <td>
                    <strong>Telefono:</strong>
                  </td>
                  <td>{selectedBooking.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Prezzo:</strong>
                  </td>
                  <td>
                    <h4>{selectedBooking.price}</h4>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>

      <ul>
        {transfers.map((transfer) => (
          <li key={transfer.id}>
            <p>
              <strong>Da:</strong> {transfer.pickUp}
            </p>
            <p>
              <strong>A:</strong> {transfer.dropOff}
            </p>
            <p>
              <strong>Ora:</strong> {transfer.pickUpTime}
            </p>
            <p>
              <strong>Passeggeri:</strong> {transfer.passengers}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyAdministration;
