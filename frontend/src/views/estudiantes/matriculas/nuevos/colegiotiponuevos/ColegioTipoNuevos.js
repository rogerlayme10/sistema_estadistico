import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // Cambiar Doughnut por Bar
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Legend,
    Tooltip
} from 'chart.js'; // Importa los elementos necesarios
import { saveAs } from 'file-saver'; // Mantenemos esta importación para usarla
import * as XLSX from 'xlsx'; // Para exportar a Excel
import config from '../../../../../config'; // Archivo donde defines tu URL base

// Registra los elementos que necesitas para los gráficos de barras
ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const ColegioTipoNuevos = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(""); 
    const chartRef = useRef(null);

    const fetchData = async (year) => {
        const response = await fetch(`${config.API_URL}/matriculas-nuevos?gestion=${year}`);
        const result = await response.json();
        setData(result);
    };

    const fetchYears = async () => {
        const response = await fetch(`${config.API_URL}/matriculas-nuevos?gestiones=true`);
        const result = await response.json();
        setYears(result);
        setSelectedYear(result[0]?.gestion || "");
    };

    useEffect(() => {
        fetchYears();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            fetchData(selectedYear);
        }
    }, [selectedYear]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data.map(row => ({
            "Tipo de Colegio": row.tipo_col.trim() === 'C' ? 'Convenio' : row.tipo_col.trim() === 'F' ? 'Fiscal' : 'Particular',
            "M": row.total_masculino,
            "F": row.total_femenino,
            "Total": row.total
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Admision_tipo_col_psa");
        XLSX.writeFile(workbook, `matriculas_${selectedYear}.xlsx`);
    };

    const chartData = {
        labels: data.map(row => row.tipo_col.trim() === 'C' ? 'Convenio' : row.tipo_col.trim() === 'F' ? 'Fiscal' : 'Particular'),
        datasets: [
            {
                label: 'M',
                data: data.map(row => row.total_masculino),
                backgroundColor: '#36A2EB'
            },
            {
                label: 'F',
                data: data.map(row => row.total_femenino),
                backgroundColor: '#FF6384'
            }
        ]
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
                    text: 'Tipo Colegio', // Título del eje X
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

    const downloadChartImage = () => {
        const canvas = chartRef.current.canvas;
        canvas.toBlob(function(blob) {
            saveAs(blob, `grafico_tipocolegio_nuevos_${selectedYear}.png`);
        });
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Poblacion Estudiantil Nuevos Matriculados por Sexo, Según tipo de Colegio.
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
                                <th rowSpan="2">Tipo de Colegio</th>
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
                                .filter((row) => row.tipo_col !== null)
                                .map((row) => (
                                    <tr key={row.tipo_col.trim()}>
                                        <td>{row.tipo_col.trim() === 'C' ? 'Convenio' : row.tipo_col.trim() === 'F' ? 'Fiscal' : 'Particular'}</td>
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
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Gráfico de Barras: Distribución por Tipo de Colegio.
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

export default ColegioTipoNuevos;
