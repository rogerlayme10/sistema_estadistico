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
        Schema::create('contrados', function (Blueprint $table) {
            $table->integer(">CI");
            $table->integer(">id_contrato");
            $table->date("fec_contrato");
            $table->integer(">id_unidad");
            $table->integer("Unidad");
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contrados');
    }
};
