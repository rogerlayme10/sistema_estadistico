import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import config from '../../../../../config';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import * as XLSX from 'xlsx'; // Para exportar la tabla a Excel

// Registrar los componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PreCrecimientoPostulantes = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const chartRef = useRef(null); // Referencia para el gráfico

    // Obtener los datos de la API
    const fetchData = async () => {
        try {
            const response = await fetch(`${config.API_URL}/pre-tasa-crecimiento-postulantes`);
            const result = await response.json();
            setGestiones(result.gestiones);
            setData(result.datos);
        } catch (error) {
            console.error("Error al obtener los datos: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Preparamos los datos para el gráfico de líneas
    const lineChartData = {
        labels: gestiones, // Las gestiones serán las etiquetas del eje X
        datasets: [
            {
                label: 'Total de Postulantes PSA',
                data: gestiones.map((gestion) =>
                    data.reduce((sum, row) => sum + (row[`total_${gestion}`] || 0), 0)
                ),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    // Opciones del gráfico, incluyendo la configuración del eje Y
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Crecimiento de postulantes PRE',
            },
        },
        
    };

    // Función para descargar la tabla en Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            data.map((row) => ({
                Carrera: row.programa,
                ...gestiones.reduce((acc, gestion) => {
                    acc[`Total ${gestion}`] = row[`total_${gestion}`];
                    return acc;
                }, {}),
                Total: row.total,
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tasa Crecimiento");
        XLSX.writeFile(workbook, "tasa_crecimiento_postulantes_pre.xlsx");
    };

    // Función para descargar el gráfico como imagen
    const downloadChartImage = () => {
        const chart = chartRef.current; // Obtenemos la referencia al gráfico
        const url = chart.toBase64Image(); // Convertimos el gráfico a una imagen en base64
        const link = document.createElement('a');
        link.href = url;
        link.download = 'grafico_tasa_crecimiento_nuevos.png';
        link.click();
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>Tasa de crecimiento postulantes de PRE según </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Carrera</th>
                                <th colSpan={gestiones.length} className="text-center">Gestión</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                {gestiones.map((gestion) => (
                                    <th key={gestion}>{gestion}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.programa}>
                                    <td>{row.programa}</td>
                                    {gestiones.map((gestion) => (
                                        <td key={gestion}>{row[`total_${gestion}`]}</td>
                                    ))}
                                    <td>{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                {gestiones.map((gestion) => (
                                    <th key={gestion}>
                                        {data.reduce((sum, row) => sum + (row[`total_${gestion}`] || 0), 0)}
                                    </th>
                                ))}
                                <th>{data.reduce((sum, row) => sum + row.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    {/* Botón para descargar la tabla en Excel */}
                    <Button onClick={downloadExcel} variant="primary">Descargar Tabla en Excel</Button>
                </Card>
            </Col>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>Gráfico</CardHeader>
                    {/* Gráfico de líneas */}
                    <Line ref={chartRef} data={lineChartData} options={lineChartOptions} />
                    {/* Botón para descargar el gráfico como imagen */}
                    <Button onClick={downloadChartImage} variant="primary">Descargar Gráfico como Imagen</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default PreCrecimientoPostulantes;
