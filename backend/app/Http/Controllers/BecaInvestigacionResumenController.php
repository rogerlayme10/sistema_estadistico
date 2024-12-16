<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BecaInvestigacionResumenController extends Controller
{
    public function getInvestigacionResumen(Request $request, $gestion = null)
    {
        if ($gestion) {
            // Código para devolver datos filtrados por gestión
        } else {
            // Devuelve las gestiones disponibles filtradas por tipo_beca = 'ALIMENTACION'
            $gestiones = DB::table('becas')
                ->select(
                    'gestion',
                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_m"),
                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_f"),
                    DB::raw('COUNT(*) as total')
                )
                ->where(DB::raw("TRIM(tipo_beca)"), 'AUXILIAR DE INVESTIGACION') // Filtro adicional por tipo_beca = 'ALIMENTACION'
                ->groupBy('gestion')
                ->orderBy('gestion', 'asc')
                ->get();

            return response()->json($gestiones);
        }
    }
}
