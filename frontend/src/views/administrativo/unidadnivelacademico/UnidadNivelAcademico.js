import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Table, Row, Col, FormSelect, Button } from 'react-bootstrap';

import config from '../../../config';
import '../../../style/textgrafic/ChartOptions'; // Asegúrate de importar la configuración
import * as XLSX from 'xlsx';


const UnidadNivelAcademico = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [gestion, setGestion] = useState(2023); // Valor predeterminado para la gestión

    useEffect(() => {
        fetch(`${config.API_URL}/administrativos-unidadnivelacademico?gestion=${gestion}`)
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
//descargra el excel
    const handleExportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data.map(item => ({
            'Profesion': item.unidad,
            'Diplomado': item.total_diplomado,
            'Licenciatura': item.total_licenciatura,
            'Profesional': item.total_profesional,
            'Egresado': item.total_egresado,
            'tecnico Medio': item.total_tecnicomedio,
            'Estudiante': item.total_estudiante,
            'Publico': item.total_publico,
            'Obrero': item.total_obrero,
            'Total': item.total
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Grado Académico Alcanzado');
        XLSX.writeFile(wb, 'Administrativos_UnidadNivelAcademico.xlsx');
    };


    return (
        <Row>
            <Col >
                <Card>
                    <CardHeader>
                        Personal administartivos por unidad segun nivel academico 
                        <FormSelect value={gestion} onChange={handleFilterChange}>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </FormSelect>
                        
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Unidad</th>
                                <th colSpan="8" className="text-center">Nivel Academico</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>Diplomado</th>
                                <th>Licenciatura</th>
                                <th>Profesional</th>
                                <th>Egresado</th>
                                <th>Tecnico Medio</th>
                                <th>Estudiante</th>
                                <th>EMP. Publico</th>
                                <th>Obrero</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.unidad}</td>
                                    <td>{item.total_diplomado}</td>
                                    <td>{item.total_licenciatura}</td>
                                    <td>{item.total_profesional}</td>
                                    <td>{item.total_egresado}</td>
                                    <td>{item.total_tecnicomedio}</td>
                                    <td>{item.total_estudiante}</td>
                                    <td>{item.total_publico}</td>
                                    <td>{item.total_obrero}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((sum, d) => sum + d.total_diplomado, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_licenciatura, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_profesional, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_egresado, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_tecnicomedio, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_estudiante, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_publico, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_obrero, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button onClick={handleExportToExcel} variant="primary" className="mt-3">Descargar Excel</Button>
                </Card>
            </Col>
            
        </Row>
    );
};

export default UnidadNivelAcademico;