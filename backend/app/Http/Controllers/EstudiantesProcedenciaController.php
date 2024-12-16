<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesProcedenciaController extends Controller
{
    public function getMatriculadosProcedencia(Request $request, $year = null)
    {
        // Validar año (opcional)
        $gestion = $request->input('gestion', 2023); // Por defecto 2023 si no se envía

        // Consulta para obtener facultades y procedencia
        $procedencias = DB::table('matriculas as m')
            ->join('facultads as f', 'm.id_fac', '=', 'f.id_fac')
            ->join('uatf_datos as u', 'm.nro_dip', '=', 'u.nro_dip')
            ->select(
                'f.facultad',
                DB::raw('SUM(CASE WHEN u.id_procedencia = 1 THEN 1 ELSE 0 END) as ciudad_potosi'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 2 THEN 1 ELSE 0 END) as interior_potosi'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 3 THEN 1 ELSE 0 END) as ciudad_bolivia'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 4 THEN 1 ELSE 0 END) as interior_bolivia'),
                DB::raw('SUM(CASE WHEN u.id_procedencia = 5 THEN 1 ELSE 0 END) as exterior'),
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
            ->groupBy('f.facultad')
            ->get();

        // Obtener gestiones únicas
        $gestiones = DB::table('matriculas')
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
