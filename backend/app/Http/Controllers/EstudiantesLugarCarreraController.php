<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesLugarCarreraController extends Controller
{
    public function getMatriculadosLugarCarrera(Request $request, $year = null)
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
            // Condiciones para periodo 1 o periodo 2 con tipo_verificado 'NUEVO'
            ->where(function ($query) {
                $query->where('m.periodo', '=', 1)
                    ->orWhere(function ($subQuery) {
                        $subQuery->where('m.periodo', '=', 2)
                            ->where('m.tipo_verificado', '=', 'NUEVO');
                    });
            })
            // Excluir programas con id_programa "EXI", "EDI", "EXQ"
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
