import { Col, Row } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h3>Contact</h3>
      <h6 className='footer-link-container'>
        <a href="https://github.com/Stanco27" target="_blank" rel="noopener noreferrer" className='footer-link'>Github</a>
      </h6>
      <h6 className='footer-link-container'>
        <a href="https://www.linkedin.com/in/stanco-diaz-b418a117b/" target="_blank" rel="noopener noreferrer" className='footer-link'>LinkedIn</a>
      </h6>
      <p className="copyright">&copy; 2025 Stanco Diaz. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
