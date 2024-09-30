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
        Schema::create('administrativos', function (Blueprint $table) {
            $table->string("ci");
            $table->string("paterno")->nullable();
            $table->string("materno")->nullable();
            $table->string("nombre");
            $table->string("sexo");
            $table->date("fec_nac");
            $table->string("tipo_contrato")->nullable();
            $table->string("unidad")->nullable();
            $table->string("actividad")->nullable();
            $table->string("cargo")->nullable();
            $table->string("nivel_acad");
            $table->string("profesion")->nullable();
            $table->date("fec_ingr");
            $table->integer("gestion");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrativos');
    }
};
