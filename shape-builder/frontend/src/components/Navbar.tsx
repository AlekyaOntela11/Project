import { Link } from "react-router-dom";
//import Navbar from './components/NavBar';

function Navbar() {

    return (
        <nav
            style={{
                padding: 20,
                background: "#282c34"
            }}
        >

            <Link
                to="/"
                style={{
                    color: "white",
                    marginRight: 20,
                    textDecoration: "none"
                }}
            >
                Shapes
            </Link>

            <Link
                to="/new"
                style={{
                    color: "white",
                    textDecoration: "none"
                }}
            >
                New Shape
            </Link>

        </nav>

    );

}

export default Navbar;