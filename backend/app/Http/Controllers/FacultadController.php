<?php

namespace App\Http\Controllers;

use App\Models\Facultad;
use Illuminate\Http\Request;

class FacultadController extends Controller
{
    // Método para obtener todas las facultades
    public function getFacultades()
    {
    $facultades = Facultad::select('cod_fac', 'facultad')
                          ->distinct()
                          ->orderBy('facultad', 'asc')
                          ->get();
    return response()->json($facultades);
    }

    // Método para obtener programas por facultad
    public function getProgramasByFacultad($cod_fac)
    {
        $programas = Facultad::where('cod_fac', $cod_fac)->first()->programas;
        return response()->json($programas);
    }
}
