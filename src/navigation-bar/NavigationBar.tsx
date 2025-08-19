import { Navbar, Container, Nav } from "react-bootstrap";
import "../navigation-bar/NavigationBar.css";
import logo from "../assets/logo.png";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="navigation-bar">
      <Container>
        <div className="brand-container">
          <img src={logo} className="logo" />
          <Navbar.Brand href="" className="brand-text">My Meeting Notetaker</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="Home">Home</Nav.Link>
            <Nav.Link href="Contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
