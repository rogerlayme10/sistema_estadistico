import React, { useEffect, useState} from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import config from '../../config';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Etiqueta numérica

// Importar y registrar Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ChartDataLabels); // Etiqueta numérica

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(''); // Estado para el año seleccionado
  const [availableYears, setAvailableYears] = useState([]); // Años disponibles para filtrar

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada a la API para obtener los datos del backend
        const response = await fetch(`${config.API_URL}/dashboard-data`);
        const result = await response.json();
        setData(result); // Guardar los datos en el estado
        setAvailableYears(result.gestiones.map(item => item.gestion)); // Extraer años disponibles
        setSelectedYear(result.gestiones[result.gestiones.length - 1]?.gestion || ''); // Seleccionar el último año como predeterminado
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;

    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        // Llamada a la API con el año seleccionado
        const response = await fetch(`${config.API_URL}/dashboard-data?gestion=${selectedYear}`);
        const result = await response.json();
        setData(result); // Actualizar los datos con el filtro aplicado
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [selectedYear]); // Este efecto se ejecuta cuando cambia el año seleccionado

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Cargando datos...</div>;
  }

  // Si no hay datos, mostrar un mensaje de error
  if (!data) {
    return <div>No se pudieron cargar los datos.</div>;
  }

  // Datos para el gráfico de barras
  const barData = {
    labels: ['👨‍💼 Administrativos', '👩‍🏫 Docentes', '👩‍🎓 Estudiantes'], // Emojis como etiquetas
    datasets: [
      {
        label: 'Hombres',
        backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color para los hombres
        data: [
          data.total_administrativos.find(item => item.sexo === 'M')?.total || 0,
          data.total_docentes.find(item => item.sexo === 'M')?.total || 0,
          data.total_estudiantes.m || 0, // Total de estudiantes masculinos
        ],
      },
      {
        label: 'Mujeres',
        backgroundColor: 'rgba(255, 99, 132, 0.7)', // Color para las mujeres
        data: [
          data.total_administrativos.find(item => item.sexo === 'F')?.total || 0,
          data.total_docentes.find(item => item.sexo === 'F')?.total || 0,
          data.total_estudiantes.f || 0, // Total de estudiantes femeninos
        ],
      },
    ],
  };

  // Datos para el gráfico de línea
  const lineData = {
    labels: data.estudiantes_por_gestion.map(item => item.gestion),
    datasets: [
      {
        label: 'Total Estudiantes',
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo
        borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
        data: data.estudiantes_por_gestion.map(item => item.total), // Datos de estudiantes por gestión
      },
    ],
  };

  // Opciones de configuración del gráfico barras
  
  //grafico line
  const chartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true, // Mostrar números
        color: 'rgba(0, 0, 0, 0.8)', // Color más oscuro para las etiquetas (puedes ajustarlo según lo desees)
        anchor: 'end', // Anclar las etiquetas al extremo superior de las barras
        align: 'top',  // Alinear las etiquetas hacia la parte superior de las barras
        offset: 5,     // Ajusta la distancia de la etiqueta desde la barra (puedes modificar el valor según lo necesario)
      },
    },
  };

  return (
    <div>
      {/* Filtro de año */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option value="">Seleccione un año</option>
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Tarjetas resumen */}
      <Row className="gy-4">
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h5>Total Estudiantes</h5>
              <h3>{data.total_estudiantes ? data.total_estudiantes.total : 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h5>Total Docentes</h5>
              <h3>{data.total_docentes.reduce((total, item) => total + item.total, 0)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h5>Total Administrativos</h5>
              <h3>{data.total_administrativos.reduce((total, item) => total + item.total, 0)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráficos */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Histograma de Frecuencias por Género</h5>
              <Bar data={barData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Cronología de Estudiantes</h5>
              <Line data={lineData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
