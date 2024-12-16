<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionEspecialFacultadController extends Controller
{
    public function getEspecialFacultad(Request $request)
    {
        // Obtener el año de gestión desde el request, si está disponible
        $gestion = $request->input('gestion');

        // Consulta para obtener las facultades y el total de inscritos y aceptados
        $query = DB::table('admisions')
            ->join('facultads', 'admisions.id_fac', '=', 'facultads.id_fac')
            ->select(
                'facultads.facultad',
                // Total de inscritos que NO tienen id_examen en (1, 2)
                DB::raw("COUNT(*) as inscritos"),
                // Total de aceptados con estado = 'A' y que NO tienen id_examen en (1, 2)
                DB::raw("SUM(CASE WHEN admisions.estado = 'A' THEN 1 ELSE 0 END) as aceptados")
            )
            ->whereNotIn('admisions.id_examen', [1, 2]) // Filtrar registros con id_examen fuera de 1 y 2
            ->when($gestion, function ($query, $gestion) {
                return $query->where('admisions.gestion', $gestion);
            })
            ->groupBy('facultads.facultad') // Agrupar por facultad
            ->get();

        // Consulta para obtener las gestiones disponibles
        $gestiones = DB::table('admisions')
            ->select('gestion')
            ->distinct() // Obtener solo gestiones únicas
            ->orderBy('gestion', 'desc') // Ordenar de forma descendente
            ->get();

        // Devolver los datos de facultades y gestiones en formato JSON
        return response()->json([
            'facultades' => $query,
            'gestiones' => $gestiones
        ]);
    }
}
