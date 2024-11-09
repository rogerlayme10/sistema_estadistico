<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesNuevosDepartamentoCarreraController extends Controller
{
    public function getNuevosDepartamentoCarrera(Request $request, $year = null)
    {
        if ($year) {
            // Si se pasa un año, se realiza la consulta para obtener los datos filtrados por año
            $result = DB::table('matriculas')
                ->join('programas', 'matriculas.id_programa', '=', 'programas.id_programa')
                ->join('departamentos', 'matriculas.id_dep', '=', 'departamentos.id_dep')
                ->select(
                    'programas.programa',
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 1 THEN 1 ELSE 0 END) as la_paz'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 2 THEN 1 ELSE 0 END) as santa_cruz'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 3 THEN 1 ELSE 0 END) as cochabamba'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 4 THEN 1 ELSE 0 END) as potosi'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 5 THEN 1 ELSE 0 END) as oruro'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 6 THEN 1 ELSE 0 END) as chuquisaca'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 7 THEN 1 ELSE 0 END) as tarija'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 8 THEN 1 ELSE 0 END) as beni'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep = 9 THEN 1 ELSE 0 END) as pando'),
                    DB::raw('SUM(CASE WHEN departamentos.id_dep NOT BETWEEN 1 AND 9 THEN 1 ELSE 0 END) as otros'),
                    DB::raw('COUNT(*) as total')
                )
                ->where('matriculas.gestion', '=', $year)
                // Excluir programas con id_programa "EXI", "EDI", "EXQ"
                ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                ->where('matriculas.tipo_verificado', '=', 'NUEVO')
                ->groupBy('programas.programa')
                ->get();

            return response()->json($result);
        } else {
            // Si no se pasa un año, se obtienen los años disponibles
            $years = DB::table('matriculas')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->get();

            return response()->json($years);
        }
    }
}
