import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import config from '../../../../../config';
import * as XLSX from 'xlsx';
//import { Bar } from 'react-chartjs-2';


const MatriculadosProgramadosFacultad = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState("2023");


    const fetchData = async (gestion) => {
        try {
            const url = gestion
                ? `${config.API_URL}/matriculados-programados-carrera?gestion=${gestion}`
                : `${config.API_URL}/matriculados-programados-carrera`;

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

    const exportToExcel = () => {
        // Preparar los datos con la columna de porcentaje
        const excelData = data.map((item) => {
            const porcentaje = item.total_matriculados
                ? ((item.total_programados / item.total_matriculados) * 100).toFixed(2) + '%'
                : '0%';
    
            return {
                Carrera: item.programa,
                Matriculados: item.total_matriculados,
                Programados: item.total_programados,
                Porcentaje: porcentaje, // Agregar columna de porcentaje
            };
        });
    
        // Crear hoja de Excel con los datos actualizados
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Matriculados");
    
        // Descargar el archivo Excel
        XLSX.writeFile(workbook, `Matriculados_Sexo_Carrera_${selectedGestion}.xlsx`);
    };




    return (
        <Row>
            <Col >
                <Card>
                    <CardHeader>
                        Población Estudiantil Matriculadados y Programados,según Carrera.
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
                                <th colSpan="3" className="text-center">Estudiantes</th>
                            </tr>
                            <tr>
                                <th>Matriculados</th>
                                <th>Programados</th>
                                <th>%</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                // Verifica que total_matriculados no sea 0 para evitar divisiones por cero
                                const porcentaje = item.total_matriculados
                                    ? ((item.total_programados / item.total_matriculados) * 100).toFixed(2)
                                    : 0;

                                return (
                                    <tr key={index}>
                                        <td>{item.programa}</td>
                                        <td>{item.total_matriculados}</td>
                                        <td>{item.total_programados}</td>
                                        <td>{porcentaje}%</td> {/* Muestra el porcentaje */}
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((acc, item) => acc + item.total_matriculados, 0)}</th>
                                <th>{data.reduce((acc, item) => acc + item.total_programados, 0)}</th>
                                <th>
                                    {(() => {
                                        const totalMatriculados = data.reduce((acc, item) => acc + item.total_matriculados, 0);
                                        const totalProgramados = data.reduce((acc, item) => acc + item.total_programados, 0);
                                        return totalMatriculados
                                            ? ((totalProgramados / totalMatriculados) * 100).toFixed(2) + '%'
                                            : '0%';
                                    })()}
                                </th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button className="mt-3" onClick={exportToExcel}>Descargar Excel</Button>
                </Card>
            </Col>

        </Row>
    );
}

export default MatriculadosProgramadosFacultad;

