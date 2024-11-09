<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudiantesTipoColegioRegularController extends Controller
{
    public function getTipoColegioRegular(Request $request)
    {
        // Si se solicita las gestiones
        if ($request->has('gestiones')) {
            $gestiones = DB::table('matriculas')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->get();

            return response()->json($gestiones);
        }

        // Si se solicita los datos filtrados por año (gestión)
        $gestion = $request->input('gestion'); // Año seleccionado para filtrar

        $query = DB::table('matriculas')
            ->select(
                'tipo_col',
                DB::raw("SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as total_masculino"),
                DB::raw("SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as total_femenino"),
                DB::raw('COUNT(DISTINCT matriculas.nro_dip) as total')
            )
            ->when($gestion, function ($q) use ($gestion) {
                return $q->where('gestion', $gestion);
            })
            // Excluir programas con id_programa "EXI", "EDI", "EXQ"
            ->whereNotIn('matriculas.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
            ->where('matriculas.tipo_verificado', '=', 'ANTIGUO')
            ->groupBy('tipo_col')
            ->get();

        return response()->json($query);
    }
}
