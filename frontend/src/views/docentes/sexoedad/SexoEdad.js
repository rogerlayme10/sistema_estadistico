import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Button, Form } from 'react-bootstrap';
import config from '../../../config'; // Importar la configuración de la URL base
import * as XLSX from 'xlsx'; // Importar la librería XLSX
import { Bar } from 'react-chartjs-2'; // Importar el gráfico de barras de Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SexoEdad = () => {
    const [gestion, setGestion] = useState('');  // Gestión predeterminada vacía
    const [gestiones, setGestiones] = useState([]);  // Lista de gestiones disponibles
    const [datos, setDatos] = useState([]);
    const [totalM, setTotalM] = useState(0);
    const [totalF, setTotalF] = useState(0);
    const [totalGeneral, setTotalGeneral] = useState(0);

    // Crear una referencia al gráfico
    const chartRef = useRef(null);

    useEffect(() => {
        // Función para obtener las gestiones disponibles
        const fetchGestiones = async () => {
            try {
                const response = await fetch(`${config.API_URL}/docentes-sexoedad`);
                const gestionesData = await response.json();
                setGestiones(gestionesData);  // Guardar las gestiones en el estado
                if (gestionesData.length > 0) {
                    setGestion(gestionesData[0].gestion); // Establecer la primera gestión como predeterminada
                }
            } catch (error) {
                console.error('Error fetching gestiones:', error);
            }
        };

        fetchGestiones();
    }, []);

    useEffect(() => {
        // Función para obtener los datos de edad y sexo usando la gestión seleccionada
        const fetchDatos = async () => {
            if (!gestion) return;

            try {
                const response = await fetch(`${config.API_URL}/docentes-sexoedad?gestion=${gestion}`);
                const data = await response.json();

                // Calcular los totales
                let totalM = 0;
                let totalF = 0;
                let totalGeneral = 0;

                data.forEach(item => {
                    totalM += parseInt(item.total_m);
                    totalF += parseInt(item.total_f);
                    totalGeneral += parseInt(item.total);
                });

                setDatos(data);
                setTotalM(totalM);
                setTotalF(totalF);
                setTotalGeneral(totalGeneral);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (gestion) {
            fetchDatos();
        }
    }, [gestion]); // Llama a la API cada vez que cambia la gestión

    // Función para descargar la tabla en Excel
    const descargarExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            datos.map((item) => ({
                Edad: item.edad,
                M: item.total_m,
                F: item.total_f,
                Total: item.total,
            }))
        );

        // Agregar fila de totales al final
        XLSX.utils.sheet_add_aoa(ws, [
            ["Total", totalM, totalF, totalGeneral]
        ], { origin: -1 });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Edad y Sexo');

        XLSX.writeFile(wb, `Docente_Edad_Sexo_Gestion_${gestion}.xlsx`);
    };

    // Función para descargar el gráfico como imagen
    const descargarImagen = () => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const imgURL = chart.toBase64Image(); // Convertir el gráfico a base64
            const link = document.createElement('a');
            link.href = imgURL;
            link.download = `Grafico_Edad_Sexo_${gestion}.png`;
            link.click();
        }
    };

    // Preparar los datos para el gráfico de barras
    const barChartData = {
        labels: datos.map(item => ` ${item.edad}`), // Etiquetas de las edades
        datasets: [
            {
                label: 'Total',
                data: datos.map(item => item.total), // Totales para cada edad
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de las barras
                borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
                borderWidth: 1,
            },
        ],
    };

    // Opciones del gráfico de barras
    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Ocultar la leyenda
            },
            title: {
                display: true,
                text: `Totales por Edad - Gestión ${gestion}`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Edad', // Título del eje X
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

    return (
        <Row>
            <Col xs={10} md={5} xl={5}>
                <Card>
                    <CardHeader>
                        Personal Docente por Sexo, según Edad.
                        {/* Dropdown para seleccionar la gestión */}
                        <Form.Control as="select" value={gestion} onChange={(e) => setGestion(e.target.value)}>
                            {gestiones.map((g, index) => (
                                <option key={index} value={g.gestion}>{g.gestion}</option>
                            ))}
                        </Form.Control>

                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Edad</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.length > 0 ? (
                                datos.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.edad}</td>
                                        <td>{item.total_m}</td>
                                        <td>{item.total_f}</td>
                                        <td>{item.total}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No hay datos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{totalM}</th>
                                <th>{totalF}</th>
                                <th>{totalGeneral}</th>
                            </tr>
                        </tfoot>

                    </Table>
                    {/* Botón para descargar en Excel */}
                    <Button variant="primary" onClick={descargarExcel}>
                        Descargar Excel
                    </Button>
                </Card>
            </Col>
            <Col xs={14} md={7} xl={7}>
                <Card>
                    <CardHeader>Gráfica de Barras: Distribución por Edad</CardHeader>
                    <div style={{ padding: '20px' }}>
                        <Bar ref={chartRef} data={barChartData} options={barChartOptions} />
                    </div>
                    {/* Botón para descargar la imagen del gráfico */}
                    <Button variant="primary" onClick={descargarImagen}>
                        Descargar Imagen
                    </Button>
                </Card>
            </Col>
        </Row>
    );
}

export default SexoEdad;