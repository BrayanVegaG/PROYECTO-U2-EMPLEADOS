import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <ul>
      <li><Link to="/inicio">Inicio</Link></li>
      <li><Link to="/empleados">Empleados</Link></li>
      <li><Link to="/habilidades">Habilidades</Link></li>
      <li><Link to="/relacion">Relación</Link></li>
      <li><Link to="/acerca-de">Acerca de</Link></li>
    </ul>
  </nav>
);

export default NavBar;
