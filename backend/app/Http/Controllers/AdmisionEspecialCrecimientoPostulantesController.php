<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionEspecialCrecimientoPostulantesController extends Controller
{
    public function getEspecialTasaCrecimientoPostulantesCarrera(Request $request)
    {
        // Obtener las gestiones dinámicamente de la tabla 'matriculas'
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
                DB::raw("SUM(CASE WHEN gestion = $gestion AND id_examen NOT IN (1, 2)  THEN 1 ELSE 0 END) as total_$gestion")
            );
        }

        // Agregar la columna total general
        $query->addSelect(DB::raw("COUNT(CASE WHEN id_examen NOT IN (1, 2)  THEN 1 ELSE NULL END) as total"));

        // Ejecutar la consulta
        $result = $query
            ->whereNotIn('admisions.id_examen', [1, 2])//menbos los de psa y pre
            // Excluir programas con id_programa "EXI", "EDI", "EXQ"
            ->whereNotIn('admisions.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
            //->where('admisions.estado', '=', 'A')
            ->orderBy('programa', 'asc')
            ->groupBy('programas.programa')
            ->get();

        return response()->json([
            'gestiones' => $gestiones, 
            'datos' => $result
        ]);
    }
}
