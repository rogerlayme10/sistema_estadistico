import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, Table, FormSelect, Row, Col, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';
import config from '../../../config';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const CargoDedicacionSexoC = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [gestion, setGestion] = useState(2023); // Valor predeterminado para la gestión
  const chartRef = useRef(null);

  useEffect(() => {
    fetch(`${config.API_URL}/docentes-cargo-c?gestion=${gestion}`)
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

  const exportTableToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(item => ({
      Cargo: item.cargo,
      M: item.total_masculino,
      F: item.total_femenino,
      Total: item.total,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Docentes');
    XLSX.writeFile(wb, `Docentes_DedicacionSexoCategoria${gestion}.xlsx`);
  };

  const exportChartAsImage = () => {
    const chart = chartRef.current;
    if (chart) {
      const url = chart.toBase64Image();
      saveAs(url, `Grafico_DedicacionSexoCategoria${gestion}.png`);
    }
  };

  const chartData = {
    labels: data.map(item => item.cargo),
    datasets: [
      {
        label: 'Masculino',
        data: data.map(item => item.total_masculino),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Femenino',
        data: data.map(item => item.total_femenino),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total',
        data: data.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categoria',
      },
        stacked: false,
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
      <Col xs={12} md={6} xl={5}>
        <Card>
          <CardHeader>Personal Docente por Sexo, según Categoría.</CardHeader>

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
                  <td>{item.categoria}</td>
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

      <Col xs={12} md={6} xl={7}>
        <Card>
          <CardHeader>Gráfico de Barras: Distribución por Categoría</CardHeader>
          <div style={{ height: '400px' }}>
            <Bar ref={chartRef} data={chartData} options={chartOptions} />
          </div>
          <Button onClick={exportChartAsImage} variant="primary" className="mt-2">
            Descargar Gráfico como Imagen
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default CargoDedicacionSexoC;
