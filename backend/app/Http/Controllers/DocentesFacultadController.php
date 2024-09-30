<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use App\Models\Facultad;
use Illuminate\Support\Facades\DB;

class DocentesFacultadController extends Controller
{
    // Este método manejará tanto la obtención de facultades por sexo como la lista de gestiones
    public function getDocentesFacultadSexo(Request $request)
    {
        if ($request->input('type') === 'gestiones') {
            // Si el tipo es 'gestiones', devolver la lista de gestiones
            $gestiones = Docente::select('gestion')->distinct()->orderBy('gestion', 'desc')->pluck('gestion');
            return response()->json($gestiones);
        }

        // Si no se solicita 'gestiones', devolver los docentes agrupados por facultad y sexo
        $gestion = $request->input('gestion'); // Filtrar por gestión si se recibe como parámetro

        // Realizar la consulta con join a la tabla de facultades, ordenada alfabéticamente
        $docentes = Docente::select('facultads.facultad', 
                                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_masculino"), 
                                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"), 
                                    DB::raw("COUNT(*) as total"))
                            ->join('facultads', 'docentes.cod_fac', '=', 'facultads.cod_fac')
                            ->when($gestion, function ($query) use ($gestion) {
                                return $query->where('docentes.gestion', $gestion);
                            })
                            ->groupBy('facultads.facultad')
                            ->orderBy('facultads.facultad', 'asc') // Ordenar las facultades alfabéticamente
                            ->get();

        return response()->json($docentes);
    }
}
