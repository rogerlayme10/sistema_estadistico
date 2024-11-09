<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesMatriculadosSexoFacultadController extends Controller
{
    public function getMatriculadosSexoFacultad(Request $request)
    {
        // Verificar si el request contiene un parámetro de 'gestion'
        $gestion = $request->input('gestion', null);

        if ($gestion) {
            // Si se proporciona 'gestion', obtener los datos de matriculados por sexo y facultad
            $result = DB::table('matriculas')
                ->join('facultads', 'matriculas.id_fac', '=', 'facultads.id_fac')
                ->select(
                    'facultads.facultad',
                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_masculino"),
                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"),
                    DB::raw("COUNT(*) as total")
                )
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
