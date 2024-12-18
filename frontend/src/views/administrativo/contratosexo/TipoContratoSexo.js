import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2'; // Importar Pie chart de react-chartjs-2
import { saveAs } from 'file-saver'; // Importar file-saver
import * as XLSX from 'xlsx'; // Importar xlsx para exportar a Excel
import config from '../../../config';
import 'chart.js/auto'; // Para registrar todos los elementos de Chart.js

const TipoContrato = () => {
    const [data, setData] = useState([]);
    const [gestion, setGestion] = useState('');
    const [gestiones, setGestiones] = useState([]);
    const chartRef = useRef(null); // Referencia para acceder al gráfico

    // Función para obtener los datos filtrados por año (gestión) o las gestiones disponibles
    const fetchData = async (year = null) => {
        const url = year ? `${config.API_URL}/administrativos-contrato/${year}` : `${config.API_URL}/administrativos-contrato`;
        const response = await fetch(url);
        const result = await response.json();
        if (year) {
            setData(result);
        } else {
            setGestiones(result);
            if (result.length > 0) {
                setGestion(result[0].gestion);
            }
        }
    };

    useEffect(() => {
        fetchData();  // Obtener las gestiones al cargar el componente
    }, []);

    useEffect(() => {
        if (gestion) {
            fetchData(gestion);  // Obtener los datos cuando se selecciona una gestión
        }
    }, [gestion]);

    // Ordenar los datos por 'actividad' alfabéticamente
    const sortedData = [...data].sort((a, b) => a.tipo_contrato.localeCompare(b.tipo_contrato));

    // Calcular el total general
    const totalGeneral = sortedData.reduce((acc, row) => acc + row.total, 0);

    // Preparar los datos para el gráfico Pie
    const pieData = {
        labels: sortedData.map(row => row.tipo_contrato),  // Etiquetas de cada tipo de contrato
        datasets: [{
            label: 'Distribución por contrato y sexo',
            data: sortedData.map(row => ((row.total / totalGeneral) * 100).toFixed(2)), // Convertir a porcentaje y limitar a 2 decimales
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada segmento
        }]
    };

    // Función para descargar la tabla en Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(sortedData.map(row => ({
            actividad: row.tipo_contrato,
            Masculino: row.total_m,
            Femenino: row.total_f,
            Total: row.total
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Administrativos");
        XLSX.writeFile(wb, `administrativos_tipo_contrato${gestion}.xlsx`);
    };

    // Función para descargar el gráfico como imagen
    const downloadChartImage = () => {
        const chart = chartRef.current;
        const base64Image = chart.toBase64Image(); // Convertir gráfico a imagen en base64
        saveAs(base64Image, `administrativos_tipo_contrato_${gestion}.png`); // Guardar imagen como archivo PNG
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Personal Administrativo por Sexo, según Tipo de Contrato.
                        <Form.Select 
                            className="mt-2" 
                            value={gestion} 
                            onChange={(e) => setGestion(e.target.value)}
                        >
                            {gestiones.map((g) => (
                                <option key={g.gestion} value={g.gestion}>
                                    {g.gestion}
                                </option>
                            ))}
                        </Form.Select>
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Contrato</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.tipo_contrato}</td>
                                    <td>{row.total_m}</td>
                                    <td>{row.total_f}</td>
                                    <td>{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total_m, 0)}</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total_f, 0)}</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button variant="primary" onClick={exportToExcel}>
                        Descargar Tabla en Excel
                    </Button>
                </Card>
            </Col>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>Gráfica de Sectores: Distribución por Tipo de Contrato  </CardHeader>
                    <div style={{ height: '400px' }}>
                        <Pie ref={chartRef} data={pieData} options={chartOptions} />
                    </div>
                    <Button variant="primary" onClick={downloadChartImage} className="mt-2">
                        Descargar Gráfico en Imagen
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default TipoContrato;

