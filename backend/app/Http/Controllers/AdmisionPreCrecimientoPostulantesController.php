<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionPreCrecimientoPostulantesController extends Controller
{
    public function getPreTasaCrecimientoPostulantesCarrera(Request $request)
    {
        // Obtener las gestiones dinámicamente de la tabla 'admisions'
        $gestiones = DB::table('admisions')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'asc')
            ->pluck('gestion');
    
        // Construir la consulta base
        $query = DB::table('admisions')
            ->join('programas', 'admisions.id_programa', '=', 'programas.id_programa')
            ->select('programas.programa');
    
        // Agregar las columnas dinámicas para cada gestión
        foreach ($gestiones as $gestion) {
            $query->addSelect(
                DB::raw("SUM(CASE WHEN gestion = $gestion AND id_examen = '2' THEN 1 ELSE 0 END) as total_$gestion")
            );
        }
    
        // Agregar la columna total general
        $query->addSelect(DB::raw("COUNT(CASE WHEN id_examen = '2' THEN 1 ELSE NULL END) as total"));
    
        // Ejecutar la consulta
        $result = $query
            ->where('id_examen', '=', '2') // Solo estudiantes psa
            //->where('admisions.estado', '=', 'A') postulantes 
            ->groupBy('programas.programa')
            ->get();
    
        // Calcular las tasas dinámicamente
        $tasas = [];
        for ($i = 1; $i < count($gestiones); $i++) {
            $anioActual = $gestiones[$i];
            $anioAnterior = $gestiones[$i - 1];
            $n = $anioActual - $anioAnterior;
    
            foreach ($result as $row) {
                $totalActual = $row->{"total_$anioActual"} ?? 0;
                $totalAnterior = $row->{"total_$anioAnterior"} ?? 0;
    
                if ($totalAnterior > 0) {
                    $tasa = (pow($totalActual / $totalAnterior, 1 / $n) - 1) * 100;
                } else {
                    $tasa = null; // Evitar división por 0
                }
    
                $tasas[$anioAnterior . '-' . $anioActual][] = $tasa;
            }
        }
    
        return response()->json([
            'gestiones' => $gestiones,
            'datos' => $result,
            'tasas' => $tasas,
        ]);
    }
}
