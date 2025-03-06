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
          <Link to ="/" className={getLink("/")}>
            <div className=" ms-3">
             Home
            </div>
            </Link>
            <Link to="/reservation"   className={getLink("/reservation")} >
            <div className=" ms-3">
              Reservation
            </div>
            </Link>
          
            <Link to ="tour" className={getLink("/tour")}>
            <div className=" ms-3">
             Tour
            </div>
            </Link>
            <Link to ="login" className={getLink("/login")}>
            <div className=" ms-3 me-3">
              Login
            </div>
            </Link>
            <Button size="sm" className=" ms-2 bg-color text-black">
              Contacts
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
