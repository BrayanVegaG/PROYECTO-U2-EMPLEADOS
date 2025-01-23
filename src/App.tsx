import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Empleados from './Componentes/Empleados';
import Habilidades from './Componentes/Habilidades';
import RelacionHabilidadesEmpleados from './Componentes/RelacionEmple-Hab';
import Inicio from './Componentes/Inicio';
import AcercaDe from './Componentes/AcercaDe';
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

interface Relacion {
    id_empleado: number;
    id_habilidad: number;
  }

const App: React.FC = () => {
        const [empleados, setEmpleados] = useState<Empleado[]>([]);
        const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
        const [relaciones, setRelaciones] = useState<Relacion[]>([]);

        useEffect(() => {
                const storedEmpleados = localStorage.getItem('empleados');
                const storedHabilidades = localStorage.getItem('habilidades');
                const storedRelaciones = localStorage.getItem('relaciones');

                if (storedEmpleados) {
                        setEmpleados(JSON.parse(storedEmpleados));
                }

                if (storedHabilidades) {
                        setHabilidades(JSON.parse(storedHabilidades));
                }

                if (storedRelaciones) {
                        setRelaciones(JSON.parse(storedRelaciones));
                        
                }
        }, []);

        return (
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li><Link to="/">Inicio</Link></li>
                                <li><Link to="/empleados">Empleados</Link></li>
                                <li><Link to="/habilidades">Habilidades</Link></li>
                                <li><Link to="/relacion">Relaciones</Link></li>
                                <li><Link to="/acerca-de">Acerca de</Link></li>
                            </ul>
                        </nav>
        
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
                                element={<RelacionHabilidadesEmpleados empleados={empleados} habilidades={habilidades} relaciones={relaciones} setRelaciones={setRelaciones} />}
                            />
                            <Route path="/acerca-de" element={<AcercaDe />} />
                        </Routes>
                    </div>
                </Router>
            );
        };
        
        export default App;
