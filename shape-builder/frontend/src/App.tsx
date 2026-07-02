// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";

// import ShapeList from "./pages/ShapeList";

// import ShapeForm from "./pages/ShapeForm";


// function App() {

//     return (

//         <BrowserRouter>

//             <Navbar />

//             <Routes>

//                 <Route

//                     path="/"

//                     element={<ShapeList />}

//                 />

//                 <Route

//                     path="/new"

//                     element={<ShapeForm />}

//                 />

//             </Routes>

//         </BrowserRouter>

//     );

// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShapeList from "./pages/ShapeList";
import ShapeForm from "./pages/ShapeForm";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<ShapeList />} />
//         <Route path="/new" element={<ShapeForm />} />
//         <Route path="/edit/:id" element={<ShapeForm />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
function App() {
  return <h1>Shape Builder</h1>;
}

export default App;