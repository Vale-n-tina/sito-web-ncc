import { Col, Container, Row, Form } from "react-bootstrap";

const CheckoutDetails = () => {
  return (
    <div className="bg-image">
      <Container className=" sans">
        <Row>
          <Col className="col col-11 m-auto mt-3 mb-3">
            <h1 className="montserrat text-black ">Booking details</h1>
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
                    <Form.Label className="m-0 fw-bold">
                      Passenger Name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Name and Surname" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold">Email </Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="m-0 fw-bold">
                      Confirm Email{" "}
                    </Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default CheckoutDetails;
