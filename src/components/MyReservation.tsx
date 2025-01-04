import { useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import FormInterface from "../types/Form";




const MyReservation = () => {
  const [form, setForm] = useState<FormInterface>({
    pickUp: "",
    dropOff: "",
    passengers: 1,
    suitcases: 1,
    backpack: 1,
    pickUpDate: "",
    pickUpTime: "",
    flightNumber: "",
    nameOnBoard: "",
    childSeats: "no",
    requests:""
  })
 
  
  return (
    <div className="bg-image">
      <Container>
        <Row>
          <Col className="col col-11 m-auto   mt-5 bg-light bg-opacity-75 rounded ">
            <Row>
              <Col className="col-11 m-auto">
                <h1 className="montserrat mt-3">Book your trip</h1>
              </Col>
            </Row>
            <Row>
              <Col className=" bg-warning bg-opacity-50 col-11 m-auto mb-3">
                <p>
                  Please enter your arrival time and airline name. Your driver
                  will be waiting for you at the arrival terminal, holding a
                  sign with your name.
                </p>
              </Col>
            </Row>
          </Col>
          <Col className="col col-11 m-auto mt-3 bg-light bg-opacity-75 rounded">
            <Form className="pt-2">
              <Form.Group
                className="mb-4 position-relative mt-3 z-1 border border-dark-subtle rounded "
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="m-0 label text-black z-2">
                  Pick-Up
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Airport, Hotel, Address"
                  required
                  value={form.pickUp} onChange={(e) => {setForm({...form, pickUp: e.target.value})}}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 position-relative mt-3 z-1 border border-dark-subtle rounded "
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="m-0 label text-black z-2">
                  Drop-Off
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Airport, Hotel, Address"
                  value={form.dropOff} onChange={(e)=>{setForm({...form, dropOff: e.target.value})}}
                />
              </Form.Group>
              <div className="position-relative">
                <i className="bi bi-person labelPerson fs-4 text-black "></i>
                <Form.Select
                  aria-label="Default select example"
                  className="border border-dark-subtle rounded  position-relative"
                  required
                  value={form.passengers} onChange={(e)=>{setForm({...form, passengers: parseInt(e.target.value)})}}
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
                <p className="small">Passengers </p>
              </div>

              <Row>
                <Col className=" position-relative col-6">
                  <i className="bi bi-suitcase-lg-fill labelSuitcase fs-5 text-black"></i>
                  <Form.Select aria-label="Default select example"
                  required
                  value={form.suitcases} onChange={(e)=>{ setForm({...form, suitcases: parseInt(e.target.value)})}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </Form.Select>
                  <p className="small">Suitcases </p>
                </Col>
                <Col className=" position-relative col-6">
                  <i className="bi bi-backpack-fill fs-5 labelSuitcase text-black"></i>
                  <Form.Select aria-label="Default select example"
                  required
                     value={form.backpack} onChange={(e)=>{ setForm({...form, backpack: parseInt(e.target.value)})}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </Form.Select>
                  <p className="small">Backpack</p>
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
                      value={form.pickUpDate} onChange={(e)=>{setForm({...form, pickUpDate: e.target.value})}}
                  />
                  <br />
                  <label htmlFor="data" className="small">
                    Pick Up date:
                  </label>
                </Col>
                <Col className=" position-relative  col-6 ps-0 col-lg-3">
                  <i className="bi bi-clock-fill labelClock text-black"></i>
                  <input type="time" id="ora" name="data" 
                  required
                  value={form.pickUpTime} onChange={(e)=>{setForm({...form, pickUpTime: e.target.value})}}/> <br />
                  <label htmlFor="data" className="small">
                    Pick Up Time
                  </label>
                </Col>
                <Col className="col-12 col-lg-6">
                  <Form.Group
                    className=" position-relative mt-3 z-1 border border-dark-subtle rounded "
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 labelAirplane text-black z-2 ">
                      <i className="bi bi-airplane-fill fs-5 "></i>
                    </Form.Label>
                    <Form.Control type="text" placeholder="AA 567" value={form.flightNumber} onChange={(e)=>{setForm({...form, flightNumber: e.target.value})}}/>
                  </Form.Group>
                  <p className="small m-0">Flight number</p>
                </Col>
              </Row>
              <Row>
                <Col className="col-12 ">
                  <Form.Group
                    className=" position-relative mt-3 z-1 border border-dark-subtle rounded "
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 labelPaper text-black z-2">
                      <i className="bi bi-sticky-fill fs-5"></i>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Insert your name"
                    value={form.nameOnBoard} onChange={(e)=>{setForm({...form, nameOnBoard:e.target.value})}} />
                  </Form.Group>
                  <p className="small">Name on a board the driver holds</p>
                </Col>
              </Row>
              <Row>
                <Col className=" position-relative col-6">
                  <i className="bi bi-person-arms-up labelChild fs-5 text-black"></i>

                  <Form.Select aria-label="Default select example" value={form.childSeats} onChange={(e)=>{setForm({...form, childSeats: e.target.value})}}>
                    <option value="no">No child seats</option>
                    <option value="1ChildSeat">1</option>
                    <option value="2ChildSeat">2</option>
                    <option value="3ChildSeat">3</option>
                    <option value="4ChildSeat">4</option>
                  </Form.Select>
                  <p className="small">Number of child seats</p>
                </Col>
              </Row>
              <Form.Group
                className="mb-3 position-relative"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="labelRequest text-black">
                  Requests
                </Form.Label>
                <Form.Control
                  placeholder="Special needs or any other request"
                  as="textarea"
                  rows={3}
                  value={form.requests} onChange={(e)=>{setForm({...form, requests: e.target.value})}}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MyReservation;


