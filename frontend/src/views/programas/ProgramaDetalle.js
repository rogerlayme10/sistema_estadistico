import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';

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
                    <Row>
        <Col xs={12} md={6} xl={6}>
            <Card>
                <CardHeader>Artes Musicales</CardHeader>
                <Table bordered>
                    <thead>
                        <tr>
                            <th rowSpan="2">Gestion</th>
                            <th colSpan="2" className="text-center">Sexo</th>
                            <th rowSpan="2">Total</th>
                        </tr>
                        <tr>
                            <th>Masculino</th>
                            <th>Femenino</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2019</td>
                            <td>4</td>
                            <td>5</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>2020</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2021</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2022</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2023</td>
                            <td>2</td>
                            <td>3</td>
                            <td>5</td>
                        </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>12</th>
                                <th>8</th>
                                <th>14</th>
                            </tr>
                        </tfoot>

                   
                </Table>
            </Card>
        </Col>
        <Col xs={12} md={6} xl={6}>
            <Card>
                <CardHeader>Gráfico</CardHeader>
            </Card>
        </Col>
    </Row>

                );
            // Agrega más casos para otros programas según sea necesario
            default:
                return (
                    <div>
                        <h1>{programa.programa}</h1>
                        <p>Detalles del programa roger: {programa.detalles}</p>
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




