<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesRegularMatriculadosFacultadController extends Controller
{
    public function getMatriculadosRegularFacultad(Request $request)
    {
        // Verificar si el request contiene un parámetro de 'gestion'
        $gestion = $request->input('gestion', null);

        if ($gestion) {
            // Si se proporciona 'gestion', obtener los datos de matriculados y programados
            $result = DB::table('matriculas')
                ->join('facultads', 'matriculas.id_fac', '=', 'facultads.id_fac')
                ->select(
                    'facultads.facultad',
                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_masculino"),
                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"),
                    DB::raw("COUNT(DISTINCT matriculas.nro_dip) as total")
                )
                ->where('matriculas.gestion', '=', $gestion)
                // Excluir programas con id_programa "EXI", "EDI", "EXQ"
                ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                // Filtro adicional para tipo_verificado = 'NUEVO'
                ->where('matriculas.tipo_verificado', '=', 'ANTIGUO')
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
