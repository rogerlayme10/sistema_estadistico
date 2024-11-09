<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesRegularCrecimientoCarreraController extends Controller
{
    public function getTasaCrecimientoRegularCarrera(Request $request)
    {
        // Obtener las gestiones dinámicamente de la tabla 'matriculas'
        $gestiones = DB::table('matriculas')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'asc')
            ->pluck('gestion');

        // Construir la consulta base
        $query = DB::table('matriculas')
            ->join('programas', 'matriculas.id_programa', '=', 'programas.id_programa')
            ->select('programas.programa');

        // Agregar las columnas dinámicas para cada gestión
        foreach ($gestiones as $gestion) {
            $query->addSelect(
                DB::raw("COUNT(DISTINCT CASE WHEN gestion = $gestion AND tipo_verificado = 'ANTIGUO' THEN matriculas.nro_dip ELSE NULL END) as total_$gestion")

            );
        }

        // Agregar la columna total general
        $query->addSelect(DB::raw("COUNT(CASE WHEN tipo_verificado = 'ANTIGUO' THEN 1 ELSE NULL END) as total"));

        // Ejecutar la consulta
        $result = $query
            ->where('tipo_verificado', '=', 'ANTIGUO') // Solo estudiantes nuevos
            // Excluir programas con id_programa "EXI", "EDI", "EXQ"
            ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
            
            ->groupBy('programas.programa')
            ->get();

        return response()->json([
            'gestiones' => $gestiones, 
            'datos' => $result
        ]);
    }
}
