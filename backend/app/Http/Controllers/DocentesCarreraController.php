<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Docente;
use App\Models\Facultad;

class DocentesCarreraController extends Controller
{
    public function getDocentesCarreraSexo(Request $request)
    {
        if ($request->input('type') === 'gestiones') {
            // Si el tipo es 'gestiones', devolver la lista de gestiones
            $gestiones = Docente::select('gestion')->distinct()->orderBy('gestion', 'desc')->pluck('gestion');
            return response()->json($gestiones);
        }

        // Si no se solicita 'gestiones', devolver los docentes agrupados por facultad y sexo
        $gestion = $request->input('gestion'); // Filtrar por gestión si se recibe como parámetro

        // Realizar la consulta con join a la tabla de facultades, ordenada alfabéticamente
        $docentes = Docente::select('programas.programa', 
                                    DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_masculino"), 
                                    DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"), 
                                    DB::raw("COUNT(*) as total"))
                            ->join('programas', 'docentes.id_programa', '=', 'programas.id_programa')
                            ->when($gestion, function ($query) use ($gestion) {
                                return $query->where('docentes.gestion', $gestion);
                            })
                            ->groupBy('programas.programa')
                            ->orderBy('programas.programa', 'asc') // Ordenar las facultades alfabéticamente
                            ->get();

        return response()->json($docentes);
    }
}
