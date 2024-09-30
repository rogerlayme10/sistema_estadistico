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
            $table->string("a_paterno")->nullable();
            $table->string("materno")->nullable();
            $table->string("nombres");
            $table->string("sexo");
            $table->date("fec_nac");
            $table->string("id_programa");
            $table->integer("cod_fac");
            $table->string("cargo");
            $table->string("tipo_cargo");
            $table->string("categoria");
            $table->string("nivel_acad");
            $table->string("titulo_acad")->nullable();
            $table->integer("permanencia") ;
            $table->string("carga_horaria");
            $table->integer("gestion");
           
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
