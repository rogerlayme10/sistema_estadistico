<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocentesServicioEdadController extends Controller
{
    public function getDocentesYGestiones(Request $request, $gestion = null)
    {
        $gestion = $gestion ?? '2023';
        
        // Reemplazamos TIMESTAMPDIFF con EXTRACT(YEAR FROM AGE())
        $docentes = DB::table('docentes')
            ->select(
                DB::raw('EXTRACT(YEAR FROM AGE(CURRENT_DATE, fec_nac)) as edad'),  // Calcular edad desde fec_nac
                'permanencia', 
                DB::raw('COUNT(*) as total')
            )
            ->where('gestion', $gestion)
            ->groupBy('edad', 'permanencia')
            ->orderBy('edad', 'asc')
            ->get();
    
        $gestiones = DB::table('docentes')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'desc')
            ->pluck('gestion');
    
        $data = [];
        foreach ($docentes as $docente) {
            if (!isset($data[$docente->edad])) {
                $data[$docente->edad] = [
                    'edad' => $docente->edad,
                    'permanencias' => [],
                    'total' => 0
                ];
            }
            $data[$docente->edad]['permanencias'][$docente->permanencia] = $docente->total;
            $data[$docente->edad]['total'] += $docente->total;
        }
    
        $result = array_values($data);
    
        return response()->json([
            'docentes' => $result,
            'gestiones' => $gestiones,
        ]);
    }
    
}
