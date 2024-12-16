import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Form, Row, Col, Button } from 'react-bootstrap';
import config from '../../../config'; // Importa la configuración de rutas
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';

// Registra los elementos necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PermanenciaGraduados = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState("");
    
    useEffect(() => {
        
        fetch(`${config.API_URL}/graduados-permanencia?type=gestiones`)
            .then(response => response.json())
            .then(data => setGestiones(data))
            .catch(error => console.error("Error al cargar gestiones:", error));
    }, []);
    
    useEffect(() => {
        
        const url = selectedGestion
            ? `${config.API_URL}/graduados-permanencia?gestion=${selectedGestion}`
            : `${config.API_URL}/graduados-permanencia`;

        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error al cargar datos:", error));
    }, [selectedGestion]);

   
    const descargarExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Permanencia Graduados");
        XLSX.writeFile(wb, "permanencia_graduados.xlsx");
    };


    const chartData = {
        labels: data.map(item => item.anio_ingreso),
        datasets: [
            {
                label: 'Número de Estudiantes',
                data: data.map(item => item.num_estudiantes),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    // Función para descargar el gráfico como imagen
    const descargarGrafico = () => {
        const canvas = document.getElementById("grafico"); 
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.href = image;
        link.download = "grafico.png";
        link.click();
    };

    return (
        <Row>
            <Col xs={12} md={5} xl={5}>
                <Card>
                    <CardHeader>Graduados y la Permanecia de Años </CardHeader>
                    <Form.Select
                        value={selectedGestion}
                        onChange={(e) => setSelectedGestion(e.target.value)}
                    >
                        <option value="">Seleccione una gestión</option>
                        {gestiones.map(gestion => (
                            <option key={gestion} value={gestion}>{gestion}</option>
                        ))}
                    </Form.Select>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Año de Ingreso</th>
                                <th>Años en el Programa</th>
                                <th>Número de Estudiantes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.anio_ingreso}</td>
                                    <td>{item.anos_programa}</td>
                                    <td>{item.num_estudiantes}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th></th>
                                <th>{data.reduce((acc, item) => acc + item.num_estudiantes, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button variant="primary" onClick={descargarExcel}>Descargar Excel</Button>
                </Card>
            </Col>
            <Col xs={12} md={7} xl={7}>
                <Card>
                    <CardHeader>Gráfica de Barras: Distribución por gestion</CardHeader>
                    <div>
                        <Bar
                            id="grafico"
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Número de Estudiantes por Año de Ingreso'
                                    },
                                    tooltip: {
                                        mode: 'index',
                                        intersect: false
                                    }
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Año de Ingreso'
                                        }
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Número de Estudiantes'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <Button variant="primary" onClick={descargarGrafico}>Descargar Gráfico</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default PermanenciaGraduados;
