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
        Schema::create('contacts', function(Blueprint $table) {
                $table->id();
                $table->string('lastname');
                $table->string('firstname');
                $table->string('email')->nullable();
                $table->string('phoneNumber');
                $table->string('notes')->nullable();
                $table->string('image_path')->nullable();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->timestamps();


            }
        );
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('contact');
    }
};
