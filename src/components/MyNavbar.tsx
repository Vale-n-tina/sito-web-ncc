import {
  Navbar,
  Container,
  Nav,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EmailData from "../types/EmailData";

const MyNavbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [alert, setAlert] = useState({
    show: false,
    variant: "success",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //Salvo il form per contattarci
  const [formData, setFormData] = useState<EmailData>({
    name: "",
    email: "",
    message: "",
  });

  const sendEmailHandle = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setAlert({
        show: true,
        variant: "danger",
        message:t("campiObbligatori"),
      });
      return;
    }
    setIsLoading(true);
    setAlert({ show: false, variant: "", message: "" });
    fetch("http://localhost:8080/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((data) => {
        setAlert({
          show: true,
          variant: "success",
          message: t("invioRiuscito"),
        });

        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          handleClose();
          setAlert({
            show: false,
            variant: "",
            message: "",
          });
        }, 3000);
      })
      .catch((error) => {
        console.error("Errore:", error);
        setAlert({
          show: true,
          variant: "danger",
          message: t("erroreInvio"),
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getFlagForLanguage = (lng: string) => {
    switch (lng) {
      case "it":
        return "fi fi-it";
      case "sp":
        return "fi fi-es";
      case "fr":
        return "fi fi-fr";
      default:
        return "fi fi-gb";
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // funzione per cambiare colore quandop pagina corrente
  const getLink = (path: string): string => {
    return location.pathname === path ? "nav-link hover" : "nav-link notHover";
  };

  return (
    <Navbar expand="lg" className="bg-black merriweather">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src="/images/nccLogo.png"
            width="40"
            height="40"
            className="d-inline-block align-top img-fluid"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className=" justify-content-end">
          <Nav>
            <Link to="/" className={getLink("/")}>
              <div className=" ms-3">{t("BarHome")}</div>
            </Link>
            <Link to="/reservation" className={getLink("/reservation")}>
              <div className=" ms-3"> {t("BarReservation")}</div>
            </Link>

            <Link to="tour" className={getLink("/tour")}>
              <div className=" ms-3">{t("BarTour")}</div>
            </Link>
            <Link to="login" className={getLink("/login")}>
              <div className=" ms-3 me-3">{t("BarLogin")}</div>
            </Link>
            <DropdownButton
              key="start"
              id="dropdown-button-drop-start"
              drop="start"
              variant="dark"
              title={<span className={getFlagForLanguage(i18n.language)} />}
              className="ms-2  custom-dropdown "
            >
              <Dropdown.Item onClick={() => changeLanguage("en")}>
                <span className="fi fi-gb me-1" />
                English
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("it")}>
                <span className="fi fi-it me-1" /> Italiano
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("sp")}>
                <span className="fi fi-es me-1" />
                Español
              </Dropdown.Item>

              <Dropdown.Item onClick={() => changeLanguage("fr")}>
                {" "}
                <span className="fi fi-fr me-1" /> Français
              </Dropdown.Item>
            </DropdownButton>
            <Button
              size="sm"
              className=" ms-2 bg-color text-black"
              onClick={handleShow}
            >
              {t("BarContacts")}
            </Button>
          </Nav>
        </Navbar.Collapse>

        <Modal show={show} onHide={handleClose} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>{t("contattaci")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alert.show && (
              <Alert
                variant={alert.variant}
                onClose={() => setAlert({ ...alert, show: false })}
                dismissible
              >
                {alert.message}
              </Alert>
            )}
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={`* ${t("nome")}`}
                  autoFocus
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder={`* ${t("emailAddress")}`}
                  autoFocus
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={`* ${t("messaggio")}`}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={sendEmailHandle}
              className="col-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                   {t("invioInCorso")}
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill"></i> {t("invia")}
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
