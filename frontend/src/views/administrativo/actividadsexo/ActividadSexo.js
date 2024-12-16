import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { PolarArea } from 'react-chartjs-2'; // Importar PolarArea chart de react-chartjs-2
import { saveAs } from 'file-saver'; // Importar file-saver
import * as XLSX from 'xlsx'; // Importar xlsx para exportar a Excel
import config from '../../../config';
import 'chart.js/auto'; // Para registrar todos los elementos de Chart.js

const ActividadSexo = () => {
    const [data, setData] = useState([]);
    const [gestion, setGestion] = useState('');
    const [gestiones, setGestiones] = useState([]);
    const chartRef = useRef(null); // Referencia para acceder al gráfico

    // Función para obtener los datos filtrados por año (gestión) o las gestiones disponibles
    const fetchData = async (year = null) => {
        const url = year ? `${config.API_URL}/administrativos-actividad/${year}` : `${config.API_URL}/administrativos-actividad`;
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
    const sortedData = [...data].sort((a, b) => a.actividad.localeCompare(b.actividad));

    // Calcular el total general
    const totalGeneral = sortedData.reduce((acc, row) => acc + row.total, 0);

    // Preparar los datos para el gráfico PolarArea en porcentaje
    const polarData = {
        labels: sortedData.map(row => row.actividad), // Etiquetas de cada actividad
        datasets: [{
            label: 'Distribución en % por actividad',
            data: sortedData.map(row => ((row.total / totalGeneral) * 100).toFixed(2)), // Convertir a porcentaje y limitar a 2 decimales
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada segmento
        }]
    };

    // Configuración del gráfico
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw; // Valor del dataset
                        return `${context.label}: ${value}%`; // Mostrar el valor con %
                    }
                }
            }
        }
    };

    // Función para descargar la tabla en Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(sortedData.map(row => ({
            actividad: row.actividad,
            Masculino: row.total_m,
            Femenino: row.total_f,
            Total: row.total
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Administrativos");
        XLSX.writeFile(wb, `administrativos_actividadsexo${gestion}.xlsx`);
    };

    // Función para descargar el gráfico como imagen
    const downloadChartImage = () => {
        const chart = chartRef.current;
        const base64Image = chart.toBase64Image(); // Convertir gráfico a imagen en base64
        saveAs(base64Image, `administrativos_actividad_sexo_${gestion}.png`); // Guardar imagen como archivo PNG
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Personal Administrativo por Sexo, según Actividad.
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
                                <th rowSpan="2">Actividad</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                                {/*<th rowSpan="2">%</th>*/}
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.actividad}</td>
                                    <td>{row.total_m}</td>
                                    <td>{row.total_f}</td>
                                    <td>{row.total}</td>
                                    {/*<td>{((row.total / totalGeneral) * 100).toFixed(2)}%</td>*/}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total_m, 0)}</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total_f, 0)}</th>
                                <th>{totalGeneral}</th>
                                {/*<th>100%</th>*/}
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
                    <CardHeader>Gráfico Polar: Distribución por Actividad</CardHeader>
                    <div style={{ height: '400px' }}>
                        <PolarArea ref={chartRef} data={polarData} options={chartOptions} />
                    </div>
                    <Button variant="primary" onClick={downloadChartImage} className="mt-2">
                        Descargar Gráfico en Imagen
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default ActividadSexo;
