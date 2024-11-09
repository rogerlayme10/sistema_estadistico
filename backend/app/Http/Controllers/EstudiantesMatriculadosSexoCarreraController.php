<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesMatriculadosSexoCarreraController extends Controller
{
    public function getMatriculadosSexoCarrera(Request $request)
    {
        // Verificar si el request contiene un parámetro de 'gestion'
        $gestion = $request->input('gestion', null);

        if ($gestion) {
            // Si se proporciona 'gestion', obtener los datos de matriculados por sexo y facultad
            $result = DB::table('matriculas')
                ->join('programas', 'matriculas.id_programa', '=', 'programas.id_programa')
                ->select(
                    'programas.programa',
                    DB::raw("SUM(CASE 
                            WHEN matriculas.sexo = 'M' AND matriculas.periodo = 1 
                            THEN 1 
                            WHEN matriculas.sexo = 'M' AND matriculas.periodo = 2 AND matriculas.tipo_verificado = 'NUEVO' 
                            THEN 1 
                            ELSE 0 END) as total_masculino"),
                    DB::raw("SUM(CASE 
                            WHEN matriculas.sexo = 'F' AND matriculas.periodo = 1 
                            THEN 1 
                            WHEN matriculas.sexo = 'F' AND matriculas.periodo = 2 AND matriculas.tipo_verificado = 'NUEVO' 
                            THEN 1 
                            ELSE 0 END) as total_femenino"),
                    DB::raw("COUNT(CASE 
                            WHEN matriculas.periodo = 1 
                            THEN matriculas.nro_dip 
                            WHEN matriculas.periodo = 2 AND matriculas.tipo_verificado = 'NUEVO' 
                            THEN matriculas.nro_dip 
                            ELSE NULL END) as total")
                )
                ->where('matriculas.gestion', '=', $gestion)
                // Excluir programas con id_programa "EXI", "EDI", "EXQ"
                ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                ->groupBy('programas.programa')
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
