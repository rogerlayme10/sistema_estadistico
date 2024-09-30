<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FacultadGraficoController extends Controller
{
    public function index()
    {
        // Obtener las facultades distintas
        $facultades = DB::table('facultads')->distinct()->pluck('facultad');

        return response()->json($facultades);
    }
}
