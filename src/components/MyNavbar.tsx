import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MyNavbar = () => {
  
  const location=useLocation()

  // funzione per cambiare colore quandop pagina corrente
  const getLink=(path:string):string=>{
    return location.pathname=== path? "nav-link hover" : "nav-link notHover"
  
  }

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
          <Link to ="home" className={getLink("/home")}>
            <div className=" ms-2">
             Home
            </div>
            </Link>
            <Link to="/reservation"   className={getLink("/reservation")} >
            <div className=" ms-2">
              Reservation
            </div>
            </Link>
            <Link to ="airport" className={getLink("/airport")}>
            <div className=" ms-2">
              Airports
            </div>
            </Link>
            <Link to ="port" className={getLink("/port")}>
            <div className=" ms-2">
              Port Civitavecchia
            </div>
            </Link>
            <Link to ="tour" className={getLink("/tour")}>
            <div className=" ms-2">
             Tour
            </div>
            </Link>
            <Button variant="primary" size="sm" className=" ms-2">
              Contacts
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
