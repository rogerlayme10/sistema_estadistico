import React, { useState, useEffect} from "react";
import { Card, CardHeader, Table, Row, Col, Form, Button } from 'react-bootstrap';

import * as XLSX from 'xlsx'; // Importar xlsx para exportar a Excel
import config from '../../../../../config';


const ActasCarrera = () => {
    const [data, setData] = useState([]);
    const [gestion, setGestion] = useState('');
    const [gestiones, setGestiones] = useState([]);
    

    // Función para obtener los datos filtrados por año (gestión) o las gestiones disponibles
    const fetchData = async (year = null) => {
        try {
            const url = year ? `${config.API_URL}/actas-carrera/${year}` : `${config.API_URL}/actas-carrera`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error al obtener los datos: ${response.statusText}`);
            }
            const result = await response.json();
            if (year) {
                setData(result);
            } else {
                setGestiones(result);
                if (result.length > 0) {
                    setGestion(result[0].gestion);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();  // Obtener las gestiones al cargar el componente
    }, []);

    useEffect(() => {
        if (gestion) {
            fetchData(gestion);  // Obtener los datos cuando se selecciona una gestión
        }
    }, [gestion]);

    // Ordenar los datos por 'facultad' alfabéticamente
    const sortedData = [...data].sort((a, b) => a.carrera.localeCompare(b.carrera));

    

    // Función para descargar la tabla en Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(sortedData.map(row => ({
            facultad: row.carrera,
            Masculino: row.total_m,
            Femenino: row.total_f,
            Total: row.total
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "becas");
        XLSX.writeFile(wb, `Certificado_ActaCarrera${gestion}.xlsx`);
    };

   
   

    return (
        <Row>
            <Col >
                <Card>
                    <CardHeader>
                       Certificadode Actas por sexo, según Carrera.
                        <Form.Select 
                            className="mt-2" 
                            value={gestion} 
                            onChange={(e) => setGestion(e.target.value)}
                        >
                            {gestiones.map((g) => (
                                <option key={g.gestion} value={g.gestion}>
                                    {g.gestion}
                                </option>
                            ))}
                        </Form.Select>
                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Carrera</th>
                                <th colSpan="2" className="text-center">Sexo</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>M</th>
                                <th>F</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.carrera}</td>
                                    <td>{row.total_m}</td>
                                    <td>{row.total_f}</td>
                                    <td>{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total_m, 0)}</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total_f, 0)}</th>
                                <th>{sortedData.reduce((acc, row) => acc + row.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button variant="primary" onClick={exportToExcel}>
                        Descargar Tabla en Excel
                    </Button>
                </Card>
            </Col>
            
        </Row>
    );
};

export default ActasCarrera;


