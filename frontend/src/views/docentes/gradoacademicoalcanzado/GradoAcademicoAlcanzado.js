import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Table, Row, Col, FormSelect, Button } from 'react-bootstrap';
import { PolarArea } from 'react-chartjs-2';
import config from '../../../config';
import '../../../style/textgrafic/ChartOptions'; // Asegúrate de importar la configuración
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

const GradoAcademicoAlcanzado = () => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [gestion, setGestion] = useState(2023); // Valor predeterminado para la gestión

    useEffect(() => {
        fetch(`${config.API_URL}/docentes-nivelacademico?gestion=${gestion}`)
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
            'Nivel Académico': item.nivel_acad,
            'Catedrático': item.total_catedratico,
            'Adjunto': item.total_adjunto,
            'Asistente': item.total_asistente,
            'Asistente a.i.': item.total_asistenteai,
            'Total': item.total
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Grado Académico Alcanzado');
        XLSX.writeFile(wb, 'grado_academico.xlsx');
    };
    //descargra img
    const handleExportChartAsImage = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            html2canvas(canvas).then((canvas) => {
                const img = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = img;
                link.download = 'chart.png';
                link.click();
            });
        }
    };

    const chartData = {
        labels: data.map(item => item.nivel_acad),
        datasets: [
            {
                label: 'Total por Nivel Académico',
                data: data.map(item => item.total),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Row>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Personal docente por nivel,ségun grado académico alcanzado
                        <FormSelect value={gestion} onChange={handleFilterChange}>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </FormSelect>

                    </CardHeader>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th rowSpan="2">Nivel Académico</th>
                                <th colSpan="4" className="text-center">Nivel Docente</th>
                                <th rowSpan="2">Total</th>
                            </tr>
                            <tr>
                                <th>Catedrático</th>
                                <th>Adjunto</th>
                                <th>Asistente</th>
                                <th>Asistente a.i.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nivel_acad}</td>
                                    <td>{item.total_catedratico}</td>
                                    <td>{item.total_adjunto}</td>
                                    <td>{item.total_asistente}</td>
                                    <td>{item.total_asistenteai}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{data.reduce((sum, d) => sum + d.total_catedratico, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_adjunto, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_asistente, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total_asistenteai, 0)}</th>
                                <th>{data.reduce((sum, d) => sum + d.total, 0)}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button onClick={handleExportToExcel} variant="primary" className="mt-3">Descargar Excel</Button>
                </Card>
            </Col>
            <Col xs={12} md={6} xl={6}>
                <Card>
                    <CardHeader>
                        Gráfico

                    </CardHeader>
                    <div style={{ height: '400px' }}>
                        <PolarArea data={chartData} options={chartOptions} />
                    </div>
                    <Button onClick={handleExportChartAsImage} variant="primary" className="mt-3">Descargar Gráfico</Button>
                </Card>
            </Col>
        </Row>
    );
};

export default GradoAcademicoAlcanzado;


