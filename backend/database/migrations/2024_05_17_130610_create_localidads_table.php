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
        Schema::create('localidads', function (Blueprint $table) {
            $table->integer("cod_loc");
            $table->string("localidad");
            $table->integer("cod_dep");
            $table->integer("cod_prov");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('localidads');
    }
};
