import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, Table, Form, Row, Col, Button } from "react-bootstrap";
import * as XLSX from "xlsx"; // Importa la biblioteca XLSX
import config from "../../../../../config"; // Asegúrate de importar tu configuración correctamente

const PsaProcedenciaCarrera = () => {
    const [procedencias, setProcedencias] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState(2023);

    const fetchData = useCallback((gestion) => {
        fetch(`${config.API_URL}/pre-procedencia-carrera?gestion=${gestion}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProcedencias(data.procedencias);
                setGestiones(data.gestiones);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetchData(selectedGestion);
    }, [selectedGestion, fetchData]);

    const handleGestionChange = (e) => {
        setSelectedGestion(e.target.value);
    };

    // Función para exportar a Excel
    const exportToExcel = () => {
        // Prepara los datos para la hoja de cálculo
        const data = procedencias.map((item) => ({
            Facultad: item.facultad,
            "Ciudad Potosí": item.ciudad_potosi,
            "Interior Potosí": item.interior_potosi,
            "Ciudad Bolivia": item.ciudad_bolivia,
            "Interior Bolivia": item.interior_bolivia,
            Exterior: item.exterior,
            Total: item.total,
        }));

        // Añadir totales al final
        data.push({
            Facultad: "Total",
            "Ciudad Potosí": procedencias.reduce((sum, item) => sum + item.ciudad_potosi, 0),
            "Interior Potosí": procedencias.reduce((sum, item) => sum + item.interior_potosi, 0),
            "Ciudad Bolivia": procedencias.reduce((sum, item) => sum + item.ciudad_bolivia, 0),
            "Interior Bolivia": procedencias.reduce((sum, item) => sum + item.interior_bolivia, 0),
            Exterior: procedencias.reduce((sum, item) => sum + item.exterior, 0),
            Total: procedencias.reduce((sum, item) => sum + item.total, 0),
        });

        // Crea un libro de trabajo y una hoja
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Agrega la hoja al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, "Procedencia");

        // Genera y descarga el archivo
        XLSX.writeFile(workbook, `procedencia_gestion_${selectedGestion}.xlsx`);
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                    Cursos PRE Universitarios por Procedencia Educativa , según  Carrera.
                        
                    </CardHeader>
                    <Form.Select onChange={handleGestionChange} value={selectedGestion}>
                        {gestiones.map((gestion, index) => (
                            <option key={index} value={gestion.gestion}>
                                Gestión {gestion.gestion}
                            </option>
                        ))}
                    </Form.Select>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Carrera</th>
                                <th colSpan="5" className="text-center">Procedencia Educativas</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>Potosí Ciudad</th>
                                <th>Potosí Provincia</th>
                                <th>Interior Ciudad</th>
                                <th>Interior Provincia</th>
                                <th>Exterior</th>
                            </tr>
                        </thead>
                        <tbody>
                            {procedencias.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.programa}</td>
                                    <td>{item.ciudad_potosi}</td>
                                    <td>{item.interior_potosi}</td>
                                    <td>{item.ciudad_bolivia}</td>
                                    <td>{item.interior_bolivia}</td>
                                    <td>{item.exterior}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{procedencias.reduce((sum, item) => sum + item.ciudad_potosi, 0)}</th>
                                <th>{procedencias.reduce((sum, item) => sum + item.interior_potosi, 0)}</th>
                                <th>{procedencias.reduce((sum, item) => sum + item.ciudad_bolivia, 0)}</th>
                                <th>{procedencias.reduce((sum, item) => sum + item.interior_bolivia, 0)}</th>
                                <th>{procedencias.reduce((sum, item) => sum + item.exterior, 0)}</th>
                                <th>{procedencias.reduce((sum, item) => sum + item.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button 
                            variant="primary" 
                            className="float-end" 
                            onClick={exportToExcel}
                        >
                            Descargar Excel
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};
export default PsaProcedenciaCarrera;
