import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from "react-bootstrap";
import config from "../../../../../config";
import * as XLSX from "xlsx";
import { PolarArea } from "react-chartjs-2";
import { saveAs } from "file-saver";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Registrar los componentes necesarios para Chart.js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const EspecialFacultad = () => {
  const [facultades, setFacultades] = useState([]);
  const [gestiones, setGestiones] = useState([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("2023");
  const chartRef = useRef();

  const fetchData = async (gestion = "2023") => {
    try {
      const response = await fetch(`${config.API_URL}/especial-facultad?gestion=${gestion}`);
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
    // Agregar los datos de facultades
    const data = facultades.map(facultad => ({
      Facultad: facultad.facultad,
      Inscritos: facultad.inscritos,
      Aceptados: facultad.aceptados
    }));

    // Calcular el total de inscritos y aceptados
    const totalInscritos = facultades.reduce((total, item) => total + item.inscritos, 0);
    const totalAceptados = facultades.reduce((total, item) => total + item.aceptados, 0);

    // Agregar la fila del total al final de los datos
    data.push({
      Facultad: "Total",
      Inscritos: totalInscritos,
      Aceptados: totalAceptados
    });

    // Convertir los datos en una hoja de Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Facultades");
    XLSX.writeFile(workbook, "pre_facultades.xlsx");
  };

  // Datos para el gráfico Polar Area
  const chartData = {
    labels: ["Inscritos", "Aceptados"],
    datasets: [
      {
        data: [
          facultades.reduce((total, item) => total + item.inscritos, 0),
          facultades.reduce((total, item) => total + item.aceptados, 0)
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
      saveAs(url, "grafico_polar_area.png");
    }
  };

  return (
    <Row>
      <Col xs={12} md={6} xl={6}>
        <Card>
          <CardHeader>
            Postulantes admitidos por Admision Especial segun  Facultad
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
      <Col xs={12} md={6} xl={6}>
        <Card>
          <CardHeader>Gráfico Polar Area</CardHeader>
          <div style={{ height: '400px', width: '400px', margin: 'auto' }}>
          <PolarArea data={chartData} ref={chartRef} />
          </div>
          
          <Button onClick={downloadChartImage}>Descargar Imagen</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default EspecialFacultad;
