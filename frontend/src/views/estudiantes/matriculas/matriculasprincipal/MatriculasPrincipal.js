import React, { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, Row, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import config from '../../../../config';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels'; // Etiqueta numérica
// Registrar las escalas necesarias
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ChartDataLabels);

const MatriculasPrincipal = () => {
    const [chartData, setChartData] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        fetch(`${config.API_URL}/matriculados-principal`)
            .then(response => response.json())
            .then(data => {
                const gestionLabels = data.map(item => item.gestion);
                const totalNuevos = data.map(item => item.total_nuevo);
                const totalAntiguos = data.map(item => item.total_antiguo);
                const totalAmbos = data.map(item => item.total_general);  

                setChartData({
                    labels: gestionLabels,
                    datasets: [
                        {
                            label: 'Nuevos',
                            data: totalNuevos,
                            borderColor: 'rgba(75,192,192,1)',
                            fill: false,
                            tension: 0.3,
                            pointBackgroundColor: 'rgba(75,192,192,1)',
                        },
                        {
                            label: 'Regulares', // Nueva línea para aprobados
                            data: totalAntiguos,
                            borderColor: 'rgba(255,99,132,1)',
                            fill: false,
                            tension: 0.3,
                            pointBackgroundColor: 'rgba(255,99,132,1)',
                        },
                        {
                            label: 'Total', // Nueva línea para aprobados
                            data: totalAmbos,
                            borderColor: 'RGB(255, 143, 99)',
                            fill: false,
                            tension: 0.3,
                            pointBackgroundColor: 'RGB(255, 143, 99)',
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
        link.download = 'total_administrativos.png';
        link.click();
    };

    return (
        <Row>
            <Col xs={18} md={9} xl={9}>
                <Card>
                    <CardHeader>Cronologia de Postulantes y Aceptados</CardHeader>
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
                                                    text: 'Número de Personas',
                                                },
                                                grid: {
                                                    color: 'rgba(0,0,0,0.1)', // Líneas de la cuadrícula eje Y
                                                },
                                                beginAtZero: false,
                                                suggestedMin: Math.min(...chartData.datasets.flatMap(dataset => dataset.data)) - 10,
                                                suggestedMax: Math.max(...chartData.datasets.flatMap(dataset => dataset.data)) + 10
                                            }
                                        },
                                        plugins: {
                                            datalabels: {
                                                display: true, // Mostrar números
                                                anchor: 'end', // Anclar las etiquetas al extremo superior de las barras
                                                align: 'top',  // Alinear las etiquetas hacia la parte superior de las barras
                                                offset: 5,     // Ajusta la distancia de la etiqueta desde la barra (puedes modificar el valor según lo necesario)
                                              },
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

export default MatriculasPrincipal;
