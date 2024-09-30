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
        Schema::create('becas', function (Blueprint $table) {
            $table->string("ci")->nullable();
            $table->string("paterno")->nullable();
            $table->string("materno")->nullable();
            $table->string("nombre")->nullable();
            $table->string("sexo")->nullable();
            $table->string("carrera");
            $table->string("facultad");
            $table->string("tipo_beca");
            $table->integer("gestion");
           

         
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('becas');
    }
};
