import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Table, Row, Col, FormSelect, Button } from 'react-bootstrap';

import config from '../../../config';
import '../../../style/textgrafic/ChartOptions'; // Asegúrate de importar la configuración
import * as XLSX from 'xlsx';


const ProfesionNivelAcademico = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [gestion, setGestion] = useState(2023); // Valor predeterminado para la gestión

    useEffect(() => {
        fetch(`${config.API_URL}/docentes-profesionnivelacad?gestion=${gestion}`)
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
            'Profesion': item.titulo_acad,
            'Doctorado': item.total_doctorado,
            'Mestria': item.total_maestria,
            'Especialidad': item.total_especialidad,
            'Diplomado': item.total_diplomado,
            'Licenciatura': item.total_licenciatura,
            'Total': item.total
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Grado Académico Alcanzado');
        XLSX.writeFile(wb, 'grado_academico.xlsx');
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        Personal docente por profesión, según nivel académico
                        <FormSelect value={gestion} onChange={handleFilterChange}>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </FormSelect>

                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Profesion</th>
                                <th colSpan="5" className="text-center">Nivel Academico</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>Doctorado</th>
                                <th>Maestria</th>
                                <th>Especialidad</th>
                                <th>Diplomado</th>
                                <th>Licenciatura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.titulo_acad}</td>
                                    <td>{item.total_doctorado}</td>
                                    <td>{item.total_maestria}</td>
                                    <td>{item.total_especialidad}</td>
                                    <td>{item.total_diplomado}</td>
                                    <td>{item.total_licenciatura}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((sum, d) => sum + d.total_doctorado, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_maestria, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_especialidad, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_diplomado, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_licenciatura, 0)}</th>
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

export default ProfesionNivelAcademico;