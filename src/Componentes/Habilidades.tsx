import React, { useState, useEffect } from 'react';

interface Habilidad {
  id: number;
  NombreHabilidad: string;
  idEmpleado: number;
}

interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  idHabilidad: number;
}

interface HabilidadesProps {

  habilidades: Habilidad[];
  empleados: Empleado[];
  setHabilidades: React.Dispatch<React.SetStateAction<Habilidad[]>>;
 
}

const Habilidades: React.FC<HabilidadesProps> = ({ habilidades, setHabilidades}) => {
  const [NombreHabilidad, setNombre] = useState<string>('');
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    const habilidadesGuardadas = localStorage.getItem('habilidades');
    if (habilidadesGuardadas) {
      setHabilidades(JSON.parse(habilidadesGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habilidades', JSON.stringify(habilidades));
  }, [habilidades]);

  const agregarHabilidad = () => {
    if (editando !== null) {
      const habilidadesActualizadas = habilidades.map(habilidad =>
        habilidad.id === editando ? { ...habilidad, habilidad } : habilidad
      );
      setHabilidades(habilidadesActualizadas);
      setEditando(null);
    } else {
      const nuevaHabilidad: Habilidad = {
        id: habilidades.length + 1,
        NombreHabilidad,
        idEmpleado: 0 
      };
      setHabilidades([...habilidades, nuevaHabilidad]);
    }
    setNombre('');
  };
  const editarHabilidad = (habilidad: Habilidad) => {
    setNombre(habilidad.NombreHabilidad);
    setEditando(habilidad.id);
  };
  const eliminarHabilidad = (id: number) => {
    setHabilidades(habilidades.filter(habilidad => habilidad.id !== id));
  };

  const actualizarHabilidad = (id: number) => {
    if (NombreHabilidad.trim()) {
      setHabilidades(habilidades.map(habilidad =>
        habilidad.id === id ? { ...habilidad, NombreHabilidad } : habilidad
      ));
      setNombre('');
      setEditando(null);
    } else {
      alert('Por favor, ingresa un nombre válido.');
    }

  }
  
  return (
    <div>
      <h1>Gestión de Habilidades</h1>
      <input
        type="text"
        placeholder="Habilidad"
        value={NombreHabilidad}
        onChange={(e) => setNombre(e.target.value)}
      />
      {editando ? (
        <button onClick={() => actualizarHabilidad(editando)}>Actualizar Habilidad</button>
      ) : (
        <button onClick={agregarHabilidad}>Agregar Habilidad</button>
      )}
      <h2>
        LISTA DE HABILIDADES
      </h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habilidades.map(habilidad => (
            <tr key={habilidad.id}>
              <td>{habilidad.NombreHabilidad}</td>
              <td>
                <button onClick={() => editarHabilidad(habilidad)}>Editar</button>
                <button onClick={() => eliminarHabilidad(habilidad.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Habilidades;
