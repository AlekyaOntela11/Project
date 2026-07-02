import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.tsx';
import ShapeList from './pages/ShapeList.tsx';
import ShapeForm from './pages/ShapeForm.tsx';
import ComplexShapeList from "./pages/ComplexShapeList.tsx";
import ComplexShapeForm from "./pages/ComplexShapeForm.tsx";

function App() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<ShapeList />} />
<Route path="/new" element={<ShapeForm />} />
<Route path="/edit/:id" element={<ShapeForm />} />


<Route path="/complex-shapes" element={<ComplexShapeList />} />
<Route path="/complex-shapes/new" element={<ComplexShapeForm />} />

</Routes>
</BrowserRouter>
);

}

export default App;