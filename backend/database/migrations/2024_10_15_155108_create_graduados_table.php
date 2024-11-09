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
        Schema::create('graduados', function (Blueprint $table) {
            $table->integer("id_alumno") ->primary();
            $table->string("nro_dip"); 
            $table->string("paterno")->nullable();
            $table->string("materno")->nullable();
            $table->string("nombres");
            $table->string("sexo");
            $table->date("fec_nac");
            $table->date("fec_inscripcion");
            $table->integer("id_fac");
            $table->string("id_programa");
            $table->integer("id_cod");
            $table->integer("gestion_malla");
            $table->integer("perido");
            $table->integer("id_plan");
            $table->integer("numero_materias_plan");
            $table->integer("numero_materias_apro");
            $table->decimal("nota_aprobacion")->nullable();
            $table->integer("gestion_acta");


            $table->foreign("id_fac")->references("id_fac")->on("facultads")->onDelete("cascade");
            $table->foreign("id_programa")->references("id_programa")->on("programas")->onDelete("cascade");
            //$table->foreign("id_dep")->references("id_dep")->on("departamentos")->onDelete("cascade");
            //$table->foreign("id_prov")->references("id_prov")->on("provincias")->onDelete("cascade");
            //$table->foreign("id_colegio")->references("id_colegio")->on("colegios")->onDelete("cascade");
            $table->foreign("id_cod")->references("id_cod")->on("modalidads")->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('graduados');
    }
};
