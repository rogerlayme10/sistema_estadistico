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
        Schema::create('matriculas', function (Blueprint $table) {
            $table->string("nro_dip");
            $table->integer("id_alumno");
            $table->string("paterno")->nullable();
            $table->string("materno")->nullable();
            $table->string("nombres");
            $table->string("sexo");
            $table->integer("id_fac");
            $table->string("id_programa");
            $table->integer("periodo");
            $table->string("tipo_verificado");
            $table->boolean('programa_mat');
            $table->integer("id_dep");
            $table->integer("id_prov");
            $table->string("tipo_col");
            $table->integer("gestion");


            $table->foreign("id_fac")->references("id_fac")->on("facultads")->onDelete("cascade");
            $table->foreign("id_programa")->references("id_programa")->on("programas")->onDelete("cascade");
            $table->foreign("id_dep")->references("id_dep")->on("departamentos")->onDelete("cascade");
            $table->foreign("id_prov")->references("id_prov")->on("provincias")->onDelete("cascade");
            //$table->foreign("id_colegio")->references("id_colegio")->on("colegios")->onDelete("cascade");
            $table->foreign("nro_dip")->references("nro_dip")->on("uatf_datos")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matriculas');
    }
};
