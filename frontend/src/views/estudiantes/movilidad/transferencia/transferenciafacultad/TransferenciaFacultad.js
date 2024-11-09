import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2'; // Cambiamos Bar por Pie
import { saveAs } from 'file-saver'; // Importar file-saver
import * as XLSX from 'xlsx'; // Importar xlsx para exportar a Excel
import config from '../../../../../config';
import 'chart.js/auto'; // Para registrar todos los elementos de Chart.js

const TransferenciaFacultad = () => {
  const [data, setData] = useState([]);
  const [gestion, setGestion] = useState('');
  const [gestiones, setGestiones] = useState([]);
  const chartRef = useRef(null); // Referencia para acceder al gráfico

  // Función para obtener los datos filtrados por año (gestión) o las gestiones disponibles
  const fetchData = async (year = null) => {
    try {
      const url = year ? `${config.API_URL}/transferencia-facultad/${year}` : `${config.API_URL}/transferencia-facultad`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result); // Verifica los datos recibidos
      if (year) {
        setData(result);
      } else {
        setGestiones(result);
        if (result.length > 0) {
          setGestion(result[0].gestion);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

  // Ordenar los datos por 'facultad' alfabéticamente
  const sortedData = [...data].sort((a, b) => a.facultad.localeCompare(b.facultad));

  // Preparar los datos para el gráfico de pie
  const pieData = {
    labels: sortedData.map(row => row.facultad),  // Etiquetas de cada facultad
    datasets: [
      {
        label: 'Total',
        data: sortedData.map(row => row.total), // Total combinado
        backgroundColor: sortedData.map((row, index) => {
          // Generar colores dinámicos o estáticos
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
          return colors[index % colors.length];
        }),
        hoverOffset: 4
      }
    ]
  };

  // Función para descargar la tabla en Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedData.map(row => ({
      facultad: row.facultad,
      Masculino: row.total_m,
      Femenino: row.total_f,
      Total: row.total
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "becas");
    XLSX.writeFile(wb, `Transferencia_Facultad${gestion}.xlsx`);
  };

  // Función para descargar el gráfico como imagen
  const downloadChartImage = () => {
    const chart = chartRef.current;
    const base64Image = chart.toBase64Image(); // Convertir gráfico a imagen en base64
    saveAs(base64Image, `Transferencia_Facultad${gestion}.png`); // Guardar imagen como archivo PNG
  };

  // Opciones del gráfico de pie
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`; // Mostrar el valor en el tooltip
          }
        }
      }
    }
  };

  return (
    <Row>
      <Col xs={12} md={5} xl={5}>
        <Card>
          <CardHeader>
            Transferencia, facultad segun sexo
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
              {sortedData.map((row, index) => (
                <tr key={index}>
                  <td>{row.facultad}</td>
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
      <Col xs={14} md={7} xl={7}>
        <Card>
          <CardHeader>Gráfica</CardHeader>
          <div style={{ height: '400px' }}>
            <Pie ref={chartRef} data={pieData} options={chartOptions} /> {/* Cambiamos Bar por Pie */}
          </div>
          <Button variant="primary" onClick={downloadChartImage} className="mt-2">
            Descargar Gráfico en Imagen
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default TransferenciaFacultad;

