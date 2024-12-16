import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Form, Row, Col, Button } from 'react-bootstrap';
import config from '../../../config'; // Asegúrate de importar tu archivo de configuración
import * as XLSX from 'xlsx';         // Biblioteca para generar Excel
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Importar el gráfico Bar

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale, // Escala lineal necesaria para el gráfico de barras
    BarElement // Elemento de barra para el gráfico
);

const NotaGraduados = () => {
    const [gestiones, setGestiones] = useState([]);
    const [notas, setNotas] = useState({});
    const [gestionSeleccionada, setGestionSeleccionada] = useState('2023');
    const chartRef = useRef(null);

    useEffect(() => {
        fetch(`${config.API_URL}/graduados-nota`)
            .then(response => response.json())
            .then(data => {
                setGestiones(data.gestiones);
                setNotas(data.notas);
            })
            .catch(error => console.error('Error al obtener gestiones y notas:', error));
    }, []);

    useEffect(() => {
        if (gestionSeleccionada) {
            fetchNotas(gestionSeleccionada);
        }
    }, [gestionSeleccionada]);

    const handleGestionChange = (e) => {
        const gestion = e.target.value;
        setGestionSeleccionada(gestion);
    };

    const fetchNotas = (gestion) => {
        fetch(`${config.API_URL}/graduados-nota?gestion=${gestion}`)
            .then(response => response.json())
            .then(data => setNotas(data.notas))
            .catch(error => console.error('Error al obtener notas:', error));
    };

    const downloadExcel = () => {
        const ws = XLSX.utils.table_to_sheet(document.getElementById('notasTable'));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Notas');
        XLSX.writeFile(wb, 'Notas_Graduados.xlsx');
    };

    const downloadImage = () => {
        const chart = chartRef.current;
        const imageUrl = chart.toBase64Image();
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'grafico.png';
        link.click();
    };

    // Configuración del gráfico Bar
    const chartData = {
        labels: ['Simplemente Aprobado', 'Aprobado', 'Aprobado con Felicitaciones', 'Honorificamente Aprobado'],
        datasets: [
            {
                label: 'Cantidad Total',
                data: [
                    notas.simplemente_aprobado ? notas.simplemente_aprobado.M + notas.simplemente_aprobado.F : 0,
                    notas.aprobado ? notas.aprobado.M + notas.aprobado.F : 0,
                    notas.aprobado_felicitaciones ? notas.aprobado_felicitaciones.M + notas.aprobado_felicitaciones.F : 0,
                    notas.honorificamente_aprobado ? notas.honorificamente_aprobado.M + notas.honorificamente_aprobado.F : 0
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Notas'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad'
                },
                beginAtZero: true
            }
        }
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>Graduados por Sexo, segun Nota Literal</CardHeader>
                    <Form.Select onChange={handleGestionChange} value={gestionSeleccionada}>
                        <option value="">Seleccionar gestión</option>
                        {gestiones.map((gestion) => (
                            <option key={gestion.gestion_acta} value={gestion.gestion_acta}>
                                {gestion.gestion_acta}
                            </option>
                        ))}
                    </Form.Select>
                    <Table id="notasTable" bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Nota Literal</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notas.simplemente_aprobado && (
                                <tr>
                                    <td>Simplemente Aprobado</td>
                                    <td>{notas.simplemente_aprobado.M}</td>
                                    <td>{notas.simplemente_aprobado.F}</td>
                                    <td>{notas.simplemente_aprobado.M + notas.simplemente_aprobado.F}</td>
                                </tr>
                            )}
                            {notas.aprobado && (
                                <tr>
                                    <td>Aprobado</td>
                                    <td>{notas.aprobado.M}</td>
                                    <td>{notas.aprobado.F}</td>
                                    <td>{notas.aprobado.M + notas.aprobado.F}</td>
                                </tr>
                            )}
                            {notas.aprobado_felicitaciones && (
                                <tr>
                                    <td>Aprobado con Felicitaciones</td>
                                    <td>{notas.aprobado_felicitaciones.M}</td>
                                    <td>{notas.aprobado_felicitaciones.F}</td>
                                    <td>{notas.aprobado_felicitaciones.M + notas.aprobado_felicitaciones.F}</td>
                                </tr>
                            )}
                            {notas.honorificamente_aprobado && (
                                <tr>
                                    <td>Honorificamente Aprobado</td>
                                    <td>{notas.honorificamente_aprobado.M}</td>
                                    <td>{notas.honorificamente_aprobado.F}</td>
                                    <td>{notas.honorificamente_aprobado.M + notas.honorificamente_aprobado.F}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button onClick={downloadExcel} variant="primary">Descargar Excel</Button>
                </Card>
            </Col>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>Gráfica de Barras: Distribución por Nota Literal </CardHeader>
                    <div style={{ height: '400px' }}>
                        <Bar data={chartData} ref={chartRef} options={chartOptions} />
                    </div>
                    <Button onClick={downloadImage} variant="primary">Descargar Gráfico</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default NotaGraduados;
