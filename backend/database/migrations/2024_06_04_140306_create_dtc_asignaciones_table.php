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
        Schema::create('dtc_asignaciones', function (Blueprint $table) {
            $table->integer("id_docente");
            $table->integer("id_gestion");
            $table->integer("id_periodo");
            $table->integer("id_materia");
            $table->integer("id_grupo");
            $table->integer("id_dedicacion");
            $table->integer("id_categoria");
            $table->integer("id_grado");
            $table->string("id_programa");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dtc_asignaciones');
    }
};
