import './App.css';

import Container from 'react-bootstrap/Container';

import Reservacion from './pages/reservar/reservar.page'
import Registro from './pages/registrar/registrar.page'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Reservacion />} />
              <Route path="/products/create" element={<Registro />} />
              <Route path="/products/:id/update"  element={<Registro />} />
            </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
