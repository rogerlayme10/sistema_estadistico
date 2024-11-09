import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import config from '../../../../../config';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MatriculadosSexoFacultad = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState("2023");
    const chartRef = useRef(null);  // Crear una referencia para el gráfico

    const fetchData = async (gestion) => {
        try {
            const url = gestion
                ? `${config.API_URL}/matriculados-sexo-facultad?gestion=${gestion}`
                : `${config.API_URL}/matriculados-sexo-facultad`;

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

    // Descargar gráfico como imagen
    const downloadChartImage = () => {
        const chart = chartRef.current;
        if (chart) {
            const imageURL = chart.toBase64Image();
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = `Grafico_Matriculados_Sexo_${selectedGestion}.png`;
            link.click();
        }
    };

    // Configuración del gráfico de barras
    const chartData = {
        labels: data.map(item => item.facultad),
        datasets: [
            {
                label: 'Masculino',
                data: data.map(item => item.total_masculino),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Femenino',
                data: data.map(item => item.total_femenino),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label:'Total',
                data: data.map(item => item.total),
                backgroundColor: 'rgb(5, 162, 182)',


            },

        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Distribución por Sexo - Gestión ${selectedGestion}`,
            },
        },
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Población estudiantil Matriculados por Facultad
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
                                <th rowSpan="2">Facultad</th>
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
                                    <td>{item.facultad}</td>
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
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>Gráfico</CardHeader>
                    <Bar data={chartData} options={chartOptions} ref={chartRef} />  {/* Asignar la referencia al gráfico */}
                    <Button className="mt-3" onClick={downloadChartImage}>Descargar Gráfico</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default MatriculadosSexoFacultad;
