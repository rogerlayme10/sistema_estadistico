<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MovilidadActasCarreraController extends Controller
{
    public function getActasCarrera(Request $request, $gestion = null)
    {
        if ($gestion) {
            // Si se proporciona una gestión, devuelve los datos filtrados por gestión y tipo_beca = 'alimentación'
            $resultados = DB::table('tramites')
                ->select('carrera', 
                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_m"),
                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_f"),
                    DB::raw('COUNT(*) as total')
                )
                ->where('gestion', $gestion)
                ->where( DB::raw("TRIM(tramite)"),'ACTAS') // Filtro adicional por tipo_beca = 'alimentación'
                ->groupBy('carrera')
                ->orderBy('carrera', 'asc') // Ordena alfabéticamente por facultad
                ->get();
    
            return response()->json($resultados);
        } else {
            // Si no se proporciona una gestión, devuelve las gestiones disponibles filtradas por tipo_beca = 'alimentación'
            $gestiones = DB::table('tramites')
                ->select('gestion')
                ->distinct()
                ->where(DB::raw("TRIM(tramite)"), 'ACTAS') // Filtro adicional por tipo_beca = 'alimentación'
                ->orderBy('gestion', 'asc')
                ->get();
    
            return response()->json($gestiones);
        }
    }
}