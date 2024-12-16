<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PrincipalController extends Controller
{
    public function getDashboardData(Request $request)
{
    $gestionSeleccionada = $request->input('gestion', null);

    // Obtener todas las gestiones
    $gestiones = DB::table('matriculas')
        ->select('gestion')
        ->distinct()
        ->orderBy('gestion', 'asc')
        ->get();

    // Si no se selecciona una gestión, usa la última
    $gestionSeleccionada = $gestionSeleccionada ?? $gestiones->last()->gestion;

    // Filtrar los datos según la gestión seleccionada
    $totalAdministrativos = DB::table('administrativos')
        ->select('sexo', DB::raw('COUNT(*) as total'))
        ->where('gestion', $gestionSeleccionada)
        ->groupBy('sexo')
        ->get();

    $totalDocentes = DB::table('docentes')
        ->select('sexo', DB::raw('COUNT(*) as total'))
        ->where('gestion', $gestionSeleccionada)
        ->groupBy('sexo')
        ->get();

    $totalEstudiantes = DB::table('matriculas')
        ->select(
            DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as M"),
            DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as F"),
            DB::raw("COUNT(*) as total")
        )
        ->where('gestion', $gestionSeleccionada)
        ->where(function ($query) {
            $query->where('matriculas.periodo', 1)
                ->orWhere(function ($subQuery) {
                    $subQuery->where('matriculas.periodo', 2)
                        ->where('matriculas.tipo_verificado', 'NUEVO');
                });
        })
        ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
        ->first();

    $estudiantesPorGestion = DB::table('matriculas')
        ->select(
            'gestion',
            DB::raw('COUNT(*) as total')
        )
        ->where(function ($query) {
            $query->where('matriculas.periodo', 1)
                ->orWhere(function ($subQuery) {
                    $subQuery->where('matriculas.periodo', 2)
                        ->where('matriculas.tipo_verificado', 'NUEVO');
                });
        })
        ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
        ->groupBy('gestion')
        ->orderBy('gestion', 'asc')
        ->get();

    return response()->json([
        'total_administrativos' => $totalAdministrativos,
        'total_docentes' => $totalDocentes,
        'total_estudiantes' => $totalEstudiantes,
        'gestiones' => $gestiones,
        'estudiantes_por_gestion' => $estudiantesPorGestion,
        'gestion_seleccionada' => $gestionSeleccionada,
    ]);
}

}
