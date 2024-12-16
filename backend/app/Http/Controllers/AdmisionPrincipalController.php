<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionPrincipalController extends Controller
{
    public function getAdminisionPorGestion()
    {
        // Realiza la consulta a la base de datos
        $administrativosPorGestion = DB::table('admisions')
            ->select(
                'gestion',
                DB::raw('COUNT(*) as total_postulantes'), // Total de registros de postulantes por gestión
                DB::raw("SUM(CASE WHEN estado = 'A' THEN 1 ELSE 0 END) as total_aprobados"), // Total aprobados

            )
            ->whereNotIn('id_programa', ['EDI', 'EDT', 'EXI', 'EXQ', 'LAT', 'OJO', 'PCO', 'UTI']) // Excluye "EXQ" y "EDI" de id_programa
            ->groupBy('gestion')
            ->orderBy('gestion', 'asc')
            ->get();

        // Retorna los resultados en formato JSON
        return response()->json($administrativosPorGestion);
    }
}
