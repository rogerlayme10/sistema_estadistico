import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Button } from 'react-bootstrap';
import config from '../../../../config';
import { saveAs } from 'file-saver'; // Para guardar imágenes
import * as XLSX from 'xlsx'; // Para exportar a Excel
import {
    Chart as ChartJS,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Etiqueta numérica

// Registrar los elementos necesarios para Chart.js
ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip, Legend,ChartDataLabels);

const AlimentacionResumen = () => {
    const [gestiones, setGestiones] = useState([]);
    const chartRef = useRef(null);

    // Cargar datos desde el servidor
    useEffect(() => {
        fetch(`${config.API_URL}/docencia-resumen`)
            .then((response) => response.json())
            .then((data) => setGestiones(data))
            .catch((error) => console.error("Error al cargar las gestiones:", error));
    }, []);

    // Datos del gráfico (solo totales)
    const chartData = {
        labels: gestiones.map((g) => g.gestion), // Eje X: gestiones
        datasets: [
            {
                label: "Total",
                data: gestiones.map((g) => g.total), // Eje Y: totales
                borderColor: "green",
                backgroundColor: "rgba(0, 128, 0, 0.3)",
                fill: true,
            },
        ],
    };

    // Configuración del gráfico
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: true, // Mostrar números
                anchor: 'end', // Anclar las etiquetas al extremo superior de las barras
                align: 'top',  // Alinear las etiquetas hacia la parte superior de las barras
                offset: 5,     // Ajusta la distancia de la etiqueta desde la barra (puedes modificar el valor según lo necesario)
              },
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                title: { display: true, text: "Gestión" },
            },
            y: {
                title: { display: true, text: "Total" },
            },
        },
    };

    // Exportar tabla a Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(gestiones);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Gestiones");
        XLSX.writeFile(workbook, "Gestiones_Alimentacion.xlsx");
    };

    // Exportar gráfico a imagen
    const exportChartImage = () => {
        const chartInstance = chartRef.current;
        if (chartInstance) {
            const image = chartInstance.toBase64Image();
            saveAs(image, "Grafico_Alimentacion.png");
        }
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                    Beca Auxiliar de Docencia por Sexo, según Gestion.

                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Gestion</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gestiones.length > 0 ? (
                                gestiones.map((gestion, index) => (
                                    <tr key={index}>
                                        <td>{gestion.gestion}</td>
                                        <td>{gestion.total_m}</td>
                                        <td>{gestion.total_f}</td>
                                        <td>{gestion.total}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No hay datos disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{gestiones.reduce((acc, curr) => acc + curr.total_m, 0)}</th>
                                <th>{gestiones.reduce((acc, curr) => acc + curr.total_f, 0)}</th>
                                <th>{gestiones.reduce((acc, curr) => acc + curr.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button variant="primary" onClick={exportToExcel}>
                    Descargar Excel
                    </Button>
                </Card>
                
            </Col>

            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                    Gráfico de Lineas: Distribucion por Gestiones.
                    </CardHeader>
                    <div style={{ height: "400px" }}>
                        <Line ref={chartRef} data={chartData} options={chartOptions} />
                    </div>
                    <Button variant="primary" onClick={exportChartImage}>
                        Descargar Imagen
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default AlimentacionResumen;
