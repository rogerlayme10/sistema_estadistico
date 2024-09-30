<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminCountController extends Controller
{
    public function countAdministrativos()
    {
        $count = DB::table('administrativos')->count();

        return response()->json([
            'count' => $count,
        ]);
    }
}

