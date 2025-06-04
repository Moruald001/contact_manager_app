<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth','verified'])->group(function(){
    Route::get('/dashboard', function (){
        $user = Auth::user();
        return Inertia::render('Dashboard', [
            'contats' => User::find($user->id)->contacts()->orderBy('lastname')->get()
        ]);
    })->name('dashboard');

    Route::resource('contact', ContactController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('proifle.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('proifle.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('proifle.destroy');



});


require __DIR__.'/auth.php';


