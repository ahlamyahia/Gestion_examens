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
        Schema::create('surveillants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professeur_id')
            ->constrained('professeurs')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreignId('examen_id')
            ->constrained('examens')
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
        Schema::dropIfExists('surveillants');
    }
};
