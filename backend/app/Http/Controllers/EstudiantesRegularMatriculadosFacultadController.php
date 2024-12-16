<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesRegularMatriculadosFacultadController extends Controller
{
    public function getMatriculadosRegularFacultad(Request $request)
{
    $gestion = $request->input('gestion', null);

    if ($gestion) {
        $result = DB::table('matriculas')
            ->join('facultads', 'matriculas.id_fac', '=', 'facultads.id_fac')
            ->select(
                'facultads.facultad',
                DB::raw("SUM(CASE WHEN matriculas.sexo = 'M' THEN 1 ELSE 0 END) as total_masculino"),
                DB::raw("SUM(CASE WHEN matriculas.sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"),
                DB::raw("COUNT(*) as total") // Cambiado para contar todas las filas, no valores únicos
            )
            ->where('matriculas.gestion', '=', $gestion)
            ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
            ->where('matriculas.tipo_verificado', '=', 'ANTIGUO')
            ->where('matriculas.periodo', '=', '1')
            ->groupBy('facultads.facultad')
            ->get();

        return response()->json($result);
    } else {
        $gestiones = DB::table('matriculas')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'desc')
            ->get();

        return response()->json($gestiones);
    }
}

}
