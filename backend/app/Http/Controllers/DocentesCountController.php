<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocentesCountController extends Controller
{
    public function contarDocentesGestion2023()
{
    $count = DB::table('docentes')
                ->where('gestion', 2023)
                ->count();

    return response()->json(['count' => $count]);
}
}
