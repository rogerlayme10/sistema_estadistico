import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button, CardText } from 'react-bootstrap';
import config from '../../../config';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const CargaHorariaCargo = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2023); // Valor por defecto para el año 2023

    // Fetch data when the component is mounted or when selectedYear changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.API_URL}/docentes-cargahoraria?gestion=${selectedYear}`);
                const result = await response.json();
                setData(result.datos || []);

                // Verificamos que los años estén disponibles correctamente
                const sortedYears = (result.years || []).sort((a, b) => b - a); // Orden descendente
                setYears(sortedYears);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    // Función para calcular los totales de las columnas
    const calculateTotals = (column) => {
        return data.reduce((total, item) => total + (item[column] || 0), 0);
    };

    const renderTable = () => {
        return data.map((item, index) => (
            <tr key={index}>
                <td>{item.facultad}</td>
                <td>{item.catedratico_tc || 0}</td>
                <td>{item.catedratico_th || 0}</td>
                <td>{item.adjunto_tc || 0}</td>
                <td>{item.adjunto_th || 0}</td>
                <td>{item.asistente_tc || 0}</td>
                <td>{item.asistente_th || 0}</td>
                <td>{item.asistente_ai_tc || 0}</td>
                <td>{item.asistente_ai_th || 0}</td>
                <td>{(item.total_tc || 0) + (item.total_th || 0)}</td>
            </tr>
        ));
    };

    const renderTotals = () => {
        return (
            <tr>
                <th>Total</th>
                <th>{calculateTotals('catedratico_tc')}</th>
                <th>{calculateTotals('catedratico_th')}</th>
                <th>{calculateTotals('adjunto_tc')}</th>
                <th>{calculateTotals('adjunto_th')}</th>
                <th>{calculateTotals('asistente_tc')}</th>
                <th>{calculateTotals('asistente_th')}</th>
                <th>{calculateTotals('asistente_ai_tc')}</th>
                <th>{calculateTotals('asistente_ai_th')}</th>
                <th>{calculateTotals('total_tc') + calculateTotals('total_th')}</th>
            </tr>
        );
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
            Facultad: item.facultad,
            'Catedrático TC': item.catedratico_tc || 0,
            'Catedrático TH': item.catedratico_th || 0,
            'Adjunto TC': item.adjunto_tc || 0,
            'Adjunto TH': item.adjunto_th || 0,
            'Asistente TC': item.asistente_tc || 0,
            'Asistente TH': item.asistente_th || 0,
            'Asistente A.I TC': item.asistente_ai_tc || 0,
            'Asistente A.I TH': item.asistente_ai_th || 0,
            Total: (item.total_tc || 0) + (item.total_th || 0),
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Carga Horaria');
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Docentes_cargo_carga_horaria.xlsx');
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>Personal Docente por Categoria y Carga Horaria,según Facultad.</CardHeader>
                    <Form.Select aria-label="Seleccionar Año" onChange={handleYearChange} value={selectedYear}>
                        <option value="" disabled>Seleccionar Año</option> {/* Opción deshabilitada */}
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Form.Select>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Facultad</th>
                                <th colSpan="2" className="text-center">Catedrático</th>
                                <th colSpan="2" className="text-center">Adjunto</th>
                                <th colSpan="2" className="text-center">Asistente</th>
                                <th colSpan="2" className="text-center">Asistente A.I</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>TC</th>
                                <th>TH</th>
                                <th>TC</th>
                                <th>TH</th>
                                <th>TC</th>
                                <th>TH</th>
                                <th>TC</th>
                                <th>TH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable()}
                        </tbody>
                        <tfoot>
                            {renderTotals()}
                        </tfoot>
                    </Table>
                    <CardText style={{paddingLeft: '10px'}}>Donde: TC=tiempo Completo y TH:Tiempo Horario</CardText>
                    <Button onClick={exportToExcel}>Descargar en Excel</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default CargaHorariaCargo;
