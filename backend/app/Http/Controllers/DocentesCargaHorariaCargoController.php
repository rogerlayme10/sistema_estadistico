<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Docente;
use App\Models\Facultad;
use Illuminate\Support\Facades\DB;

class DocentesCargaHorariaCargoController extends Controller
{
    public function getCargaHoraria(Request $request)
    {
        $gestion = $request->input('gestion', 2023); // Valor por defecto para el año 2023
    
        // Consulta a la base de datos
        $datos = DB::table('docentes')
            ->join('facultads', 'docentes.cod_fac', '=', 'facultads.cod_fac') // Relacionar facultades
            ->select(
                'facultads.facultad',
                DB::raw('SUM(CASE WHEN carga_horaria = \'T.C.\' THEN 1 ELSE 0 END) as total_tc'),
                DB::raw('SUM(CASE WHEN carga_horaria = \'T.H.\' THEN 1 ELSE 0 END) as total_th'),
                DB::raw('SUM(CASE WHEN categoria = \'CATEDRATICO\' AND carga_horaria = \'T.C.\' THEN 1 ELSE 0 END) as catedratico_tc'),
                DB::raw('SUM(CASE WHEN categoria = \'CATEDRATICO\' AND carga_horaria = \'T.H.\' THEN 1 ELSE 0 END) as catedratico_th'),
                DB::raw('SUM(CASE WHEN categoria = \'ADJUNTO\' AND carga_horaria = \'T.C.\' THEN 1 ELSE 0 END) as adjunto_tc'),
                DB::raw('SUM(CASE WHEN categoria = \'ADJUNTO\' AND carga_horaria = \'T.H.\' THEN 1 ELSE 0 END) as adjunto_th'),
                DB::raw('SUM(CASE WHEN categoria = \'ASISTENTE\' AND carga_horaria = \'T.C.\' THEN 1 ELSE 0 END) as asistente_tc'),
                DB::raw('SUM(CASE WHEN categoria = \'ASISTENTE\' AND carga_horaria = \'T.H.\' THEN 1 ELSE 0 END) as asistente_th'),
                DB::raw('SUM(CASE WHEN categoria = \'ASISTENTE a.i.\' AND carga_horaria = \'T.C.\' THEN 1 ELSE 0 END) as asistente_ai_tc'),
                DB::raw('SUM(CASE WHEN categoria = \'ASISTENTE a.i.\' AND carga_horaria = \'T.H.\' THEN 1 ELSE 0 END) as asistente_ai_th')
            )
            ->when($gestion, function ($query, $gestion) {
                return $query->where('docentes.gestion', $gestion);
            })
            ->groupBy('facultads.facultad')
            ->orderBy('facultads.facultad', 'asc') // Ordenamos las facultades alfabéticamente
            ->get();
    
        return response()->json([
            'datos' => $datos,
            'years' => DB::table('docentes')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->pluck('gestion')
        ]);
    }
    
}
