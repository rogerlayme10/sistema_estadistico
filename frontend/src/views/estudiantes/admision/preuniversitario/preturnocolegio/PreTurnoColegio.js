import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js'; // Importa los elementos necesarios
import { saveAs } from 'file-saver'; // Mantenemos esta importación para usarla
import * as XLSX from 'xlsx'; // Para exportar a Excel
import config from '../../../../../config'; // Archivo donde defines tu URL base

// Registra los elementos que necesitas para los gráficos
Chart.register(ArcElement, Legend, Tooltip);

const PreTurnoColegio = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(""); 
    const chartRef = useRef(null);

    const fetchData = async (year) => {
        const response = await fetch(`${config.API_URL}/pre-turnocol?gestion=${year}`);
        const result = await response.json();
        setData(result);
    };

    const fetchYears = async () => {
        const response = await fetch(`${config.API_URL}/pre-turnocol?gestiones=true`);
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
            "Turno de Colegio": row.turno_col.trim() === 'D' ? 'Dia' : row.turno_col.trim() === 'V' ? 'Tarde' : 'Noche',
            "M": row.total_masculino,
            "F": row.total_femenino,
            "Total": row.total
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Admision_turno_col_psa");
        XLSX.writeFile(workbook, `admision_psa_${selectedYear}.xlsx`);
    };

    const chartData = {
        labels: data.map(row => row.turno_col.trim() === 'D' ? 'Dia' : row.turno_col.trim() === 'V' ? 'Tarde' : 'Noche'),
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
            saveAs(blob, `grafico_tipocolegio_nuevos_${selectedYear}.png`);
        });
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Admision Estudiantil por Pre Turno Colegio.
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
                                        <td>{row.turno_col.trim() === 'D' ? 'Dia' : row.turno_col.trim() === 'V' ? 'Tarde' : 'Noche'}</td>
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

export default PreTurnoColegio;
