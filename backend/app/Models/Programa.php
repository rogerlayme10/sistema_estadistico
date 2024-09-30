<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programa extends Model
{
    protected $table = 'programas';
    //protected $primaryKey = 'id_programa';
    public $incrementing = false; // Indica que la clave primaria no es autoincremental
    protected $keyType = 'string'; // Indica que la clave primaria es de tipo string

    public function facultad()
    {
        return $this->belongsTo(Facultad::class, 'cod_fac', 'cod_fac');
    }
    public function docentes()
    {
        return $this->hasMany(Docente::class, 'id_programa', 'id_programa');
    }
    
}

