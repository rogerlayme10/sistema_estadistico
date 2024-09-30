import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';

const ProgramaDetalle = () => {
    const { id_programa } = useParams();
    const [programa, setPrograma] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${config.API_URL}/programas/${id_programa}`)
            .then(response => response.json())
            .then(data => {
                setPrograma(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar los detalles del programa:', error);
                setLoading(false);
            });
    }, [id_programa]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!programa) {
        return <div>No se encontraron detalles del programa.</div>;
    }

    // Aquí puedes agregar lógica condicional para diferentes tipos de contenido
    const renderContent = () => {
        switch (programa.id_programa) {
            case 'ARQ':
                return (
                    <div>
                        <h2>Detalles de Arquitectura</h2>
                        <img src="/path-to-arquitectura-image.jpg" alt="Arquitectura" />
                        {/* Agrega más contenido específico para Arquitectura */}
                    </div>
                );
            case 'ARM':
                return (
                    <div>
                        <h2>Detalles de Artes Musicales</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Instrumento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Agrega filas de datos específicos */}
                            </tbody>
                        </table>
                        {/* Agrega más contenido específico para Artes Musicales */}
                    </div>
                );
            // Agrega más casos para otros programas según sea necesario
            default:
                return (
                    <div>
                        <h1>{programa.programa}</h1>
                        <p>Detalles del programa: {programa.detalles}</p>
                    </div>
                );
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default ProgramaDetalle;




