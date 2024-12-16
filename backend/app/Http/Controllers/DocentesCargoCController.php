<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocentesCargoCController extends Controller
{
    public function index(Request $request)
    {
        $gestion = $request->input('gestion', 2023); // Valor por defecto para el año 2023

        $data = DB::table('docentes')
            ->select('categoria',
                DB::raw('SUM(CASE WHEN sexo = \'M\' THEN 1 ELSE 0 END) as total_masculino'),
                DB::raw('SUM(CASE WHEN sexo = \'F\' THEN 1 ELSE 0 END) as total_femenino'),
                DB::raw('COUNT(*) as total')
            )
            ->where('gestion', $gestion)
            //->where('tipo_cargo', 'C') // Filtrar por tipo_cargo = 'A'
            ->groupBy('categoria')
            ->orderBy('categoria')
            ->get();

        return response()->json([
            'data' => $data,
            'years' => DB::table('docentes')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->pluck('gestion')
        ]);
    }
}

