import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Table, Row, Col, FormSelect, Button } from 'react-bootstrap';

import config from '../../../config';
import '../../../style/textgrafic/ChartOptions'; // Asegúrate de importar la configuración
import * as XLSX from 'xlsx';


const UnidadTipoContrato = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [gestion, setGestion] = useState(2023); // Valor predeterminado para la gestión

    useEffect(() => {
        fetch(`${config.API_URL}/administrativos-unidadcontrato?gestion=${gestion}`)
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
            'Unidad': item.unidad,
            'Personal Permanente': item.total_permanente,
            'Personal No Permanente Contrato Fijo': item.total_nopermanente,
            'Jornalero': item.total_jornalero,
            'Personal de Granjas': item.total_granjas,
            'Total': item.total
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Grado Académico Alcanzado');
        XLSX.writeFile(wb, 'grado_academico.xlsx');
    };


    return (
        <Row>
            <Col >
                <Card>
                    <CardHeader>
                        Personal administartivos por unidad segun tipo Contrato
                        <FormSelect value={gestion} onChange={handleFilterChange}>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </FormSelect>
                        
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Unidad</th>
                                <th>Permanente</th>
                                <th>No Permanente</th>
                                <th>Jornalero</th>
                                <th>Personal de Grajas</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.unidad}</td>
                                    <td>{item.total_permanente}</td>
                                    <td>{item.total_nopermanente}</td>
                                    <td>{item.total_jornalero}</td>
                                    <td>{item.total_granjas}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((sum, d) => sum + d.total_permanente, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_nopermanente, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_jornalero, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_granjas, 0)}</th>
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

export default UnidadTipoContrato;