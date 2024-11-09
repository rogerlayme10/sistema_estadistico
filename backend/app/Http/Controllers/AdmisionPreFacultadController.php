<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionPreFacultadController extends Controller
{
    public function getPreFacultad(Request $request)
    {
        // Obtener el año de gestión desde el request, si está disponible
        $gestion = $request->input('gestion',);

        // Consulta para obtener las facultades y el total de inscritos y aceptados
        $query = DB::table('admisions')
        ->join('facultads', 'admisions.id_fac', '=', 'facultads.id_fac')
        ->select(
            'facultads.facultad',
            DB::raw("COUNT(CASE WHEN admisions.id_examen= '2' THEN 1 END) as inscritos"),
            DB::raw("COUNT(CASE WHEN admisions.estado = 'A' AND admisions.id_examen = '2' THEN 1 END) as aceptados")
        )
            ->when($gestion, function ($query, $gestion) {
                return $query->where('admisions.gestion', $gestion);
            })
            ->groupBy('facultads.facultad')
            ->get();

        // Consulta para obtener las gestiones disponibles
        $gestiones = DB::table('admisions')
        ->select('gestion')
        ->distinct()
            ->orderBy('gestion', 'desc')
            ->get();

        // Devolver los datos de facultades y gestiones en formato JSON
        return response()->json([
            'facultades' => $query,
            'gestiones' => $gestiones
        ]);
    }
}
