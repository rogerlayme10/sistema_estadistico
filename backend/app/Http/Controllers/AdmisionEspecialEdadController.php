<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmisionEspecialEdadController extends Controller
{
    public function getEspecialEdadSexo(Request $request)
    {
        // Verificar si se ha enviado el parámetro 'gestion'
        $gestion = $request->input('gestion');

        // Si se envía la gestión, se obtienen los datos de edad y sexo
        if ($gestion) {
            $result = DB::table('admisions')
                ->select(
                    DB::raw('EXTRACT(YEAR FROM AGE(fec_nac)) AS edad'),
                    DB::raw('SUM(CASE WHEN sexo = \'M\' THEN 1 ELSE 0 END) AS total_m'),
                    DB::raw('SUM(CASE WHEN sexo = \'F\' THEN 1 ELSE 0 END) AS total_f'),
                    DB::raw('COUNT(*) AS total')
                )
                ->where('gestion', $gestion)
                ->where('admisions.estado', '=', 'A')
                // Excluir programas con id_programa "EXI", "EDI", "EXQ"
                ->whereNotIn('admisions.id_programa', ['EDI', 'EDT', 'EXI', 'EXQ'])
                ->whereNotIn('admisions.id_examen', [1, 2])//menbos los de psa y pre
                ->groupBy('edad')
                ->orderBy('edad')
                ->get();

            return response()->json($result);
        }

        // Si no se envía la gestión, se obtienen las gestiones disponibles
        $gestiones = DB::table('admisions')
            ->select('gestion')
            ->distinct()
            ->orderBy('gestion', 'desc')
            ->get();

        return response()->json($gestiones);

    }
}
