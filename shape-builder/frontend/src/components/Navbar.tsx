import { Link } from "react-router-dom";

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
            <Link to="/complex-shapes" 
                style={{
                    color: "white",
                    marginRight: 20,
                    textDecoration: "none"
                }}>Complex Shapes</Link>


            <Link to="/complex-shapes/new"
                style={{
                    color: "white",
                    marginRight: 20,
                    textDecoration: "none"
                }}>Create Complex Shape</Link>
        </nav>

    );

}

export default Navbar;