<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdministrativosActividadController extends Controller
{
    public function getDataActividad(Request $request, $gestion = null)
    {
        if ($gestion) {
            // Si se proporciona una gestión, devuelve los datos filtrados
            $resultados = DB::table('administrativos')
                ->select('actividad', 
                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_m"),
                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_f"),
                    DB::raw('COUNT(*) as total'))
                ->where('gestion', $gestion)
                ->groupBy('actividad')
                ->orderBy('actividad', 'asc') // Ordena alfabéticamente por tipo_contrato
                ->get();

            return response()->json($resultados);
        } else {
            // Si no se proporciona una gestión, devuelve las gestiones disponibles
            $gestiones = DB::table('administrativos')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'asc')
                ->get();

            return response()->json($gestiones);
        }
    }
}
