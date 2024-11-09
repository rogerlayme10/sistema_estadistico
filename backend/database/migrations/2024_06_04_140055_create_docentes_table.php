<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('docentes', function (Blueprint $table) {
            $table->string("id_docente");
            $table->string("paterno")->nullable();
            $table->string("materno")->nullable();
            $table->string("nombres");
            $table->string("sexo");
            $table->date("fec_nac");
            $table->string("id_programa");
            $table->integer("id_fac");
            $table->string("cargo");
            $table->string("tipo_cargo");
            $table->string("categoria");
            $table->string("nivel_acad");
            $table->string("titulo_acad")->nullable();
            $table->integer("permanencia") ;
            $table->string("carga_horaria");
            $table->integer("gestion");

            $table->foreign("id_fac")->references("id_fac")->on("facultads")->onDelete("cascade"); 
            $table->foreign("id_programa")->references("id_programa")->on("programas")->onDelete("cascade");
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('docentes');
    }
};
