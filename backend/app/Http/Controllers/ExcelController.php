<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Storage;

class ExcelController extends Controller
{
    public function downloadExcel(Request $request)
    {
        // Ruta de la plantilla de Excel en storage
        $templatePath = storage_path('app/templates/uatf.xlsx');
        
        // Cargar la plantilla de Excel
        $spreadsheet = IOFactory::load($templatePath);
        $sheet = $spreadsheet->getActiveSheet();

        // Recibir los datos enviados desde el frontend
        $data = $request->input('data');

        // Escribe los datos en la plantilla, comenzando desde la fila 8
        $row = 8;  // Ajusta aquí la fila inicial para los datos
        foreach ($data as $item) {
            $sheet->setCellValue('A' . $row, $item['cargo']);
            $sheet->setCellValue('B' . $row, $item['total_masculino']);
            $sheet->setCellValue('C' . $row, $item['total_femenino']);
            $sheet->setCellValue('D' . $row, $item['total_masculino'] + $item['total_femenino']);
            $row++;
        }

        // Configura la respuesta para descargar el archivo
        $writer = new Xlsx($spreadsheet);
        $filename = 'Docentes_' . $request->input('gestion') . '.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), $filename);

        $writer->save($tempFile);

        return response()->download($tempFile, $filename)->deleteFileAfterSend(true);
    }
}
