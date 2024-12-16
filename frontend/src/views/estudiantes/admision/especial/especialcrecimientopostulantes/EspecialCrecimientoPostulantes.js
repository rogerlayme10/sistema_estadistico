import React, { useEffect, useState } from "react";
import { Card, CardHeader, Table, Row, Col, Button } from 'react-bootstrap';
import config from '../../../../../config';
import * as XLSX from 'xlsx'; // Para exportar la tabla a Excel

const EspecialCrecimientoPostulantes = () => {
    const [data, setData] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [tasas, setTasas] = useState({});

    // Obtener los datos de la API
    const fetchData = async () => {
        try {
            const response = await fetch(`${config.API_URL}/especial-tasa-crecimiento-postulantes`);
            const result = await response.json();
            setGestiones(result.gestiones);
            setData(result.datos);
            setTasas(result.tasas);
        } catch (error) {
            console.error("Error al obtener los datos: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Función para calcular la tasa de crecimiento
    const calculateGrowthRate = (current, previous) => {
        if (previous === 0 || previous === null || current === null) return null;
        return (((current - previous) / previous) * 100).toFixed(2);
    };

    // Función para descargar la tabla en Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            data.map((row) => ({
                Carrera: row.programa,
                ...gestiones.reduce((acc, gestion) => {
                    acc[`Total ${gestion}`] = row[`total_${gestion}`];
                    return acc;
                }, {}),
                ...Object.keys(tasas).reduce((acc, periodo) => {
                    acc[`Tasa ${periodo}`] = tasas[periodo][row.programa] || "";
                    return acc;
                }, {})
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tasa Crecimiento");
        XLSX.writeFile(workbook, "tasa_crecimiento_postulantes_psa.xlsx");
    };

    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <CardHeader>Tasa de Crecimiento de Postulantes por Admision Especial y Gestión, según Carrera</CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Carrera</th>
                                <th colSpan={gestiones.length} className="text-center">Gestión</th>
                                <th colSpan={Object.keys(tasas).length} className="text-center">Tasa Crecimiento</th>
                            </tr>
                            <tr>
                                {gestiones.map((gestion) => (
                                    <th key={gestion}>{gestion}</th>
                                ))}
                                {Object.keys(tasas).map((periodo) => (
                                    <th key={periodo}> {periodo}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.programa}>
                                    <td>{row.programa}</td>
                                    {gestiones.map((gestion) => (
                                        <td key={gestion}>{row[`total_${gestion}`]}</td>
                                    ))}
                                    {Object.keys(tasas).map((periodo) => (
                                        <td key={periodo}>
                                            {tasas[periodo][data.indexOf(row)] != null
                                                ? tasas[periodo][data.indexOf(row)].toFixed(2) + "%"
                                                : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                {/* Calcular el total por columna de gestiones */}
                                {gestiones.map((gestion) => (
                                    <th key={gestion}>
                                        {data.reduce((sum, row) => sum + (row[`total_${gestion}`] || 0), 0)}
                                    </th>
                                ))}
                                {/* Calcular la tasa de crecimiento de los totales */}
                                {Object.keys(tasas).map((periodo) => {
                                    const [start, end] = periodo.split('-');
                                    const totalEnd = data.reduce((sum, row) => sum + (row[`total_${end}`] || 0), 0);
                                    const totalStart = data.reduce((sum, row) => sum + (row[`total_${start}`] || 0), 0);
                                    const growthRate = calculateGrowthRate(totalEnd, totalStart);
                                    return (
                                        <th key={periodo}>
                                            {growthRate != null ? growthRate + "%" : ""}
                                        </th>
                                    );
                                })}
                            </tr>
                        </tfoot>
                    </Table>
                    <Button onClick={downloadExcel} variant="primary">Descargar Tabla en Excel</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default EspecialCrecimientoPostulantes;
