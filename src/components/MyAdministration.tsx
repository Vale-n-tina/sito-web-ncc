import { useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/src/shared/types.js";

import TransferResponse from "../types/TransferResponse";
import { Form, Modal, Tab, Table, Tabs } from "react-bootstrap";
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<
    TransferResponse | TourResponse | null
  >(null);
  const [editFormData, setEditFormData] = useState<
    TransferResponse | TourResponse | null
  >(null);
  const authToken = localStorage.getItem("authToken");

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
  const optionalStops = [
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

  const handleTabChange = (tab: "Transfer" | "Tour") => {
    setActiveTab(tab);
  };

  //collegata al bottone modifica per modificare prenotazione/tour
  const handleEdit = () => {
    if (selectedBooking) {
      setEditFormData(selectedBooking);
      setShowEditModal(true); // Apri il modale di modifica
    }
  };

  // Effettua una richiesta API per ottenere i trasferimenti/tour
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setDate(value);

      // Formatta la data come "YYYY-MM-DD"
      const formattedDate = value.toLocaleDateString("en-CA");

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
  // Effettua una richiesta API per eliminare i trasferimenti/tour
  const handleDelete = () => {
    if (selectedBooking) {
      const resourceType = activeTab === "Transfer" ? "prenotazioni" : "tour";

      fetch(
        `http://localhost:8080/${resourceType}/delete/${selectedBooking.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
        .then(() => {
          setShow(false);
          if (resourceType === "prenotazioni") {
            setTransfers((prevTransfers) =>
              prevTransfers.filter(
                (transfer) => transfer.id !== selectedBooking.id
              )
            );
          } else if (resourceType === "tour") {
            setTours((prevTours) =>
              prevTours.filter((tour) => tour.id !== selectedBooking.id)
            );
          }
        })
        .catch((error) => {
          console.error("Errore:", error);
        });
    }
  };

  // Effettua una richiesta API per modificare i trasferimenti/tour
  const handleSaveEdit = () => {
    if (editFormData) {
      const resourceType = activeTab === "Transfer" ? "prenotazioni" : "tour";

      fetch(`http://localhost:8080/${resourceType}/update/${editFormData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(editFormData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore durante l'aggiornamento");
          }
          return response.json();
        })
        .then((data) => {
          // Aggiorna lo stato locale
          if (resourceType === "prenotazioni") {
            setTransfers((prevTransfers) =>
              prevTransfers.map((transfer) =>
                transfer.id === editFormData.id
                  ? (editFormData as TransferResponse)
                  : transfer
              )
            );
          } else if (resourceType === "tour") {
            setTours((prevTours) =>
              prevTours.map((tour) =>
                tour.id === editFormData.id
                  ? (editFormData as TourResponse)
                  : tour
              )
            );
          }
          setSelectedBooking(editFormData);

          setShowEditModal(false);
        })
        .catch((error) => {
          console.error("Errore durante l'aggiornamento:", error);
        });
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
                  <th>Time</th>
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
                     {booking.pickUpTime}
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
                  <th>Time</th>
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
                    <td>{tour.pickUp}-{tour.startLocation}</td>
                    <td>{tour.dropOff}-{tour.endLocation}</td>
                    <td>{tour.passengers}</td>
                    <td>
                      {tour.time}
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
              <i className="bi bi-pen-fill" onClick={handleEdit}></i>
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
                        <strong>Giorno pickup:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).pickUpDate}
                      </td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Trasporto:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).transportDetails}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Seggiolini bambini:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).childSeats}
                      </td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Richieste:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).requests ||
                          "Nessuna richiesta"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{(selectedBooking as TransferResponse).email}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Telefono:</strong>
                      </td>
                      <td>+{(selectedBooking as TransferResponse).phone}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Nome cartello:</strong>
                      </td>
                      <td>
                        {(selectedBooking as TransferResponse).nameOnBoard}
                      </td>
                    </tr>
                    <tr className="table-light">
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
                    <tr >
                      <td>
                        <strong>Telefono:</strong>
                      </td>
                      <td>+{(selectedBooking as TourResponse).phoneNumber}</td>
                    </tr>
                    <tr className="table-light">
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).email}</td>
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
                      <ul
                        style={{
                          listStyleType: "disc",
                          paddingLeft: "20px",
                          margin: 0,
                        }}
                      >
                        {(selectedBooking as TourResponse)?.optionalStops?.map(
                          (stop, index) => (
                            <li key={index}>{stop}</li>
                          )
                        )}
                      </ul>
                    </tr>
                    <tr>
                      <td>
                        <strong>Durata tour:</strong>
                      </td>
                      <td>{(selectedBooking as TourResponse).duration} ore</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Prezzo:</strong>
                      </td>
                      <td>
                        <h4>{(selectedBooking as TourResponse).price}€</h4>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <form>
              {activeTab === "Transfer" ? (
                // Form per modificare un trasferimento
                <>
                  <div className="mb-3">
                    <label>Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.nameAndSurname || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          nameAndSurname: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Pickup</label>
                    <input
                      type="text"
                      className="form-control"
                      value={(editFormData as TransferResponse)?.pickUp || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          pickUp: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>DropOff</label>
                    <input
                      type="text"
                      className="form-control"
                      value={(editFormData as TransferResponse)?.dropOff || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          dropOff: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Passeggeri</label>
                    <select
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.passengers || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          passengers: parseInt(e.target.value, 10),
                        } as TransferResponse)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Valigie</label>
                    <select
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.suitcases || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          suitcases: parseInt(e.target.value, 10),
                        } as TransferResponse)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="8">9</option>
                      <option value="8">10</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Zaini</label>
                    <select
                      className="form-control"
                      value={(editFormData as TransferResponse)?.backpack || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          backpack: parseInt(e.target.value, 10),
                        } as TransferResponse)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="8">9</option>
                      <option value="8">10</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Orario pickup</label>
                    <input
                      type="time"
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.pickUpTime || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          pickUpTime: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Giorno</label>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.pickUpDate || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          pickUpDate: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Trasporto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.transportDetails ||
                        ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          transportDetails: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>ChildSeat</label>
                    <select
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.childSeats || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          childSeats: e.target.value,
                        } as TransferResponse)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Richieste</label>
                    <input
                      type="text"
                      className="form-control"
                      value={(editFormData as TransferResponse)?.requests || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          requests: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={(editFormData as TransferResponse)?.email || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Telefono</label>
                    <input
                      type="text"
                      className="form-control"
                      value={(editFormData as TransferResponse)?.phone || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Nome cartello</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        (editFormData as TransferResponse)?.nameOnBoard || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          nameOnBoard: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Prezzo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={(editFormData as TransferResponse)?.price || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          price: e.target.value,
                        } as TransferResponse)
                      }
                    />
                  </div>
                </>
              ) : (
                // Form per modificare un tour
                <>
                  <div className="mb-3">
                    <label>Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={
                        (selectedBooking as TourResponse).passengerName
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Start</label>
                    <select
                      className="form-control"
                      value={
                        (editFormData as TourResponse)?.startLocation || ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          startLocation: e.target.value,
                        } as TourResponse)
                      }
                    >
                      <option value="Rome">Roma</option>
                      <option value="Fiumicino Airport">
                        Fiumicino Areoporto
                      </option>
                      <option value="Ciampino Airport">
                        Ciampino Areoporto
                      </option>
                      <option value="Civitavecchia Dock">
                        Civitavecchia Porto
                      </option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Pickup</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={(selectedBooking as TourResponse).pickUp}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          pickUp: e.target.value,
                        } as TourResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>End</label>
                    <select
                      className="form-control"
                      value={(editFormData as TourResponse)?.endLocation || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          endLocation: e.target.value,
                        } as TourResponse)
                      }
                    >
                      <option value="Rome">Roma</option>
                      <option value="Fiumicino Airport">
                        Fiumicino Areoporto
                      </option>
                      <option value="Ciampino Airport">
                        Ciampino Areoporto
                      </option>
                      <option value="Civitavecchia Dock">
                        Civitavecchia Porto
                      </option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Dropoff</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={(selectedBooking as TourResponse).dropOff}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          dropOff: e.target.value,
                        } as TourResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Passeggeri</label>
                    <select
                      className="form-control"
                      value={(editFormData as TourResponse)?.passengers || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          passengers: parseInt(e.target.value, 10),
                        } as TourResponse)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Giorno</label>
                    <input
                      type="date"
                      className="form-control"
                      value={(editFormData as TourResponse)?.date || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          date: e.target.value,
                        } as TourResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Orario</label>
                    <input
                      type="time"
                      className="form-control"
                      value={(editFormData as TourResponse)?.time || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          time: e.target.value,
                        } as TourResponse)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Fermate opzionali:</label>
                    <div
                      style={{
                        maxHeight: "150px",
                        overflowY: "auto",
                        padding: "10px",
                      }}
                    >
                      {optionalStops.map((place, index) => {
                        const placex = place.replace(/ \(\+ \d+ min\)/, "");

                        return (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            label={place}
                            className="custom-checkbox"
                            // Verifica se la fermata esiste già nell'array `optionalStops` di `editFormData`
                            checked={(
                              editFormData as TourResponse
                            )?.optionalStops.includes(placex)}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const updatedStops = isChecked
                                ? [
                                    ...new Set(
                                      (
                                        editFormData as TourResponse
                                      ).optionalStops
                                    ),
                                    placex,
                                  ]
                                : (
                                    editFormData as TourResponse
                                  ).optionalStops.filter(
                                    (stop) => stop !== placex
                                  );

                              setEditFormData({
                                ...editFormData,
                                optionalStops: updatedStops,
                              } as TourResponse);
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label>Prezzo</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={(selectedBooking as TourResponse).price}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          price: parseInt(e.target.value),
                        } as TourResponse)
                      }
                    />
                  </div>
                </>
              )}
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowEditModal(false)}
          >
            Annulla
          </button>
          <button className="btn btn-primary" onClick={handleSaveEdit}>
            Salva Modifiche
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default MyAdministration;
