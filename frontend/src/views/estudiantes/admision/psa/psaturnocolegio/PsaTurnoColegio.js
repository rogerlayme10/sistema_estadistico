import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import config from '../../../../../config';

// Registra los elementos necesarios para los gráficos de barras
Chart.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const PsaTurnoColegio = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const chartRef = useRef(null);

    // Función para obtener los datos de acuerdo al año seleccionado
    const fetchData = async (year) => {
        try {
            const response = await fetch(`${config.API_URL}/psa-turnocol?gestion=${year}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    // Función para obtener las gestiones disponibles
    const fetchYears = async () => {
        try {
            const response = await fetch(`${config.API_URL}/psa-turnocol?gestiones=true`);
            const result = await response.json();
            setYears(result);
            setSelectedYear(result[0]?.gestion || ""); // Selecciona el primer año por defecto
        } catch (error) {
            console.error("Error al obtener las gestiones:", error);
        }
    };

    // Llamada inicial para obtener los años
    useEffect(() => {
        fetchYears();
    }, []);

    // Actualiza los datos cuando cambia el año seleccionado
    useEffect(() => {
        if (selectedYear) {
            fetchData(selectedYear);
        }
    }, [selectedYear]);

    // Función para exportar los datos a Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data.map(row => ({
            "Turno de Colegio": row.turno_col.trim() === 'D' ? 'Día' : row.turno_col.trim() === 'V' ? 'Tarde' : 'Noche',
            "M": row.total_masculino,
            "F": row.total_femenino,
            "Total": row.total,
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Admision_turno_col_psa");
        XLSX.writeFile(workbook, `admision_psa_${selectedYear}.xlsx`);
    };

    // Datos para el gráfico
    const chartData = {
        labels: data.map(row => row.turno_col.trim() === 'D' ? 'Día' : row.turno_col.trim() === 'V' ? 'Tarde' : 'Noche'),
        datasets: [
            {
                label: "Total",
                data: data.map(row => row.total),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };
    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Ocultar la leyenda
            },
            title: {
                display: true,
                text: `Totales por Tipo de Colegio `,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Turno Colegio', // Título del eje X
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad',
                },
                beginAtZero: true,
            },
        },
    };

    // Función para descargar el gráfico como imagen
    const downloadChartImage = () => {
        const canvas = chartRef.current.canvas;
        canvas.toBlob(function (blob) {
            saveAs(blob, `grafico_turnocolegio_nuevos_${selectedYear}.png`);
        });
    };

    return (
        <Row>
            {/* Tabla de datos */}
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        P.S.A. por Sexo, según Turno Colegio.
                        <Form.Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="mt-2"
                        >
                            {years.map((year) => (
                                <option key={year.gestion} value={year.gestion}>
                                    {year.gestion}
                                </option>
                            ))}
                        </Form.Select>
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Turno de Colegio</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .filter((row) => row.turno_col !== null)
                                .map((row) => (
                                    <tr key={row.turno_col.trim()}>
                                        <td>{row.turno_col.trim() === 'D' ? 'Día' : row.turno_col.trim() === 'V' ? 'Tarde' : 'Noche'}</td>
                                        <td>{row.total_masculino}</td>
                                        <td>{row.total_femenino}</td>
                                        <td>{row.total}</td>
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((sum, row) => sum + row.total_masculino, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.total_femenino, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button onClick={exportToExcel} className="mt-2" variant="primary">
                        Descargar Tabla en Excel
                    </Button>
                </Card>
            </Col>

            {/* Gráfico de barras */}
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Gráfico
                    </CardHeader>
                    
                        <Bar ref={chartRef} data={chartData} options={barChartOptions} />
                  
                    <Button onClick={downloadChartImage} className="mt-2" variant="primary">
                        Descargar Gráfico en Imagen
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default PsaTurnoColegio;
