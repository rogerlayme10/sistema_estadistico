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
        Schema::create('admisions', function (Blueprint $table) {
            $table->string("nro_dip");
            $table->string("paterno")->nullable();
            $table->string("materno")->nullable();
            $table->string("nombres");
            $table->string("sexo");
            $table->date("fec_nac");
            $table->integer("id_examen");
            $table->string("estado")->nullable();
            $table->integer("id_fac");
            $table->string("id_programa");
            $table->integer("id_pais");
            $table->integer("id_dep");
            //$table->integer("id_colegio");
            $table->string("tipo_col");
            $table->string("turno_col");
            $table->integer("gestion");


            $table->foreign("id_fac")->references("id_fac")->on("facultads")->onDelete("cascade");
            $table->foreign("id_programa")->references("id_programa")->on("programas")->onDelete("cascade");
            $table->foreign("id_dep")->references("id_dep")->on("departamentos")->onDelete("cascade");
            //$table->foreign("id_prov")->references("id_prov")->on("provincias")->onDelete("cascade");
            //$table->foreign("id_colegio")->references("id_colegio")->on("colegios")->onDelete("cascade");
            $table->foreign("id_examen")->references("id_examen")->on("examens")->onDelete("cascade");

        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admisions');
    }
};
