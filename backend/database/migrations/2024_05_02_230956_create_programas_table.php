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
        Schema::create('programas', function (Blueprint $table) {
        
            $table->string("id_programa")->primary();
            $table->string("programa");
            $table->integer("cod_fac");
            $table->string("tipo_academico");
            

            //$table->foreign("cod_fac")->references("cod_fac")->on("facultads")->onDelete("cascade"); 

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programas');
    }
};
