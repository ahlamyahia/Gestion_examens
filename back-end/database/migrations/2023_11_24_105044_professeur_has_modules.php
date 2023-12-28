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
        Schema::create('professeur_has_modules', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('courstdtp_id')
            // ->constrained('courstdtps')
            // ->onDelete('cascade')
            // ->onUpdate('cascade');
            $table->foreignId('annee_id')->nullable()
            ->constrained('annees')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreignId('professeur_id')
            ->constrained('professeurs')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreignId('module_id')
            ->constrained('modules')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreignId('section_id')->nullable()
            ->constrained('sections')
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
        Schema::dropIfExists('professeur_has_modules');
    }
};
