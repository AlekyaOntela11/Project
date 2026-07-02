import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.tsx';
import ShapeList from './pages/ShapeList.tsx';
import ShapeForm from './pages/ShapeForm.tsx';


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route

                    path="/"

                    element={<ShapeList />}

                />

                <Route

                    path="/new"

                    element={<ShapeForm />}

                />
 <Route path="/edit/:id" element={<ShapeForm />} />
            </Routes>

        </BrowserRouter>

    );

}

export default App;