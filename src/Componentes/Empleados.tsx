import React, { useState, useEffect } from 'react';

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

interface EmpleadoProps {
    empleados: Empleado[];
    habilidades: Habilidad[];
    setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;

}
const Empleados: React.FC<EmpleadoProps> = ({ empleados, habilidades, setEmpleados }) => {
    const [nombre, setNombre] = useState<string>('');
    const [puesto, setPuesto] = useState<string>('');
    const [editando, setEditando] = useState<number | null>(null);

    useEffect(() => {
        const empleadosGuardados = localStorage.getItem('empleados');
        if (empleadosGuardados) {
            setEmpleados(JSON.parse(empleadosGuardados));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('empleados', JSON.stringify(empleados));
    }, [empleados]);

    const agregarEmpleado = () => {
        if (editando !== null) {
            const empleadosActualizados: Empleado[] = empleados.map((empleado: Empleado) =>
                empleado.id === editando ? { ...empleado, nombre, puesto } : empleado);
            setEmpleados(empleadosActualizados);
            setEditando(null);
        } else {
            const nuevoEmpleado: Empleado = {
                id: empleados.length + 1,
                nombre,
                puesto,
                idHabilidad: 0
            };
            setEmpleados([...empleados, nuevoEmpleado]);
        }
        setNombre('');
        setPuesto('');
    };

    const editarEmpleado = (empleado: Empleado) => {
        setNombre(empleado.nombre);
        setPuesto(empleado.puesto);
        setEditando(empleado.id);
    };

    const eliminarEmpleado = (id: number) => {
        // Filtramos las habilidades que están asociadas a este empleado
        const habilidadesDelEmpleado = habilidades.filter(habilidad => habilidad.idEmpleado === id);
    
        // Si tiene más de una habilidad asociada, mostramos un mensaje de alerta
        if (habilidadesDelEmpleado.length > 2) {
            alert("No se puede eliminar el empleado, tiene más de una habilidad asociada.");
        } else {
            setEmpleados(empleados.filter(empleado => empleado.id !== id));
        }
    };
    
    const actualizarEmpleado = (id: number) => {
        if (nombre.trim()) {
            setEmpleados(empleados.map(empleado =>
                empleado.id === id ? { ...empleado, nombre, puesto } : empleado
            ));
            setNombre('');
            setPuesto('');
            setEditando(null);
        } else {
            alert('Por favor, ingresa un nombre válido.');
        }
    };

    return (
        <div>
            <h1>Gestión de Empleados</h1>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Puesto"
                value={puesto}
                onChange={(e) => setPuesto(e.target.value)}
            />
            {editando ? (
                <button onClick={() => actualizarEmpleado(editando)}>Actualizar Empleado</button>
            ) : (
                <button onClick={agregarEmpleado}>Agregar Empleado</button>
            )}
            <h2>LISTA DE EMPLEADOS</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puesto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.puesto}</td>
                            <td>
                                <button onClick={() => editarEmpleado(empleado)}>Editar</button>
                                <button onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>



    );
};

export default Empleados;