<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraduadosCarreraController extends Controller
{
    public function getGraduadosCarrera(Request $request)
    {
        // Verificar si el request contiene un parámetro de 'gestion'
        $gestion = $request->input('gestion_acta', null);
    
        if ($gestion) {
            // Si se proporciona 'gestion', obtener los datos de matriculados y programados
            $result = DB::table('graduados')
                ->join('programas', 'graduados.id_programa', '=', 'programas.id_programa')
                ->select('programas.programa',
                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END)  as total_masculino"), 
                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"), 
                    DB::raw("COUNT(*) as total"))
                ->where('graduados.gestion_acta', '=', $gestion)
                ->groupBy('programas.programa')
                ->orderBy('programas.programa', 'asc') // Ordenar las facultades alfabéticamente
                ->get();
    
            return response()->json($result);
        } else {
            // Si no se proporciona 'gestion', devolver las gestiones disponibles
            $gestiones = DB::table('graduados')
                ->select('gestion_acta')
                ->distinct()
                ->orderBy('gestion_acta', 'desc')
                ->get();
    
            return response()->json($gestiones);
        }
    }
}
