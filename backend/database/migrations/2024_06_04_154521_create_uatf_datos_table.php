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
        Schema::create('uatf_datos', function (Blueprint $table) {
            $table->string('nro_dip');
            $table->string('id_ra');
            $table->string('paterno')->nullable();
            $table->string('materno')->nullable();
            $table->string('nombres');
            $table->string('sexo');
            $table->integer('id_pais')->nullable();
            $table->integer('id_dep')->nullable();
            $table->integer('id_prov')->nullable();
            $table->integer('id_loc')->nullable();
            $table->string('id_colegio')->nullable();
            $table->string('fec_nac')->nullable();
            $table->string('celular')->nullable();
            $table->integer('estado_civil');
            $table->string('email')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uatf_datos');
    }
};
