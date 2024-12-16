import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CContainer, CRow, CCol, CButton, CImage } from '@coreui/react'; // Importa componentes de CoreUI
import '../style/principal.css'; // Archivo CSS opcional para estilos personalizados
import profileImage from '../assets/images/stat8.png'; // Cambia a tu imagen

const Principal = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="principal-container vh-100 d-flex align-items-center">
      <CContainer>
        <CRow className="w-100">
          {/* Columna de texto */}
          <CCol md={6} className="d-flex flex-column justify-content-center text-white">
            <h3 className="principal-greeting text-danger mb-2">Bienvenidos</h3>
            <h1 className="principal-title display-4 fw-bold">
              Estadísticas <span className="principal-highlight text-turquoise">Universitarias</span>
            </h1>
            <p className="principal-subtitle fs-5 mb-4">"Una imagen vale más que mil palabras"</p>
            <div className="principal-buttons d-flex flex-column flex-sm-row">
              <CButton color="info" className="me-3 mb-3 mb-sm-0" onClick={handleButtonClick}>
                Estadísticas
              </CButton>
            </div>
          </CCol>

          {/* Columna de imagen */}
          <CCol md={6} className="text-center">
            <CImage
              src={profileImage}
              alt="Profile"
              className="principal-image img-fluid"
              style={{ maxHeight: '400px' }}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Principal;