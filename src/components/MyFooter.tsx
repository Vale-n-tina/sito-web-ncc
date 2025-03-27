import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MyFooter = () => {
   const { t} = useTranslation(); 
  return (
    <footer className="bg-black text-center text-lg-start">
      <Container className="container p-4">
        <Row className=" justify-content-between">
          <Col className="col-12 col-md-4">
            <h5 className="color merriweather"> {t("BarContacts")}</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-white quicksand">
                  <i className="bi bi-house-fill color me-2"></i>Via Roma 00 ,
                  00100, Roma Rm
                </p>
              </li>
              <li>
                <p className="text-white quicksand">
                  <i className="bi bi-envelope-at-fill color me-2"></i>
                  transfer.service.contact@gmail.com
                </p>
              </li>

              <li>
                <p className="text-white quicksand">
                  <i className="bi bi-phone color"></i>
                  +39 3456789098
                </p>
              </li>
            </ul>
          </Col>

          <Col className="col-12 col-md-4">
            <h5 className="color merriweather">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/reservation" className="text-decoration-none">
                  <div className="text-white quicksand">Reservation</div>
                </Link>
              </li>
              <li>
                <Link to="/tour" className="text-decoration-none">
                  <div className="text-white quicksand">Tour</div>
                </Link>
              </li>
            </ul>
          </Col>

          <Col className="col-12 col-md-4">
            <h5 className="color mb-0 merriweather mb-3"> {t("FooterFollow")}</h5>

            <ul className="list-unstyled">
              <li>
                <i className="bi bi-facebook text-white me-3"></i>
                <i className="bi bi-instagram text-white me-3"></i>
                <i className="bi bi-twitter-x text-white"></i>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="text-center p-3 text-white">
        ©{new Date().getFullYear()} Copyright: 
        <p className="text-white d-inline ms-1" >
        transfer service Rome
        </p>
      </div>
    </footer>
  );
};
export default MyFooter;
