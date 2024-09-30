<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdministrativosUnidadNivelAcademicoController extends Controller
{
    public function getUnidadNivelAcademico(Request $request)
    {
        $gestion = $request->input('gestion',2023);// Valor por defecto para el año 2023

        $data = DB::table('administrativos')
            ->select('unidad', 
            DB::raw('SUM(CASE WHEN nivel_acad = \'DIPLOMADO\' THEN 1 ELSE 0 END) as total_diplomado'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'LICENCIATURA\' THEN 1 ELSE 0 END) as total_licenciatura'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'PROFESIONAL\' THEN 1 ELSE 0 END) as total_profesional'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'EGRESADO\' THEN 1 ELSE 0 END) as total_egresado'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'TECNICO MEDIO\' THEN 1 ELSE 0 END) as total_tecnicomedio'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'ESTUDIANTE\' THEN 1 ELSE 0 END) as total_estudiante'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'EMP. PÃBLICO\' THEN 1 ELSE 0 END) as total_publico'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'OBRERO\' THEN 1 ELSE 0 END) as total_obrero'),
            DB::raw('COUNT(*) as total')
            )
            ->where('gestion', $gestion)
            ->groupBy('unidad')
            ->orderBy('unidad')
            ->get();

        return response()->json([
            'data' => $data,
            'years' => DB::table('administrativos')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->pluck('gestion')
            ]);
  
        
    }
}
