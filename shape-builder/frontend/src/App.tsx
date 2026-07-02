import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.tsx';
import ShapeList from './pages/ShapeList.tsx';
import ShapeForm from './pages/ShapeForm.tsx';


function App() {

    return (

        <BrowserRouter>

            <NavBar />

            <Routes>

                <Route

                    path="/"

                    element={<ShapeList />}

                />

                <Route

                    path="/new"

                    element={<ShapeForm />}

                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;

// function App() {
//   return <h1>Shape Builder</h1>;
// }

// export default App;