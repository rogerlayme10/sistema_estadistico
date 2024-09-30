<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdministrativosUnidadTipoContratoController extends Controller
{
    //
    public function getUnidadTipoContrato(Request $request)
    {
        $gestion = $request->input('gestion',2023);// Valor por defecto para el año 2023

        $data = DB::table('administrativos')
            ->select('unidad', 
            DB::raw('SUM(CASE WHEN tipo_contrato = \'PERSONAL PERMANENTE\' THEN 1 ELSE 0 END) as total_permanente'),
            DB::raw('SUM(CASE WHEN tipo_contrato = \'PERSONAL NO PERMANENTE Y DE CONTRATO FIJO\' THEN 1 ELSE 0 END) as total_nopermanente'),
            DB::raw('SUM(CASE WHEN tipo_contrato = \'JORNALEROS\' THEN 1 ELSE 0 END) as total_jornalero'),
            DB::raw('SUM(CASE WHEN tipo_contrato = \'PERSONAL DE GRANJAS\' THEN 1 ELSE 0 END) as total_granjas'),
            DB::raw('COUNT(*) as total')
            )
            ->where('gestion', $gestion)
            ->groupBy('unidad')
            ->orderBy('unidad')
            ->get();

        return response()->json([
            'data' => $data,
            'years' => DB::table('administrativos')
                ->select('gestion')
                ->distinct()
                ->orderBy('gestion', 'desc')
                ->pluck('gestion')
            ]);
  
        
    }
}
