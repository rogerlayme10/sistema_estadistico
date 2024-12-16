<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduados extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'graduados';

    // Campos de la tabla
    protected $fillable = [
        'sexo',          // Sexo del graduado
        'nota_aprobacion', // Nota de aprobación
        'gestion_acta'   // Gestión del acta
    ];
}
