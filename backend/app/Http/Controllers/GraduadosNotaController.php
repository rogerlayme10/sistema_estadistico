<?php

namespace App\Http\Controllers;

use App\Models\Graduados;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraduadosNotaController extends Controller
{
    public function getGraduadosNotas(Request $request)
    {
        // Obtener todas las gestiones únicas ordenadas
        $gestiones = Graduados::select('gestion_acta')
                             ->distinct()
                             ->orderBy('gestion_acta', 'asc')
                             ->get();
        
        // Si se ha pasado un parámetro 'gestion', filtrar las notas para esa gestión
        $gestionSeleccionada = $request->input('gestion');
        if ($gestionSeleccionada) {
            // Filtrar por la gestión seleccionada
            $notas = Graduados::where('gestion_acta', $gestionSeleccionada)
                             ->select('nota_aprobacion', 'sexo')
                             ->get();

            // Aquí clasificar las notas según los rangos que mencionaste (0-60, 61-80, etc.)
            $notasClasificadas = $this->clasificarNotas($notas);

            return response()->json([
                'gestiones' => $gestiones,
                'notas' => $notasClasificadas
            ]);
        }

        return response()->json([
            'gestiones' => $gestiones,
            'notas' => []
        ]);
    }

    // Función para clasificar las notas en los rangos que mencionaste
    private function clasificarNotas($notas)
    {
        $clasificados = [
            'simplemente_aprobado' => ['M' => 0, 'F' => 0],
            'aprobado' => ['M' => 0, 'F' => 0],
            'aprobado_felicitaciones' => ['M' => 0, 'F' => 0],
            'honorificamente_aprobado' => ['M' => 0, 'F' => 0]
        ];

        foreach ($notas as $nota) {
            $rango = $this->obtenerRango($nota->nota_aprobacion);

            if ($rango) {
                $clasificados[$rango][$nota->sexo]++;
            }
        }

        return $clasificados;
    }

    // Función para determinar el rango de la nota
    private function obtenerRango($nota)
    {
        if ($nota >= 0 && $nota <= 60) {
            return 'simplemente_aprobado';
        } elseif ($nota >= 61 && $nota <= 80) {
            return 'aprobado';
        } elseif ($nota >= 81 && $nota <= 90) {
            return 'aprobado_felicitaciones';
        } elseif ($nota >= 91 && $nota <= 100) {
            return 'honorificamente_aprobado';
        }

        return null;
    }
}
