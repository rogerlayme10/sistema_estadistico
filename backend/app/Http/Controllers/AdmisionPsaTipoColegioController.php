<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionPsaTipoColegioController extends Controller
{
    public function getPsaTipoColegio(Request $request)
    {
        // Si se solicita las gestiones
        if ($request->has('gestiones')) {
            $gestiones = DB::table('admisions')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->get();

            return response()->json($gestiones);
        }

        // Si se solicita los datos filtrados por año (gestión)
        $gestion = $request->input('gestion'); // Año seleccionado para filtrar

        $query = DB::table('admisions')
            ->select(
                'tipo_col',
                DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_masculino"),
                DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"),
                DB::raw('COUNT(*) as total')
            )
            ->when($gestion, function ($q) use ($gestion) {
                return $q->where('gestion', $gestion);
            })
            ->where('admisions.id_examen', '=', '1')
            ->where('admisions.estado', '=', 'A')
            ->groupBy('tipo_col')
            ->get();

        return response()->json($query);
    }
}
