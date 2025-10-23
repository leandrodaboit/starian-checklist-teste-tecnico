<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
    ];

    public function scopeIncompleteFirst($query): Builder
    {
        return $query->orderBy('completed', 'asc')->orderBy('created_at', 'asc');
    }
}
