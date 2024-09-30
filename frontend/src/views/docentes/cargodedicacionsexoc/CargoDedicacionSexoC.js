import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, Table, FormSelect, Row, Col, Button, CardBody } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
//import ChartOptions from '../../../style/textgrafic/ChartOptions';
import config from '../../../config';
import '../../../style/textgrafic/grafic.css';
import { specificChartOptions } from '../../../style/textgrafic/ChartOptions';

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

  // Preparar datos para el gráfico de barras apiladas
  const chartData = {
    labels: data.map(item => item.cargo),
    datasets: [
      {
        label: 'M',
        data: data.map(item => item.total_masculino),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'F',
        data: data.map(item => item.total_femenino),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Total',
        data: data.map(item => item.total_masculino + item.total_femenino),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
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
    XLSX.writeFile(wb, `Docentes_${gestion}.xlsx`);
  };

  // Descargar el gráfico como imagen
  const downloadChartAsImage = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.getElementsByTagName('canvas')[0];
      if (canvas) {
        html2canvas(canvas).then((canvas) => {
          canvas.toBlob((blob) => {
            saveAs(blob, `Grafico_Cargos_${gestion}.png`);
          });
        });
      } else {
        console.error('No se pudo encontrar el canvas del gráfico.');
      }
    } else {
      console.error('El gráfico no está disponible.');
    }
  };

  return (
    <Row>
      <Col xs={12} md={6} xl={5}>
        <Card >
          <CardHeader>Personal docente segun categoria, segun cargo y sexo</CardHeader>

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

      <Col xs={12} md={6} xl={7}>
        <Card >
          <CardHeader>Gráfico </CardHeader>
          <CardBody>
            <div className="chart-container" ref={chartRef}>
              <Bar data={chartData} options={specificChartOptions} />
            </div>


          </CardBody>
          <Button onClick={downloadChartAsImage} variant="primary" className="mt-2">
            Descargar Gráfico como Imagen
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default CargoDedicacionSexoC;