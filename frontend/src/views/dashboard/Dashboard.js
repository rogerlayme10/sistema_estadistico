import React from 'react';
import { Row, Card, Col, CardHeader, CardBody,Image } from 'react-bootstrap'
import principal from '../../../src/assets/images/uatf.webp'

const Dashboard = () => {

  return (
    <Row>  
    <Col xs={12}>  
      <Card>  
        <CardHeader>UNIVERSIDAD AUTONOMA TOMAS FRIAS </CardHeader>  
        <CardBody className="text-center"> {/* Centra el contenido */}  
          {/* Usa la imagen importada aquí */}  
          <Image   
            src={principal}   
            alt="Descripción de la imagen"   
            fluid   
            style={{ maxWidth: '450px', height: '450px' }} // Ajusta el tamaño de la imagen  
          />  
        </CardBody>  
      </Card>  
    </Col>  
  </Row>  
    

  )
}

export default Dashboard
