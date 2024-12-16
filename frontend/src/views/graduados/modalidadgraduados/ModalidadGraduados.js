import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import config from '../../../config';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ModalidadGraduados = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState("2023");
    const chartRef = useRef(null);  

    const fetchData = async (gestion_acta) => {
        try {
            const url = gestion_acta
                ? `${config.API_URL}/graduados-modalidad?gestion_acta=${gestion_acta}`
                : `${config.API_URL}/graduados-modalidad`;

            const response = await fetch(url);
            const result = await response.json();
            
            if (gestion_acta) {
                setData(result);
            } else {
                setGestiones(result);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        fetchData(selectedGestion);
    }, [selectedGestion]);

    useEffect(() => {
        fetchData();
        fetchData("2023");
    }, []);

   
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Graduados");

        XLSX.writeFile(workbook, `graduados_modalidad_${selectedGestion}.xlsx`);
    };

    const downloadChartImage = () => {
        const chart = chartRef.current;
        if (chart) {
            const imageURL = chart.toBase64Image();
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = `Grafico_Graduados_modalidad_${selectedGestion}.png`;
            link.click();
        }
    };

    // Configuración del gráfico de barras
    const chartData = {
        labels: data.map(item => item.descripcion),
        datasets: [
            /*{
                label: 'Masculino',
                data: data.map(item => item.total_masculino),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Femenino',
                data: data.map(item => item.total_femenino),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },*/
            {
                label:'Total',
                data: data.map(item => item.total),
                backgroundColor: 'rgb(5, 162, 182)',


            },

        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Distribución por Sexo - Gestión ${selectedGestion}`,
            },
        },
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Graduados por gestion, segun  Modalidad de Grado.
                        <Form.Select
                            value={selectedGestion || ''}
                            onChange={(e) => setSelectedGestion(e.target.value)}
                            className="mt-2"
                        >
                            <option value="">Seleccionar gestión</option>
                            {gestiones.map((gestion_acta, index) => (
                                <option key={index} value={gestion_acta.gestion_acta}>
                                    {gestion_acta.gestion_acta}
                                </option>
                            ))}
                        </Form.Select>
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Facultad</th>
                                <th colSpan="2" className="text-center">Gestion</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.descripcion}</td>
                                    <td>{item.total_masculino}</td>
                                    <td>{item.total_femenino}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((acc, item) => acc + item.total_masculino, 0)}</th>
                                <th>{data.reduce((acc, item) => acc + item.total_femenino, 0)}</th>
                                <th>{data.reduce((acc, item) => acc + item.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button className="mt-3" onClick={exportToExcel}>Descargar Excel</Button>
                </Card>
            </Col>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>Gráfica de Barras: Distribución por Modalidad</CardHeader>
                    <Bar data={chartData} options={chartOptions} ref={chartRef} />  {/* Asignar la referencia al gráfico */}
                    <Button className="mt-3" onClick={downloadChartImage}>Descargar Gráfico</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default ModalidadGraduados;
