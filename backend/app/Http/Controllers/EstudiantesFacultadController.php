<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesFacultadController extends Controller
{
    public function getEstudiantesFacultad(Request $request)
    {
        // Verificar si el request contiene un parámetro de 'gestion'
        $gestion = $request->input('gestion', null);
    
        if ($gestion) {
            // Si se proporciona 'gestion', obtener los datos de matriculados y programados
            $result = DB::table('matriculas')
                ->join('facultads', 'matriculas.id_fac', '=', 'facultads.id_fac')
                ->select('facultads.facultad',
                    DB::raw("SUM(CASE WHEN tipo_verificado = 'NUEVO' THEN 1 ELSE 0 END) as total_nuevo"), 
                    DB::raw("SUM(CASE WHEN tipo_verificado = 'ANTIGUO' THEN 1 ELSE 0 END) as total_antiguo"), 
                    DB::raw("COUNT(*) as total"))
                ->where('matriculas.gestion', '=', $gestion)
                // Condiciones para periodo 1 o periodo 2 con tipo_verificado 'NUEVO'
                ->where(function ($query) {
                    $query->where('matriculas.periodo', '=', 1)
                        ->orWhere(function ($subQuery) {
                            $subQuery->where('matriculas.periodo', '=', 2)
                                ->where('matriculas.tipo_verificado', '=', 'NUEVO');
                        });
                })
                // Excluir programas con id_programa "EXI", "EDI", "EXQ"
                ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                ->groupBy('facultads.facultad')
                ->get();
    
            return response()->json($result);
        } else {
            // Si no se proporciona 'gestion', devolver las gestiones disponibles
            $gestiones = DB::table('matriculas')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->get();
    
            return response()->json($gestiones);
        }
    }
}
