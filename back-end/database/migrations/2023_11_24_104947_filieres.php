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
        Schema::create('filieres', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('type_id')
                  ->constrained('types')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');  
            $table->foreignId('departement_id')
                  ->constrained('departements')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');  
            $table->foreignId('professeur_id')->nullable()
                  ->constrained('professeurs')
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
        Schema::dropIfExists('filieres');
    }
};
