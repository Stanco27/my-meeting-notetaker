import { Col, Container, Row, Stack } from "react-bootstrap";
import "../contact-page/ContactPage.css";
import { Github, Linkedin } from "react-bootstrap-icons";

const ContactPage = () => {
  document.title = "Contact | My Meeting Notetaker";

  return (
    <Container className="contact-page-container">
      <h1>Contact</h1>
      <Row className="g-4 contact-row">
        <Col xs={12} md={6} lg={4}>
          <Stack
            direction="horizontal"
            className="contact-stack"
            onClick={() => window.open("https://github.com/Stanco27")}
          >
            <Github size={30} className="contact-logo" />
            <p className="mb-0">Github</p>
          </Stack>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Stack
            direction="horizontal"
            className="contact-stack"
            onClick={() =>
              window.open("https://www.linkedin.com/in/stanco-diaz-b418a117b/")
            }
          >
            <Linkedin size={30} className="contact-logo" />
            <p className="mb-0">
              LinkedIn
            </p>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
