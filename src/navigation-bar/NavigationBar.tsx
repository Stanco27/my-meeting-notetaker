import { Navbar, Container, Nav } from 'react-bootstrap';
import '../navigation-bar/NavigationBar.css';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="navigation-bar">
      <Container>
        <Navbar.Brand href="#home">My Meeting Notetaker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar