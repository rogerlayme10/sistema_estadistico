<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesRegularLugarCarreraController extends Controller
{
    public function getMatriculadosRegularLugarCarrera(Request $request, $year = null)
    {
        // Validar año (opcional)
        $gestion = $request->input('gestion', 2023); // Por defecto 2023 si no se envía

        // Consulta para obtener facultades y procedencia
        $lugar = DB::table('matriculas as m')
            ->join('programas as p', 'm.id_programa', '=', 'p.id_programa')
            ->join('uatf_datos as u', 'm.nro_dip', '=', 'u.nro_dip')
            ->select(
                'p.programa',
                DB::raw("SUM(CASE WHEN u.id_lugar = 'A' THEN 1 ELSE 0 END) as potosi_ciudad"),
                DB::raw("SUM(CASE WHEN u.id_lugar = 'B' THEN 1 ELSE 0 END) as potosi_provincia"),
                DB::raw("SUM(CASE WHEN u.id_lugar = 'C' THEN 1 ELSE 0 END) as interior_ciudad"),
                DB::raw("SUM(CASE WHEN u.id_lugar = 'D' THEN 1 ELSE 0 END) as interior_provincia"),
                DB::raw("SUM(CASE WHEN u.id_lugar = 'E' THEN 1 ELSE 0 END) as exterior"),
                DB::raw('COUNT(*) as total')
            )
            ->where('m.gestion', $gestion)
            ->where('m.tipo_verificado', '=', 'ANTIGUO')
            ->where('m.periodo', '=', '1')
            ->whereNotIn('m.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
            ->groupBy('p.programa')
            ->get();

        // Obtener gestiones únicas
        $gestiones = DB::table('matriculas')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'desc')
            ->get();

        return response()->json([
            'lugar' => $lugar,
            'gestiones' => $gestiones,
        ]);
    }
}
