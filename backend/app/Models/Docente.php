<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;

    protected $table = 'docentes'; // Nombre de la tabla en la base de datos

    protected $fillable = [ // Columnas que se pueden asignar en masa
        
        'cargo',
        'sexo',
        'gestion',
        'nivel_acad',
        'categoria',
        'gestion',
        'titulo_acad',
        'nivel_acad',
        'edad',
        'sexo',
    ];
    public function facultad()
    {
        return $this->belongsTo(Facultad::class, 'cod_fac', 'cod_fac');
    }
    public function programa()
    {
        return $this->belongsTo(programa::class, 'id_programa', 'id_programa');
    }
}