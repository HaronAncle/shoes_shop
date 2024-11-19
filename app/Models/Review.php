<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    
    protected $table = 'reviews';
    protected $fillable = [
        'mark',
        'description',
        'item_id',
        'user_id',
        'created_at',
    ];

    public $timestamps = false;
}
