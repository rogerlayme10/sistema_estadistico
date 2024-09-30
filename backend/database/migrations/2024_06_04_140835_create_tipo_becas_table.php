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
        Schema::create('tipo_becas', function (Blueprint $table) {
            $table->integer("id_beca");
            $table->string("beca");
            $table->string("estado");
            $table->string("beca_completa");
            $table->string("beca_parcial");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipo_becas');
    }
};
