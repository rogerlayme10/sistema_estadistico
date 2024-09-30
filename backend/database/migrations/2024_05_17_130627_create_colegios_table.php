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
        Schema::create('colegios', function (Blueprint $table) {
            $table->integer("id_colegio");
            $table->string("colegio");
            $table->integer("id_tipo");
            $table->string("turno");
            $table->string("area");
            $table->integer("cod_pais");
            $table->integer("cod_dep");
            $table->integer("cod_prov");
            $table->integer("cod_loc");
            $table->integer("id_cie");
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('colegios');
    }
};
