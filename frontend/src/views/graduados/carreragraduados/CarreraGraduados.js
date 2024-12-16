import React, { useState, useEffect} from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import config from '../../../config';
import * as XLSX from 'xlsx';


const FacultadGraduados = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState("2023");
   
    const fetchData = async (gestion_acta) => {
        try {
            const url = gestion_acta
                ? `${config.API_URL}/graduados-carrera?gestion_acta=${gestion_acta}`
                : `${config.API_URL}/graduados-carrera`;

            const response = await fetch(url);
            const result = await response.json();
            
            if (gestion_acta) {
                setData(result);
            } else {
                setGestiones(result);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        fetchData(selectedGestion);
    }, [selectedGestion]);

    useEffect(() => {
        fetchData();
        fetchData("2023");
    }, []);

    
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Graduados");

        XLSX.writeFile(workbook, `graduados_facultad_${selectedGestion}.xlsx`);
    };


   
    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        Graduados por Sexo, segun  Carrera.
                        <Form.Select
                            value={selectedGestion || ''}
                            onChange={(e) => setSelectedGestion(e.target.value)}
                            className="mt-2"
                        >
                            <option value="">Seleccionar gestión</option>
                            {gestiones.map((gestion_acta, index) => (
                                <option key={index} value={gestion_acta.gestion_acta}>
                                    {gestion_acta.gestion_acta}
                                </option>
                            ))}
                        </Form.Select>
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Carrera</th>
                                <th colSpan="2" className="text-center">Gestion</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.programa}</td>
                                    <td>{item.total_masculino}</td>
                                    <td>{item.total_femenino}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((acc, item) => acc + item.total_masculino, 0)}</th>
                                <th>{data.reduce((acc, item) => acc + item.total_femenino, 0)}</th>
                                <th>{data.reduce((acc, item) => acc + item.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button className="mt-3" onClick={exportToExcel}>Descargar Excel</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default FacultadGraduados;
