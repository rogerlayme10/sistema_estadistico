<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

class MovilidadPrincipalController extends Controller
{
    public function getMovilidadPorGestion()
    {
        // Realiza la consulta a la base de datos
        $administrativosPorGestion = DB::table('tramites')
            ->select(DB::raw('gestion, COUNT(*) as total_tramites'))
            ->groupBy('gestion')
            ->orderBy('gestion', 'asc')
            ->get();

        // Retorna los resultados en formato JSON
        return response()->json($administrativosPorGestion);
    }
}
