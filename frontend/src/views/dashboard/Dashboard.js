import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { Row, Card, Col, CardHeader, CardBody,Image } from 'react-bootstrap'





const Dashboard = () => {
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [selectedFacultad, setSelectedFacultad] = useState('');
  const [selectedPrograma, setSelectedPrograma] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener facultades
    fetch(`${config.API_URL}/facultades`)
      .then(response => response.json())
      .then(data => setFacultades(data));
  }, []);

  useEffect(() => {
    if (selectedFacultad) {
      // Obtener programas por facultad
      fetch(`${config.API_URL}/facultades/${selectedFacultad}/programas`)
        .then(response => response.json())
        .then(data => {
          setProgramas(data);
          setSelectedPrograma(''); // Reiniciar el programa seleccionado
        });
    } else {
      setProgramas([]); // Limpiar programas si no hay facultad seleccionada
    }
  }, [selectedFacultad]);

  const handleViewDetails = () => {
    if (selectedPrograma) {
      navigate(`/programas/${selectedPrograma}`);
    }
  };


  return (
  
    <>
      <WidgetsDropdown className="mb-4" />
      <Row>
        <Col xs={12} md={6} xl={6}>
          <Card>
            <CardHeader>UATF</CardHeader>
            <CardBody>
              <div>
                <label>Facultad</label>
                <select
                  className="form-select"
                  value={selectedFacultad}
                  onChange={(e) => setSelectedFacultad(e.target.value)}
                >
                  <option value="">Seleccione una facultad</option>
                  {facultades.map(facultad => (
                    <option key={facultad.cod_fac} value={facultad.cod_fac}>
                      {facultad.facultad}
                    </option>
                  ))}
                </select>

                <label>Programas</label>
                <select
                  className="form-select"
                  value={selectedPrograma}
                  onChange={(e) => setSelectedPrograma(e.target.value)}
                  disabled={!selectedFacultad} // Deshabilitar si no hay facultad seleccionada
                >
                  <option value="">Seleccione un programa</option>
                  {programas.map(programa => (
                    <option key={programa.id_programa} value={programa.id_programa}>
                      {programa.programa}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-primary mt-3"
                  onClick={handleViewDetails}
                  disabled={!selectedPrograma} // Deshabilitar si no hay programa seleccionado
                >
                  Ver Detalles del Programa
                </button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={6} xl={6}>
          <Card>
            <CardHeader>UATF</CardHeader>
             
          </Card>
        </Col>


      </Row>
    </>

  )
}

export default Dashboard
