<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocentesCountGraficController extends Controller
{
    public function getDocentesPorGestion()
    {
        // Realiza la consulta a la base de datos
        $docentesPorGestion = DB::table('docentes')
            ->select(DB::raw('gestion, COUNT(*) as total_docentes'))
            ->groupBy('gestion')
            ->orderBy('gestion', 'asc')
            ->get();

        // Retorna los resultados en formato JSON
        return response()->json($docentesPorGestion);
    }
}
