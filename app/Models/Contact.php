<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id',
        'firstname',
        'lastname',
        'email',
        'phoneNumber',
        'notes',
        'image_path'

    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getFullName() {
        return "{$this->lastname} {$this->firstname}";
    }
}
