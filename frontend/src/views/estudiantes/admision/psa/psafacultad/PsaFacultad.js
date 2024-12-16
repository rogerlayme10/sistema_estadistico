import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from "react-bootstrap";
import config from "../../../../../config";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2"; // Cambié Doughnut por Bar
import { saveAs } from "file-saver";
import {
  Chart as ChartJS,
  BarElement,  // Para gráficos de barras
  CategoryScale, // Escala para las categorías
  LinearScale,   // Escala para valores numéricos
  Tooltip,
  Legend
} from "chart.js";

// Registrar los componentes necesarios para Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PsaFacultad = () => {
  const [facultades, setFacultades] = useState([]);
  const [gestiones, setGestiones] = useState([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("2023");
  const chartRef = useRef();

  const fetchData = async (gestion = "2023") => {
    try {
      const response = await fetch(`${config.API_URL}/psa-facultad?gestion=${gestion}`);
      const data = await response.json();
      const facultadesOrdenadas = data.facultades.sort((a, b) => a.facultad.localeCompare(b.facultad));
      setFacultades(facultadesOrdenadas);
      setGestiones(data.gestiones);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGestionChange = (event) => {
    const gestion = event.target.value;
    setGestionSeleccionada(gestion);
    fetchData(gestion);
  };

  // Función para exportar la tabla a Excel, incluyendo el total
  const exportToExcel = () => {
    const data = facultades.map(facultad => ({
      Facultad: facultad.facultad,
      Inscritos: facultad.inscritos,
      Aceptados: facultad.aceptados
    }));

    const totalInscritos = facultades.reduce((total, item) => total + item.inscritos, 0);
    const totalAceptados = facultades.reduce((total, item) => total + item.aceptados, 0);

    data.push({
      Facultad: "Total",
      Inscritos: totalInscritos,
      Aceptados: totalAceptados
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Facultades");
    XLSX.writeFile(workbook, "psa_facultades.xlsx");
  };

  // Datos para el gráfico de barras
  const chartData = {
    labels: facultades.map(facultad => facultad.facultad), // Etiquetas con nombres de facultades
    datasets: [
      {
        label: "Inscritos",
        data: facultades.map(facultad => facultad.inscritos),
        backgroundColor: "rgba(54, 162, 235, 0.6)" // Color para inscritos
      },
      {
        label: "Aceptados",
        data: facultades.map(facultad => facultad.aceptados),
        backgroundColor: "rgba(255, 99, 132, 0.6)" // Color para aceptados
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
            text: `Totales por Facultad`,
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
  } ;

  // Función para descargar el gráfico como imagen
  const downloadChartImage = () => {
    const chart = chartRef.current;
    if (chart) {
      const url = chart.toBase64Image();
      saveAs(url, "grafico_barras.png");
    }
  };

  return (
    <Row>
      <Col xs={12} md={5} xl={5}>
        <Card>
          <CardHeader>
            P.S.A por Postulantes, según Facultad.
            <Form.Select value={gestionSeleccionada} onChange={handleGestionChange} disabled={gestiones.length === 0}>
              <option value="" disabled>Selecione Una gestion</option>
              {gestiones.map((gestion) => (
                <option key={gestion.gestion} value={gestion.gestion}>
                  {gestion.gestion}
                </option>
              ))}
            </Form.Select>
          </CardHeader>
          <Table bordered>
            <thead>
              <tr>
                <th rowSpan="2">Facultad</th>
                <th colSpan="2" className="text-center">Postulantes</th>
              </tr>
              <tr>
                <th>Inscritos</th>
                <th>Aceptados</th>
              </tr>
            </thead>
            <tbody>
              {facultades.map((facultad, index) => (
                <tr key={index}>
                  <td>{facultad.facultad}</td>
                  <td>{facultad.inscritos}</td>
                  <td>{facultad.aceptados}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{facultades.reduce((total, item) => total + item.inscritos, 0)}</th>
                <th>{facultades.reduce((total, item) => total + item.aceptados, 0)}</th>
              </tr>
            </tfoot>
          </Table>
          <Button onClick={exportToExcel}>Descargar Excel</Button>
        </Card>
      </Col>
      <Col xs={12} md={7} xl={7}>
        <Card>
          <CardHeader>Gráfico de Barras: Distribución por Facultad</CardHeader>
          <div >
            <Bar data={chartData} ref={chartRef} options={barChartOptions} />
          </div>
          <Button onClick={downloadChartImage}>Descargar Imagen</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default PsaFacultad;
