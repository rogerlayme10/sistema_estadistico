<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facultad extends Model
{
    protected $table = 'facultads';
    //protected $primaryKey = 'cod_fac';

    protected $fillable = ['cod_fac', 'facultad'];
    
    public function programas()
    {
        return $this->hasMany(Programa::class, 'cod_fac', 'cod_fac');
    }
    public function docentes()
    {
        return $this->hasMany(Docente::class, 'cod_fac', 'cod_fac');
    }
    
    
}
