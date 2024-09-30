<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Programa;
use Illuminate\Http\Request;

class ProgramaController extends Controller
{
    public function getProgramaById($id_programa)
    {
    $programa = Programa::where('id_programa', $id_programa)->first();

    if (!$programa) {
        return response()->json(['message' => 'Programa no encontrado'], 404);
    }

    return response()->json($programa);
    }
}
