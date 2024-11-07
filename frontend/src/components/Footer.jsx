import { Link } from "react-router-dom"



const Footer = () =>{
    return(
        <footer className="footer">
            <div className="container">
                <p>
                    &copy; {new Date().getFullYear()} All rights reserved | This website is made with React
                </p>
                <div className="footerlinks">
                    <Link to="/privacy-policy">Private Policy</Link>
                    <Link to="/term-of-service"> Term of Service</Link>
                    <Link to='/contact-us'>Contact Us</Link>

                </div>
            </div>

        </footer>
    )
}

export default Footer;