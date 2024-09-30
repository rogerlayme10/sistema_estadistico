import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import config from '../../../config';

const DocentesCarreraSexo = () => {
    const [docentes, setDocentes] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [gestion, setGestion] = useState('');

    // Envolver fetchDocentes en useCallback para evitar ciclos de dependencia
    const fetchDocentes = useCallback(async () => {
        try {
            const response = await fetch(`${config.API_URL}/carreras-sexo?gestion=${gestion}`);
            const data = await response.json();
            setDocentes(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [gestion]); // 'gestion' es la única dependencia

    const fetchGestiones = async () => {
        try {
            const response = await fetch(`${config.API_URL}/carreras-sexo?type=gestiones`);
            const data = await response.json();
            setGestiones(data);
        } catch (error) {
            console.error('Error al obtener las gestiones:', error);
        }
    };

    useEffect(() => {
        fetchGestiones();
    }, []);

    useEffect(() => {
        fetchDocentes();
    }, [fetchDocentes]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(docentes.map(docente => ({
            Programa: docente.programa,
            Masculino: docente.total_masculino,
            Femenino: docente.total_femenino,
            Total: docente.total
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Docentes Programa Sexo");
        XLSX.writeFile(workbook, `docentes_programa_sexo_${gestion || 'todas'}.xlsx`);
    };

    return (
        <Row>
            <Col >
                <Card>
                    <CardHeader>
                        Personal docente por sexo, según facultad
                    </CardHeader>

                    <Form className="mb-3">
                        <Form.Group controlId="gestionSelect">
                            <Form.Label>Seleccionar Gestión</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={gestion} 
                                onChange={e => setGestion(e.target.value)}>
                                <option value="">Todas</option>
                                {gestiones.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Carrera</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docentes.map((docente, index) => (
                                <tr key={index}>
                                    <td>{docente.programa}</td>
                                    <td>{docente.total_masculino}</td>
                                    <td>{docente.total_femenino}</td>
                                    <td>{docente.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{docentes.reduce((sum, docente) => sum + docente.total_masculino, 0)}</th>
                                <th>{docentes.reduce((sum, docente) => sum + docente.total_femenino, 0)}</th>
                                <th>{docentes.reduce((sum, docente) => sum + docente.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>

                    <Button onClick={exportToExcel} className="mt-3">Descargar Tabla en Excel</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default DocentesCarreraSexo;

