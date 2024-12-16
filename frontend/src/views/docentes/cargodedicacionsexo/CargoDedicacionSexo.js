import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, Table, FormSelect, Row, Col, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2'; // Cambiar Doughnut a Bar
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import config from '../../../config';

// Registrar los elementos necesarios para un gráfico de barras
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const CargoDedicacionSexo = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [gestion, setGestion] = useState(2023); // Valor predeterminado para la gestión
  const chartRef = useRef(null); // Referencia para el gráfico

  useEffect(() => {
    fetch(`${config.API_URL}/docentes?gestion=${gestion}`)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data);
        setYears(responseData.years);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [gestion]);

  const handleFilterChange = (event) => {
    setGestion(event.target.value);
  };

  // Descargar la tabla en Excel
  const exportTableToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(item => ({
      Cargo: item.cargo,
      M: item.total_masculino,
      F: item.total_femenino,
      Total: item.total
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Docentes');
    XLSX.writeFile(wb, `Docentes_DedicacionSexo${gestion}.xlsx`);
  };

  // Configuración del gráfico
  const chartData = {
    labels: data.map(item => item.cargo),
    datasets: [
      /*{
        label: 'Total Masculino',
        data: data.map(item => item.total_masculino),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Total Femenino',
        data: data.map(item => item.total_femenino),
        backgroundColor: '#FF6384',
      },*/
      {
        label: 'Total',
        data: data.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)', // Borde de las barras
        borderWidth: 1
      },
    ],
  };

  const downloadChartAsImage = () => {
    const chart = chartRef.current;
    if (chart) {
      const url = chart.toBase64Image();
      const link = document.createElement('a');
      link.href = url;
      link.download = `Grafico_CargoDedicacionSexo_${gestion}.png`;
      link.click();
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Máxima rotación permitida
          minRotation: 50, // Rotación mínima
          autoSkip: true,  // Saltar etiquetas si no caben
          font: {
              size: 10 // Tamaño de la fuente
          }
      },
        title: {
          display: true,
          text: 'Cargos',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <Row>
      <Col xs={12} md={6} xl={6}>
        <Card>
          <CardHeader>Personal Docente de Autoridades por Sexo, según Cargo.</CardHeader>

          <FormSelect value={gestion} onChange={handleFilterChange}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </FormSelect>

          <Table bordered>
            <thead>
              <tr>
                <th rowSpan="2">Cargo</th>
                <th colSpan="2" className="text-center">Sexo</th>
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
                  <td>{item.cargo}</td>
                  <td>{item.total_masculino}</td>
                  <td>{item.total_femenino}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{data.reduce((sum, d) => sum + d.total_masculino, 0)}</th>
                <th>{data.reduce((sum, d) => sum + d.total_femenino, 0)}</th>
                <th>{data.reduce((sum, d) => sum + d.total, 0)}</th>
              </tr>
            </tfoot>
          </Table>
          <Button onClick={exportTableToExcel} variant="primary" className="mt-2">
            Descargar Tabla en Excel
          </Button>
        </Card>
      </Col>
      <Col xs={12} md={6} xl={6}>
        <Card>
          <CardHeader>Gráfico de Barras: Distribución por Cargo</CardHeader>
          <div style={{ height: '400px' }}>
            <Bar ref={chartRef} data={chartData} options={chartOptions} />
          </div>
          <Button onClick={downloadChartAsImage} variant="primary" className="mt-2">
            Descargar Gráfica como Imagen
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default CargoDedicacionSexo;
