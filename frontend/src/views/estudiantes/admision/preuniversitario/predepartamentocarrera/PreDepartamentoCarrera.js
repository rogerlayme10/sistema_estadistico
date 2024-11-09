import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // Importa el gráfico de barras
import * as XLSX from 'xlsx';
import config from '../../../../../config'; // Archivo donde tienes tu URL base
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PreDepartamentoCarrera = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const chartRef = useRef(null);

    const fetchData = async (year) => {
        const response = await fetch(`${config.API_URL}/pre-departamento-carrera/${year}`);
        const result = await response.json();
        setData(result);
    };

    const fetchYears = async () => {
        const response = await fetch(`${config.API_URL}/pre-departamento-carrera`);
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
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
        XLSX.writeFile(workbook, `DepartamentoCarrera_${selectedYear}.xlsx`);
    };

    const barData = {
        labels: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Potosí', 'Oruro', 'Chuquisaca', 'Tarija', 'Beni', 'Pando', 'Otros'],
        datasets: [
            {
                label: 'Distribución por Departamento',
                data: [
                    data.reduce((sum, row) => sum + row.la_paz, 0),
                    data.reduce((sum, row) => sum + row.santa_cruz, 0),
                    data.reduce((sum, row) => sum + row.cochabamba, 0),
                    data.reduce((sum, row) => sum + row.potosi, 0),
                    data.reduce((sum, row) => sum + row.oruro, 0),
                    data.reduce((sum, row) => sum + row.chuquisaca, 0),
                    data.reduce((sum, row) => sum + row.tarija, 0),
                    data.reduce((sum, row) => sum + row.beni, 0),
                    data.reduce((sum, row) => sum + row.pando, 0),
                    data.reduce((sum, row) => sum + row.otros, 0),
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED', '#6B8E23', '#4682B4', '#DC143C'],
            },
        ],
    };

    const downloadChartImage = () => {
        const link = document.createElement('a');
        link.href = chartRef.current.toBase64Image();
        link.download = `chart_${selectedYear}.png`;
        link.click();
    };

    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <CardHeader>
                        Población Universitaria por Facultad según Departamento de Nacimiento.
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
                                <th rowSpan="2">Carrera</th>
                                <th colSpan="10" className="text-center">Departamento</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>La Paz</th>
                                <th>Santa Cruz</th>
                                <th>Cochabamba</th>
                                <th>Potosí</th>
                                <th>Oruro</th>
                                <th>Chuquisaca</th>
                                <th>Tarija</th>
                                <th>Beni</th>
                                <th>Pando</th>
                                <th>Otros</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.programa}>
                                    <td>{row.programa}</td>
                                    <td>{row.la_paz}</td>
                                    <td>{row.santa_cruz}</td>
                                    <td>{row.cochabamba}</td>
                                    <td>{row.potosi}</td>
                                    <td>{row.oruro}</td>
                                    <td>{row.chuquisaca}</td>
                                    <td>{row.tarija}</td>
                                    <td>{row.beni}</td>
                                    <td>{row.pando}</td>
                                    <td>{row.otros}</td>
                                    <td>{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((sum, row) => sum + row.la_paz, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.santa_cruz, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.cochabamba, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.potosi, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.oruro, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.chuquisaca, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.tarija, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.beni, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.pando, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.otros, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button onClick={exportToExcel}>Descargar Excel</Button>
                </Card>
            </Col>
            <Col xs={12} className="mt-4">
            <Card>
                <CardHeader>Grafifo de distribucion</CardHeader>
                <div style={{padding: '20px', width: '500%', height: '450px' }}>
                <Bar data={barData} ref={chartRef} /> {/* Usar gráfico de barras por defecto */}
                </div>
                <Button onClick={downloadChartImage}>Descargar Imagen del Gráfico</Button>
            </Card>
            
            </Col>
        </Row>
    );
};

export default PreDepartamentoCarrera;
