<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class EstudiantesCountController extends Controller
{
    public function countEstudiantes()
    {
        $count = DB::table('uatf_datos')->count();
        return response()->json([
            'count' => $count,
        ]);
    }
}
