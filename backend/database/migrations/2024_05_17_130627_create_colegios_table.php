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
            $table->integer("id_colegio")->primary();
            $table->string("colegio");
            $table->string("id_tipo");
            $table->string("turno");
            $table->string("area");
            $table->integer("id_pais");
            $table->integer("id_dep");
            $table->integer("id_prov");
            $table->integer("id_loc");



            $table->foreign("id_pais")->references("id_pais")->on("pais")->onDelete("cascade");
            $table->foreign("id_dep")->references("id_dep")->on("departamentos")->onDelete("cascade");
            $table->foreign("id_prov")->references("id_prov")->on("provincias")->onDelete("cascade");
            $table->foreign("id_loc")->references("id_loc")->on("localidads")->onDelete("cascade");

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
