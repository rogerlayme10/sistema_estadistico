<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facultad extends Model
{
    protected $table = 'facultads';
    //protected $primaryKey = 'cod_fac';

    protected $fillable = ['id_fac', 'facultad'];
    
    public function programas()
    {
        return $this->hasMany(Programa::class, 'id_fac', 'id_fac');
    }
    public function docentes()
    {
        return $this->hasMany(Docente::class, 'id_fac', 'id_fac');
    }
    public function matriculas()
    {
        return $this->hasMany(Matriculas::class, 'id_fac', 'id_fac');
    }
    
    
}
