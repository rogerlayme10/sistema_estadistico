<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionPsaProcedenciaController extends Controller
{
    public function getPsaProcedencia(Request $request, $year = null)
    {
        // Validar año (opcional)
        $gestion = $request->input('gestion', 2023); // Por defecto 2023 si no se envía

        // Consulta para obtener facultades y procedencia
        $procedencias = DB::table('admisions as a')
            ->join('facultads as f', 'a.id_fac', '=', 'f.id_fac')
            ->join('uatf_datos as u', 'a.nro_dip', '=', 'u.nro_dip')
            ->select(
                'f.facultad',
                DB::raw('SUM(CASE WHEN u.id_procedencia = 1 THEN 1 ELSE 0 END) as ciudad_potosi'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 2 THEN 1 ELSE 0 END) as interior_potosi'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 3 THEN 1 ELSE 0 END) as ciudad_bolivia'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 4 THEN 1 ELSE 0 END) as interior_bolivia'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 5 THEN 1 ELSE 0 END) as exterior'),
                DB::raw('COUNT(*) as total')
            )
            ->where('a.gestion', $gestion)
            ->where('a.id_examen', 1)
            ->where('a.estado', 'A')
            ->groupBy('f.facultad')
            ->get();

        // Obtener gestiones únicas
        $gestiones = DB::table('admisions')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'desc')
            ->get();

        return response()->json([
            'procedencias' => $procedencias,
            'gestiones' => $gestiones,
        ]);
    }
}
