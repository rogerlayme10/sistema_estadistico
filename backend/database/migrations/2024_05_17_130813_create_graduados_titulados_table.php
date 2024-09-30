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
        Schema::create('graduados_titulados', function (Blueprint $table) {
            $table->integer("id_alumno");
            $table->date("fec_defensa");
            $table->string("titulo_tema");
            $table->integer("id_modalidad");
            $table->integer("calificacion");
            $table->date("fec_DA");
            $table->date("fec_TPN");
            $table->string("grado academico");
            $table->integer("id_graduacion");
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('graduados_titulados');
    }
};
