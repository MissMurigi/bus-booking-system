import { Link } from "react-router-dom"
import './Footer.css'; // Import the CSS file




const Footer = () =>{
    return(
        <footer className="footer">
            <div className="container">
                <p>
                    &copy; {new Date().getFullYear()} All rights reserved | This website is made with React
                </p>
                <div className="footerlinks">
                    <Link to="/privacypolicy">Private Policy</Link>
                    <Link to="/termofservice"> Term of Service</Link>
                    <Link to='/contactus'>Contact Us</Link>

                </div>
            </div>

        </footer>
    )
}

export default Footer;