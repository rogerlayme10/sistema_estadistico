import React, { useEffect, useState } from "react";
import { Card, CardHeader, Table, Row, Col, Form,Button } from 'react-bootstrap';
import config from '../../../../../config'; // Archivo donde tienes tu URL base
import * as XLSX from 'xlsx';

const DepartamentoCarrera = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    // Fetch para obtener los datos según el año seleccionado
    const fetchData = async (year) => {
        const response = await fetch(`${config.API_URL}/carrera-nuevos-departamento/${year}`);
        const result = await response.json();
        setData(result);
    };

    // Fetch para obtener los años disponibles
    const fetchYears = async () => {
        const response = await fetch(`${config.API_URL}/carrera-nuevos-departamento`);
        const result = await response.json();
        setYears(result);
        setSelectedYear(result[0]?.gestion || ""); // Selecciona el primer año por defecto
    };

    useEffect(() => {
        fetchYears();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            fetchData(selectedYear);
        }
    }, [selectedYear]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
        XLSX.writeFile(workbook, `DepartamentoCarreraNuevos_${selectedYear}.xlsx`);
    };

    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <CardHeader>
                        Población Estudiantila Nuevos por Lugar de Nacimiento y Departamento, Según Carrera.
                        <Form.Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="mt-2"
                        >
                            {years.map((year) => (
                                <option key={year.gestion} value={year.gestion}>
                                    {year.gestion}
                                </option>
                            ))}
                        </Form.Select>
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Carrera</th>
                                <th colSpan="10" className="text-center">Departamento</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>La Paz</th>
                                <th>Santa Cruz</th>
                                <th>Cochabamba</th>
                                <th>Potosi</th>
                                <th>Oruro</th>
                                <th>Chuquisaca</th>
                                <th>Tarija</th>
                                <th>Beni</th>
                                <th>Pando</th>
                                <th>Otros</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.programa}>
                                    <td>{row.programa}</td>
                                    <td>{row.la_paz}</td>
                                    <td>{row.santa_cruz}</td>
                                    <td>{row.cochabamba}</td>
                                    <td>{row.potosi}</td>
                                    <td>{row.oruro}</td>
                                    <td>{row.chuquisaca}</td>
                                    <td>{row.tarija}</td>
                                    <td>{row.beni}</td>
                                    <td>{row.pando}</td>
                                    <td>{row.otros}</td>
                                    <td>{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                {/* Aquí sumarías los valores de cada columna */}
                                <th>{data.reduce((sum, row) => sum + row.la_paz, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.santa_cruz, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.cochabamba, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.potosi, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.oruro, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.chuquisaca, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.tarija, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.beni, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.pando, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.otros, 0)}</th>
                                <th>{data.reduce((sum, row) => sum + row.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button onClick={exportToExcel}>Descargar Excel</Button>
                </Card>
            </Col>

        </Row>
    );
};

export default DepartamentoCarrera;