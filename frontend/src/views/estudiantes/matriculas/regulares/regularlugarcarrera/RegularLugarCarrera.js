import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, Table, Form, Row, Col, Button } from "react-bootstrap";
import * as XLSX from "xlsx"; // Importa la biblioteca XLSX
import config from "../../../../../config"; // Asegúrate de importar tu configuración correctamente

const RegularLugarCarrera = () => {
    const [lugar, setLugar] = useState([]);
    const [gestiones, setGestiones] = useState([]);
    const [selectedGestion, setSelectedGestion] = useState(2023);

    const fetchData = useCallback((gestion) => {
        fetch(`${config.API_URL}/matriculados-regular-lugar-carrera?gestion=${gestion}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setLugar(data.lugar);
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
        const data = lugar.map((item) => ({
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
            "Ciudad Potosí": lugar.reduce((sum, item) => sum + item.ciudad_potosi, 0),
            "Interior Potosí": lugar.reduce((sum, item) => sum + item.interior_potosi, 0),
            "Ciudad Bolivia": lugar.reduce((sum, item) => sum + item.ciudad_bolivia, 0),
            "Interior Bolivia": lugar.reduce((sum, item) => sum + item.interior_bolivia, 0),
            Exterior: lugar.reduce((sum, item) => sum + item.exterior, 0),
            Total: lugar.reduce((sum, item) => sum + item.total, 0),
        });

        // Crea un libro de trabajo y una hoja
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Agrega la hoja al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, "Lugar");

        // Genera y descarga el archivo
        XLSX.writeFile(workbook, `lugar_gestion_${selectedGestion}.xlsx`);
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        Poblacion Estudiantil Regular por Lugar, según Carrera.
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
                                <th colSpan="5" className="text-center">Lugar</th>
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
                            {lugar.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.programa}</td>
                                    <td>{item.potosi_ciudad}</td>
                                    <td>{item.potosi_provincia}</td>
                                    <td>{item.interior_ciudad}</td>
                                    <td>{item.interior_provincia}</td>
                                    <td>{item.exterior}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{lugar.reduce((sum, item) => sum + item.potosi_ciudad, 0)}</th>
                                <th>{lugar.reduce((sum, item) => sum + item.potosi_provincia, 0)}</th>
                                <th>{lugar.reduce((sum, item) => sum + item.interior_ciudad, 0)}</th>
                                <th>{lugar.reduce((sum, item) => sum + item.interior_provincia, 0)}</th>
                                <th>{lugar.reduce((sum, item) => sum + item.exterior, 0)}</th>
                                <th>{lugar.reduce((sum, item) => sum + item.total, 0)}</th>
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

export default RegularLugarCarrera;

