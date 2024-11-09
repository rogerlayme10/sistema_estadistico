import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import config from '../../../../../config';
import * as XLSX from 'xlsx';
//import { Bar } from 'react-chartjs-2';


const MatriculadosSexoFacultad = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState("2023");
    

    const fetchData = async (gestion) => {
        try {
            const url = gestion
                ? `${config.API_URL}/matriculados-regular-carrera?gestion=${gestion}`
                : `${config.API_URL}/matriculados-regular-carrera`;

            const response = await fetch(url);
            const result = await response.json();
            
            if (gestion) {
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

    // Descargar tabla como Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Matriculados");

        XLSX.writeFile(workbook, `Matriculados_Sexo_Carrera_${selectedGestion}.xlsx`);
    };

   

    

    return (
        <Row>
            <Col >
                <Card>
                    <CardHeader>
                        Población estudiantil matriculados regulares,segun sexo 
                        <Form.Select
                            value={selectedGestion || ''}
                            onChange={(e) => setSelectedGestion(e.target.value)}
                            className="mt-2"
                        >
                            <option value="">Seleccionar gestión</option>
                            {gestiones.map((gestion, index) => (
                                <option key={index} value={gestion.gestion}>
                                    {gestion.gestion}
                                </option>
                            ))}
                        </Form.Select>
                    </CardHeader>
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
}

export default MatriculadosSexoFacultad;

