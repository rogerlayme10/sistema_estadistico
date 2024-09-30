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
        Schema::create('alm_programacions', function (Blueprint $table) {
            $table->integer("id_alumno");
            $table->integer("id_gestion");
            $table->integer("id_periodo");
            $table->integer("idmateria");
            $table->integer("id_grupo");
            $table->integer("nota");
            $table->integer("nota_2da");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alm_programacions');
    }
};
