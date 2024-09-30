import React, { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, Row, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import config from '../../../config';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar las escalas necesarias
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DocentesCrecimiento = () => {
    const [chartData, setChartData] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        fetch(`${config.API_URL}/administrativos-gestiongrafic`)
            .then(response => response.json())
            .then(data => {
                const gestionLabels = data.map(item => item.gestion);
                const docentesCounts = data.map(item => item.total_administrativos);

                setChartData({
                    labels: gestionLabels,
                    datasets: [
                        {
                            label: 'Crecimiento de Docentes',
                            data: docentesCounts,
                            borderColor: 'rgba(75,192,192,1)',
                            fill: false,
                            tension: 0.3,
                            pointBackgroundColor: 'rgba(75,192,192,1)',
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Función para descargar el gráfico como imagen
    const downloadChart = () => {
        const chart = chartRef.current;
        if (!chart) return;

        const link = document.createElement('a');
        link.href = chart.toBase64Image();
        link.download = 'crecimiento-administrativos.png';
        link.click();
    };

    return (
        <Row>
            <Col xs={18} md={9} xl={9}>
                <Card>
                    <CardHeader>Total administrativos por gestion </CardHeader>
                    <Card.Body>
                        {chartData && chartData.labels && (
                            <>
                                <Line
                                    ref={chartRef}
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        scales: {
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Gestión',
                                                },
                                                grid: {
                                                    color: 'rgba(0,0,0,0.1)', // Líneas de la cuadrícula eje X
                                                }
                                            },
                                            y: {
                                                title: {
                                                    display: true,
                                                    text: 'Número de Docentes',
                                                },
                                                grid: {
                                                    color: 'rgba(0,0,0,0.1)', // Líneas de la cuadrícula eje Y
                                                },
                                                beginAtZero: false,
                                                suggestedMin: Math.min(...chartData.datasets[0].data) - 10,
                                                suggestedMax: Math.max(...chartData.datasets[0].data) + 10
                                            }
                                        },
                                        plugins: {
                                            beforeDraw: (chart) => {
                                                const ctx = chart.ctx;
                                                ctx.save();
                                                ctx.fillStyle = 'white'; // Establecer el fondo blanco
                                                ctx.fillRect(0, 0, chart.width, chart.height);
                                                ctx.restore();
                                            }
                                        }
                                    }}
                                />
                                <Button variant="primary" onClick={downloadChart} style={{ marginTop: '20px' }}>
                                    Descargar gráfico
                                </Button>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default DocentesCrecimiento;
