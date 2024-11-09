<?php

namespace App\Http\Controllers;

use App\Models\Facultad;
use Illuminate\Http\Request;

class FacultadController extends Controller
{
    // Método para obtener todas las facultades
    public function getFacultades()
    {
    $facultades = Facultad::select('id_fac', 'facultad')
                          ->distinct()
                          ->orderBy('facultad', 'asc')
                          ->get();
    return response()->json($facultades);
    }

    // Método para obtener programas por facultad
    public function getProgramasByFacultad($id_fac)
    {
        $programas = Facultad::where('id_fac', $id_fac)->first()->programas;
        return response()->json($programas);
    }
}
