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
        Schema::create('professeur_has_mod_has_etuds', function (Blueprint $table) {
            $table->id();
            $table->integer('professeur_has_mod_courstdtp-idcourstdtp');
           
            $table->foreignId('etudiant_id')
            ->constrained('etudiants')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreignId('professeur_has_module_id')
            ->constrained('professeur_has_modules')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professeur_has_mod_has_etuds');
    }
};
