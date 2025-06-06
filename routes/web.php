<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Contact;

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

    Route::resource('contact', Contact::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



});


require __DIR__.'/auth.php';


