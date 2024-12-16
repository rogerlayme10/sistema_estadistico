<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraduadosPermanenciaController extends Controller
{
    public function getGraduadosPermanencia(Request $request)
    {
        $type = $request->query('type'); // Determina el tipo de solicitud

        if ($type === 'gestiones') {
            // Obtener las gestiones únicas
            $gestiones = DB::table('graduados')
                ->select('gestion_acta')
                ->distinct()
                ->orderBy('gestion_acta', 'asc')
                ->pluck('gestion_acta');

            return response()->json($gestiones);
        } else {
            // Obtener los datos de permanencia
            $gestion = $request->query('gestion'); // Filtro de gestión

            $query = DB::table('graduados')
                ->selectRaw(
                    'EXTRACT(YEAR FROM fec_inscripcion) as anio_ingreso, 
                     gestion_acta - EXTRACT(YEAR FROM fec_inscripcion) as anos_programa, 
                     COUNT(*) as num_estudiantes'
                )
                ->groupBy('anio_ingreso', 'anos_programa')
                ->orderBy('anio_ingreso', 'asc');

            if ($gestion) {
                $query->where('gestion_acta', $gestion);
            }

            $resultados = $query->get();

            return response()->json($resultados);
        }
    }
}
