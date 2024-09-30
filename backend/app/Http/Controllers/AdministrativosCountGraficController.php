<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdministrativosCountGraficController extends Controller
{
    public function getAdministrativosPorGestion()
    {
        // Realiza la consulta a la base de datos
        $administrativosPorGestion = DB::table('administrativos')
            ->select(DB::raw('gestion, COUNT(*) as total_administrativos'))
            ->groupBy('gestion')
            ->orderBy('gestion', 'asc')
            ->get();

        // Retorna los resultados en formato JSON
        return response()->json($administrativosPorGestion);
    }
}
