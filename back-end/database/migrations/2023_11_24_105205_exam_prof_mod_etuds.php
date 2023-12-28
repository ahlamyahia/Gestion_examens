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
        Schema::create('exam_prof_mod_etuds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('examen_id')
            ->constrained('examens')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreignId('professeur_has_mod_has_etuds_id')
            ->constrained('professeur_has_mod_has_etuds')
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
        Schema::dropIfExists('exam_prof_mod_etuds');
    }
};
