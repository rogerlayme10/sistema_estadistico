<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesPrincipalController extends Controller
{
    public function getMatriculasPorGestion()
    {
        // Consultar todas las gestiones disponibles
        $gestiones = DB::table('matriculas')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'asc')
            ->pluck('gestion');

        $resultados = [];

        foreach ($gestiones as $gestion) {
            // Primera consulta: Total "ANTIGUO"
            $totalAntiguo = DB::table('matriculas')
                ->where('tipo_verificado', 'ANTIGUO')
                ->where('periodo', '1')
                ->where('gestion', $gestion)
                ->whereNotIn('id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                ->count();

            // Segunda consulta: Total "NUEVO"
            $totalNuevo = DB::table('matriculas')
                ->where('tipo_verificado', 'NUEVO')
                ->where('gestion', $gestion)
                ->whereNotIn('id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                ->count();

            // Tercera consulta: Total general
            $totalGeneral = DB::table('matriculas')
                ->where('gestion', $gestion)
                ->where(function ($query) {
                    $query->where('periodo', '1')
                          ->orWhere(function ($subQuery) {
                              $subQuery->where('periodo', '2')
                                       ->where('tipo_verificado', 'NUEVO');
                          });
                })
                ->whereNotIn('id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                ->count();

            // Agregar los resultados de la gestión al array
            $resultados[] = [
                'gestion' => $gestion,
                'total_antiguo' => $totalAntiguo,
                'total_nuevo' => $totalNuevo,
                'total_general' => $totalGeneral,
            ];
        }

        return response()->json($resultados);
    }
}
