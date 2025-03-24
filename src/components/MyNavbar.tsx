import {
  Navbar,
  Container,
  Nav,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const MyNavbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation(); 

  const getFlagForLanguage = (lng: string) => {
    switch(lng) {
      case 'it': return 'fi fi-it';
      case 'sp': return 'fi fi-es';
      case 'fr': return 'fi fi-fr';
      default: return 'fi fi-gb';
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
              <Dropdown.Item  onClick={() => changeLanguage('en')}><span className="fi fi-gb me-1" />English</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('it')} ><span className="fi fi-it me-1" /> Italiano</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('sp')}><span className="fi fi-es me-1" />Español</Dropdown.Item>
              
              <Dropdown.Item onClick={() => changeLanguage('fr')}>  <span className="fi fi-fr me-1" /> Français</Dropdown.Item>
            </DropdownButton>
            <Button size="sm" className=" ms-2 bg-color text-black">
              {t("BarContacts")}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
