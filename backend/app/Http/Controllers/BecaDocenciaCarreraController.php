<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BecaDocenciaCarreraController extends Controller
{
    public function getDocenciaCarrera(Request $request, $gestion = null)
    {
        if ($gestion) {
            // Si se proporciona una gestión, devuelve los datos filtrados por gestión y tipo_beca = 'alimentación'
            $resultados = DB::table('becas')
                ->select('carrera', 
                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_m"),
                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_f"),
                    DB::raw('COUNT(*) as total')
                )
                ->where('gestion', $gestion)
                ->where( DB::raw("TRIM(tipo_beca)"),'AUXILIAR DE DOCENCIA') // Filtro adicional por tipo_beca = 'alimentación'
                ->groupBy('carrera')
                ->orderBy('carrera', 'asc') // Ordena alfabéticamente por facultad
                ->get();
    
            return response()->json($resultados);
        } else {
            // Si no se proporciona una gestión, devuelve las gestiones disponibles filtradas por tipo_beca = 'alimentación'
            $gestiones = DB::table('becas')
                ->select('gestion')
                ->distinct()
                ->where(DB::raw("TRIM(tipo_beca)"), 'AUXILIAR DE DOCENCIA') // Filtro adicional por tipo_beca = 'alimentación'
                ->orderBy('gestion', 'asc')
                ->get();
    
            return response()->json($gestiones);
        }
    }
    
}
