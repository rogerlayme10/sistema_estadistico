<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionPsaCarreraController extends Controller
{
    public function getPsaCarrera(Request $request)
    {
        // Obtener el año de gestión desde el request, si está disponible
        $gestion = $request->input('gestion',);

        // Consulta para obtener las facultades y el total de inscritos y aceptados
        $query = DB::table('admisions')
        ->join('programas', 'admisions.id_programa', '=', 'programas.id_programa')
        ->select(
            'programas.programa',
            DB::raw("SUM(CASE WHEN id_examen = '1' THEN 1 ELSE 0 END) as inscritos"),
            DB::raw("SUM(CASE WHEN estado = 'A' AND admisions.id_examen = '1' THEN 1 ELSE 0 END) as aceptados"),
            
        )
            ->when($gestion, function ($query, $gestion) {
                return $query->where('admisions.gestion', $gestion);
            })
            ->whereNotIn('admisions.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
            ->groupBy('programa')
            ->orderBy('programa', 'asc') // Ordena alfabéticamente por facultad
            ->get();
            

        // Consulta para obtener las gestiones disponibles
        $gestiones = DB::table('admisions')
        ->select('gestion')
        ->distinct()
            ->orderBy('gestion', 'desc')
            ->get();

        // Devolver los datos de facultades y gestiones en formato JSON
        return response()->json([
            'programas' => $query,
            'gestiones' => $gestiones
        ]);
    }
}
