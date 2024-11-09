<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matriculas extends Model
{
    use HasFactory;
    protected $table = 'matriculados'; // Nombre de la tabla en la base de datos
    protected $fillable = [ // Columnas que se pueden asignar en masa
        
        'sexo',
        'id_fac',
        'id_programa',
        'periodo',
        'tipo_verificado',
        'programa_mat',
        'id_dep',
        'ide_prov',
        'tipo_col',
        'gestion',
    ];
    public function facultad()
    {
        return $this->belongsTo(Facultad::class, 'id_fac', 'id_fac');
    }
}
