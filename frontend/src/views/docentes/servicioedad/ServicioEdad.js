import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';
import config from '../../../config';  // Archivo de configuración de la URL base
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import '../../../style/servicio.css';  // Archivo CSS

const ServicioEdad = () => {
    const [docentes, setDocentes] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [gestionSeleccionada, setGestionSeleccionada] = useState('2023');  // Gestión por defecto
    const [permanencias, setPermanencias] = useState([]);

    // Función para obtener los datos desde la API
    const fetchDocentes = (gestion) => {
        fetch(`${config.API_URL}/docentes-permanencia/${gestion}`)
            .then(response => response.json())
            .then(data => {
                setDocentes(data.docentes || []);  // Actualizar la lista de docentes
                setGestiones(data.gestiones || []);  // Actualizar la lista de gestiones

                // Extraer las permanencias desde los datos de los docentes
                const permanencias = Array.from(new Set(
                    data.docentes.flatMap(docente => Object.keys(docente.permanencias || {}))
                )).sort((a, b) => a - b);
                setPermanencias(permanencias);  // Actualizar las permanencias
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchDocentes(gestionSeleccionada);  // Llama a la API cuando el componente se monta o cambia la gestión
    }, [gestionSeleccionada]);

    // Manejar el cambio de gestión
    const handleGestionChange = (e) => {
        setGestionSeleccionada(e.target.value);
    };

    // Función para exportar los datos a Excel
    const exportToExcel = () => {
        // Crear los datos de la hoja de cálculo
        const excelData = docentes.map(docente => ({
            Edad: docente.edad,
            ...permanencias.reduce((acc, permanencia) => {
                acc[permanencia] = docente.permanencias[permanencia] || '';  // Llenar cada permanencia
                return acc;
            }, {}),
            Total: docente.total  // Agregar el total
        }));

        // Crear la hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Crear un libro de trabajo y añadir la hoja
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Datos Docentes");

        // Convertir el libro a un archivo .xlsx
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), "docentes.xlsx");
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>Personal docente por años de servicio, según edad</CardHeader>
                    <Form.Control as="select" value={gestionSeleccionada} onChange={handleGestionChange}>
                        {gestiones.map((gestion, index) => (
                            <option key={index} value={gestion}>
                                {gestion}
                            </option>
                        ))}
                    </Form.Control>
                    <Button variant="primary" onClick={exportToExcel} className="mt-2">Descargar Excel</Button>
                    <Table bordered size="sm" className="table-md compact-table">
                        <thead>
                            <tr>
                                <th rowSpan="2">Edad</th>
                                <th colSpan={permanencias.length} className="text-center">Permanencia</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                {permanencias.map((permanencia, index) => (
                                    <th key={index} className="permanencia-column">{permanencia}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {docentes.map((docente, index) => (
                                <tr key={index}>
                                    <td>{docente.edad}</td>
                                    {permanencias.map((permanencia, i) => (
                                        <td key={i} className="text-center permanencia-column">
                                            {docente.permanencias[permanencia] || ''}
                                        </td>
                                    ))}
                                    <td>{docente.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                {permanencias.map((permanencia, index) => (
                                    <th key={index} className="text-center permanencia-column">
                                        {docentes.reduce((acc, docente) => acc + (docente.permanencias[permanencia] || 0), 0) || ''}
                                    </th>
                                ))}
                                <th>{docentes.reduce((acc, docente) => acc + docente.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                </Card>
            </Col>
        </Row>
    );
};

export default ServicioEdad;




