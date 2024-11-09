import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // Importa el componente Bar para la gráfica
import { saveAs } from 'file-saver'; // Para guardar la imagen
import * as XLSX from 'xlsx'; // Para exportar a Excel
import config from '../../../config';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registra los componentes de Chart.js que vas a usar
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DocentesFacultadSexo = () => {
    const [docentes, setDocentes] = useState([]);
    const [gestiones, setGestiones] = useState([]); // Estado para almacenar las gestiones
    const [gestion, setGestion] = useState('2023'); // Estado para la gestión seleccionada, por defecto 2023
    const chartRef = useRef(null); // Referencia a la gráfica

    // Función para obtener las facultades por sexo desde la API
    const fetchDocentes = useCallback(async () => {
        try {
            // Solo añade el filtro de gestión si hay un valor seleccionado
            const url = gestion ? `${config.API_URL}/facultades-sexo?gestion=${gestion}` : `${config.API_URL}/facultades-sexo`;
            const response = await fetch(url);
            const data = await response.json();
            setDocentes(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [gestion]);

    // Función para obtener las gestiones desde la API
    const fetchGestiones = async () => {
        try {
            const response = await fetch(`${config.API_URL}/facultades-sexo?type=gestiones`);
            const data = await response.json();
            setGestiones(data); // Almacena las gestiones en el estado
        } catch (error) {
            console.error('Error al obtener las gestiones:', error);
        }
    };

    // Cargar las gestiones al montar el componente
    useEffect(() => {
        fetchGestiones();
    }, []);

    // Cargar los docentes cada vez que la gestión cambie
    useEffect(() => {
        fetchDocentes();
    }, [fetchDocentes]);

    // Preparar los datos para la gráfica de barras
    const chartData = {
        labels: docentes.map(docente => docente.facultad), // Nombres de las facultades
        datasets: [
            {
                label: 'Total',
                data: docentes.map(docente => docente.total), // Solo los totales
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
                borderColor: 'rgba(75, 192, 192, 1)', // Borde de las barras
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Ocultar la leyenda porque solo tienes un dataset
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Total: ${context.raw}` // Muestra solo el total en el tooltip
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true // Inicia el eje Y en 0
            }
        }
    };

    // Función para exportar la tabla a Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(docentes.map(docente => ({
            Facultad: docente.facultad,
            Masculino: docente.total_masculino,
            Femenino: docente.total_femenino,
            Total: docente.total
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Docentes Facultad Sexo");
        XLSX.writeFile(workbook, `docentes_facultad_sexo_${gestion || 'todas'}.xlsx`);
    };

    // Función para exportar la gráfica a imagen
    const exportChartToImage = () => {
        const chart = chartRef.current;
        const url = chart.toBase64Image();
        saveAs(url, `grafico_facultad_${gestion || 'todas'}.png`);
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={5}>
                <Card>
                    <CardHeader>
                        Personal docente por sexo, según facultad
                    </CardHeader>

                    <Form className="mb-3">
                        <Form.Group controlId="gestionSelect">
                            <Form.Select 
                                value={gestion} 
                                onChange={e => setGestion(e.target.value)}>
                                <option value="" disabled>Seleccionar Año</option> {/* Opción deshabilitada */}
                                {gestiones.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Facultad</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docentes.map((docente, index) => (
                                <tr key={index}>
                                    <td>{docente.facultad}</td>
                                    <td>{docente.total_masculino}</td>
                                    <td>{docente.total_femenino}</td>
                                    <td>{docente.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{docentes.reduce((sum, docente) => sum + docente.total_masculino, 0)}</th>
                                <th>{docentes.reduce((sum, docente) => sum + docente.total_femenino, 0)}</th>
                                <th>{docentes.reduce((sum, docente) => sum + docente.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>

                    <Button onClick={exportToExcel} className="mt-3">Descargar Tabla en Excel</Button>
                </Card>
            </Col>
            <Col xs={12} md={6} xl={7}>
                <Card>
                    <CardHeader>Gráfica</CardHeader>
                    <div className="mt-4">
                        <h5>Gráfica de Totales por Facultad</h5>
                        <Bar ref={chartRef} data={chartData} options={chartOptions} />
                    </div>
                    <Button onClick={exportChartToImage} className="mt-3">Descargar Gráfica en Imagen</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default DocentesFacultadSexo;
