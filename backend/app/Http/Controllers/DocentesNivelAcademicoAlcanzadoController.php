<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocentesNivelAcademicoAlcanzadoController extends Controller
{
    public function getDatosPorGestion(Request $request)
    {
        $gestion = $request->input('gestion',2023);// Valor por defecto para el año 2023

        $data = DB::table('docentes')
            ->select('nivel_acad', 
            DB::raw('SUM(CASE WHEN categoria = \'CATEDRATICO\' THEN 1 ELSE 0 END) as total_catedratico'),
            DB::raw('SUM(CASE WHEN categoria = \'ASISTENTE\' THEN 1 ELSE 0 END) as total_asistente'),
            DB::raw('SUM(CASE WHEN categoria = \'ADJUNTO\' THEN 1 ELSE 0 END) as total_adjunto'),
            DB::raw('SUM(CASE WHEN categoria = \'ASISTENTE a.i.\' THEN 1 ELSE 0 END) as total_asistenteai'),
            DB::raw('COUNT(*) as total')
            )
            ->where('gestion', $gestion)
            ->groupBy('nivel_acad')
            ->orderByRaw("
            CASE 
                WHEN nivel_acad = 'DOCTORADO' THEN 1
                WHEN nivel_acad = 'MAESTRÍA' THEN 2
                WHEN nivel_acad = 'ESPECIALIDAD' THEN 3
                WHEN nivel_acad = 'LICENCIATURA' THEN 4
                WHEN nivel_acad = 'DIPLOMADO' THEN 5
                ELSE 6
            END
             ")
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
