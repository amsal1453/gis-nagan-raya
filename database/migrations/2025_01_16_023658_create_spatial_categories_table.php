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
        Schema::create('spatial_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spatial_id')->constrained('spatial_data')->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            // Optional: Add unique constraint to prevent duplicate entries
            $table->unique(['spatial_id', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spatial_categories');
    }
};
