import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from "react-bootstrap";
import config from "../../../../../config";
import * as XLSX from "xlsx";
import { Doughnut } from "react-chartjs-2";  // Cambiado a Doughnut
import { saveAs } from "file-saver";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

// Registrar los componentes necesarios para Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PsaCarrera = () => {
  const [programas, setProgramas] = useState([]);
  const [gestiones, setGestiones] = useState([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("2023");
  const chartRef = useRef();

  const fetchData = async (gestion = "2023") => {
    try {
      const response = await fetch(`${config.API_URL}/psa-carrera?gestion=${gestion}`);
      const data = await response.json();
      setProgramas(data.programas); // Asigna directamente sin ordenar
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
    const data = programas.map(programa => ({
      Programa: programa.programa,
      Inscritos: programa.inscritos,
      Aceptados: programa.aceptados
    }));

    const totalInscritos = programas.reduce((total, item) => total + item.inscritos, 0);
    const totalAceptados = programas.reduce((total, item) => total + item.aceptados, 0);

    data.push({
      Programa: "Total",
      Inscritos: totalInscritos,
      Aceptados: totalAceptados
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Programas");
    XLSX.writeFile(workbook, "psa_programas.xlsx");
  };

  // Datos para el gráfico Doughnut
  const chartData = {
    labels: ["Inscritos", "Aceptados"],
    datasets: [
      {
        data: [
          programas.reduce((total, item) => total + item.inscritos, 0),
          programas.reduce((total, item) => total + item.aceptados, 0)
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Color para Inscritos
          "rgba(255, 99, 132, 0.6)"  // Color para Aceptados
        ]
      }
    ]
  };

  // Función para descargar el gráfico como imagen
  const downloadChartImage = () => {
    const chart = chartRef.current;
    if (chart) {
      const url = chart.toBase64Image();
      saveAs(url, "grafico_doughnut.png");  // Cambiar el nombre del archivo
    }
  };

  return (
    <Row>
      <Col xs={12} md={6} xl={6}>
        <Card>
          <CardHeader>
            Postulantes y admitidos al Examen de Suficiencia Académica por carrera
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
              {programas.map((programa, index) => (
                <tr key={index}>
                  <td>{programa.programa}</td>
                  <td>{programa.inscritos}</td>
                  <td>{programa.aceptados}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{programas.reduce((total, item) => total + item.inscritos, 0)}</th>
                <th>{programas.reduce((total, item) => total + item.aceptados, 0)}</th>
              </tr>
            </tfoot>
          </Table>
          <Button onClick={exportToExcel}>Descargar Excel</Button>
        </Card>
      </Col>
      <Col xs={12} md={6} xl={6}>
        <Card>
          <CardHeader>Gráfico Doughnut</CardHeader>
          <div style={{ height: '400px', width: '400px', margin: 'auto' }}>
            <Doughnut data={chartData} ref={chartRef} /> {/* Cambiado a Doughnut */}
          </div>
          <Button onClick={downloadChartImage}>Descargar Imagen</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default PsaCarrera;
