<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BecaPrincipalController extends Controller
{
    public function getBecaPorGestion()
    {
        // Realiza la consulta a la base de datos
        $administrativosPorGestion = DB::table('becas')
            ->select(DB::raw('gestion, COUNT(*) as total_becas'))
            ->groupBy('gestion')
            ->orderBy('gestion', 'asc')
            ->get();

        // Retorna los resultados en formato JSON
        return response()->json($administrativosPorGestion);
    }
}
