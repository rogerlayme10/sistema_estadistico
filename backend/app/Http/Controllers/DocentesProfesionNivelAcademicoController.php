<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use Illuminate\Support\Facades\DB;

class DocentesProfesionNivelAcademicoController extends Controller
{
    public function getProfesionesNivelAcademico(Request $request)
    {
        $gestion = $request->input('gestion',2023);// Valor por defecto para el año 2023

        $data = DB::table('docentes')
            ->select('titulo_acad', 
            DB::raw('SUM(CASE WHEN nivel_acad = \'DOCTORADO\' THEN 1 ELSE 0 END) as total_doctorado'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'MAESTRIA\' THEN 1 ELSE 0 END) as total_maestria'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'ESPECIALIDAD\' THEN 1 ELSE 0 END) as total_especialidad'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'DIPLOMADO\' THEN 1 ELSE 0 END) as total_diplomado'),
            DB::raw('SUM(CASE WHEN nivel_acad = \'LICENCIATURA\' THEN 1 ELSE 0 END) as total_licenciatura'),
            DB::raw('COUNT(*) as total')
            )
            ->where('gestion', $gestion)
            ->groupBy('titulo_acad')
            ->orderBy('titulo_acad')
            ->get();

        return response()->json([
            'data' => $data,
            'years' => DB::table('docentes')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->pluck('gestion')
            ]);
    }
}
