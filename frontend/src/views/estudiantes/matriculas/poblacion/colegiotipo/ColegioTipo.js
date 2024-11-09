import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'; // Importa los elementos necesarios
import { saveAs } from 'file-saver'; // Mantenemos esta importación para usarla
import * as XLSX from 'xlsx'; // Para exportar a Excel
import config from '../../../../../config'; // Archivo donde defines tu URL base

// Registra los elementos que necesitas para los gráficos
Chart.register(ArcElement, Legend, Tooltip);

const ColegioTipo = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(""); 
    const chartRef = useRef(null);

    const fetchData = async (year) => {
        const response = await fetch(`${config.API_URL}/matriculas?gestion=${year}`);
        const result = await response.json();
        setData(result);
    };

    const fetchYears = async () => {
        const response = await fetch(`${config.API_URL}/matriculas?gestiones=true`);
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "Matriculas");
        XLSX.writeFile(workbook, `matriculas_TipoColegio${selectedYear}.xlsx`);
    };

    const chartData = {
        labels: data.map(row => row.tipo_col.trim() === 'C' ? 'Convenio' : row.tipo_col.trim() === 'F' ? 'Fiscal' : 'Particular'),
        datasets: [
            {
                data: data.map(row => row.total),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const downloadChartImage = () => {
        const canvas = chartRef.current.canvas;
        canvas.toBlob(function(blob) {
            saveAs(blob, `grafico_matriculas_TipoColegio_${selectedYear}.png`);
        });
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Población por Tipo de Colegio
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
                        Gráfico
                        
                    </CardHeader>
                    <div style={{ height: '400px', width: '400px', margin: 'auto' }}>
                    <Doughnut ref={chartRef} data={chartData} />

                    </div>
                    
                    <Button onClick={downloadChartImage} className="mt-2" variant="primary">
                            Descargar Gráfico en Imagen
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default ColegioTipo;
