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
            $table->string('nro_dip',15) ->primary();
            $table->string('paterno',64)->nullable();
            $table->string('materno',64)->nullable();
            $table->string('nombres',128);
            $table->string('sexo',1);
            $table->date('fec_nac')->nullable();
            $table->integer('id_pais')->nullable();
            $table->integer('id_dep')->nullable();
            $table->integer('id_prov')->nullable();
            $table->string('id_loc')->nullable();
            $table->string('area_nac',60);
            $table->string('id_lugar',1);
            $table->string('direccion',60)->nullable();
            $table->string('egr_gestion')->nullable();
            $table->string('tel_per')->nullable();
            $table->string('tel_urg')->nullable();
            $table->integer('estado_civil')->nullable();
            $table->string('tel_whatsapp')->nullable();
            $table->string('email',50)->nullable();
            $table->integer('id_colegio');
            $table->string('colegio',150);
            $table->integer('id_colegio_sie')->nullable();
            $table->integer('id_pais_col')->nullable();
            $table->integer('id_dep_col')->nullable();
            $table->integer('id_prov_col')->nullable();
            $table->integer('id_loc_col')->nullable();
            $table->integer('id_procedencia')->nullable();
            $table->string('localidad',60)->nullable();
            $table->string('area',1)->nullable();
            $table->string('turno',1)->nullable();
            $table->string('tipo',1)->nullable();

             

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
