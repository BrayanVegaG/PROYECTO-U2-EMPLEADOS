import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Empleados from './Componentes/Empleados';
import Habilidades from './Componentes/Habilidades';
import RelacionHabilidadesEmpleados from './Componentes/RelacionEmple-Hab';
import Inicio from './Componentes/Inicio';
import AcercaDe from './Componentes/AcercaDe';
import Navbar from './Componentes/NavBar'; // Importamos el nuevo Navbar
import './App.css';

interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  idHabilidad: number;
}

interface Habilidad {
  id: number;
  NombreHabilidad: string;
  idEmpleado: number;
}

const App: React.FC = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [habilidades, setHabilidades] = useState<Habilidad[]>([]);

    useEffect(() => {
        const storedEmpleados = localStorage.getItem('empleados');
        const storedHabilidades = localStorage.getItem('habilidades');

        if (storedEmpleados) {
            setEmpleados(JSON.parse(storedEmpleados));
        }

        if (storedHabilidades) {
            setHabilidades(JSON.parse(storedHabilidades));
        }
    }, []);

    return (
        <Router>
            <div>
                <Navbar /> {/* Aquí agregamos el Navbar */}
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route 
                        path="/empleados" 
                        element={<Empleados empleados={empleados} setEmpleados={setEmpleados} habilidades={habilidades} />} 
                    />
                    <Route 
                        path="/habilidades" 
                        element={<Habilidades habilidades={habilidades} setHabilidades={setHabilidades} empleados={empleados} />} 
                    />
                    <Route 
                        path="/relacion" 
                        element={<RelacionHabilidadesEmpleados empleados={empleados} habilidades={habilidades}/>} 
                    />
                    <Route path="/acerca-de" element={<AcercaDe />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
