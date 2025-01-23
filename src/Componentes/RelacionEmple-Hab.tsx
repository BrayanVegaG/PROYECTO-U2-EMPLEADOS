import React, { useState, useEffect } from 'react';

interface RelacionHabilidadesEmpleadosProps {
  empleados: Empleado[];
  habilidades: Habilidad[];
}

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

const RelacionHabilidadesEmpleados: React.FC<RelacionHabilidadesEmpleadosProps> = ({ empleados, habilidades }) => {
  const [relaciones, setRelaciones] = useState<Relacion[]>([]);
  const [nuevaRelacion, setNuevaRelacion] = useState<Relacion>({ id_empleado: 0, id_habilidad: 0 });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const datosRelaciones = localStorage.getItem('relaciones');
    if (datosRelaciones) setRelaciones(JSON.parse(datosRelaciones));
  }, []);

  useEffect(() => {
    const relacionesFiltradas = relaciones.filter(
      (relacion) =>
        empleados.some((empleado) => empleado.id === relacion.id_empleado) &&
        habilidades.some((habilidad) => habilidad.id === relacion.id_habilidad)
    );
    if (relacionesFiltradas.length !== relaciones.length) {
      setRelaciones(relacionesFiltradas);
      guardarEnLocalStorage(relacionesFiltradas);
    }
  }, [empleados, habilidades]);

  const guardarEnLocalStorage = (datos: Relacion[]) => {
    localStorage.setItem('relaciones', JSON.stringify(datos));
  };

  const agregarRelacion = () => {
    if (!nuevaRelacion.id_empleado || !nuevaRelacion.id_habilidad) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    const relacionesActualizadas = [...relaciones, nuevaRelacion];
    setRelaciones(relacionesActualizadas);
    guardarEnLocalStorage(relacionesActualizadas);
    setNuevaRelacion({ id_empleado: 0, id_habilidad: 0 });
  };

  const eliminarRelacion = (index: number) => {
    const relacionesActualizadas = relaciones.filter((_, i) => i !== index);
    setRelaciones(relacionesActualizadas);
    guardarEnLocalStorage(relacionesActualizadas);
  };

  const iniciarEdicion = (index: number) => {
    setEditIndex(index);
    setNuevaRelacion(relaciones[index]);
  };

  const actualizarRelacion = () => {
    if (editIndex === null) return;
    const relacionesActualizadas = relaciones.map((relacion, index) =>
      index === editIndex ? nuevaRelacion : relacion
    );
    setRelaciones(relacionesActualizadas);
    guardarEnLocalStorage(relacionesActualizadas);
    setNuevaRelacion({ id_empleado: 0, id_habilidad: 0 });
    setEditIndex(null);
  };

  return (
    <div>
      <h1>Relación: Habilidades y Empleados</h1>
      <select
        value={nuevaRelacion.id_empleado}
        onChange={(e) => setNuevaRelacion({ ...nuevaRelacion, id_empleado: Number(e.target.value) })}
      >
        <option value={0}>Seleccione un empleado</option>
        {empleados.map((empleado) => (
          <option key={empleado.id} value={empleado.id}>
            {empleado.nombre}
          </option>
        ))}
      </select>
      <select
        value={nuevaRelacion.id_habilidad}
        onChange={(e) =>
          setNuevaRelacion({ ...nuevaRelacion, id_habilidad: Number(e.target.value) })
        }
      >
        <option value={0}>Seleccione una habilidad</option>
        {habilidades.map((habilidad) => (
          <option key={habilidad.id} value={habilidad.id}>
            {habilidad.NombreHabilidad}
          </option>
        ))}
      </select>
      {editIndex === null ? (
        <button onClick={agregarRelacion}>Agregar Relación</button>
      ) : (
        <button onClick={actualizarRelacion}>Actualizar Relación</button>
      )}
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Habilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {relaciones.map((relacion, index) => (
            <tr key={index}>
              <td>
                {empleados.find((empleado) => empleado.id === relacion.id_empleado)?.nombre}
              </td>
              <td>
                {habilidades.find(
                  (habilidad) => habilidad.id === relacion.id_habilidad
                )?.NombreHabilidad}
              </td>
              <td>
                <button onClick={() => iniciarEdicion(index)}>Editar</button>
                <button onClick={() => eliminarRelacion(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RelacionHabilidadesEmpleados;
