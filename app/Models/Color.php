<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Color extends Model
{
    use HasFactory;

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return string
     */
    public function __toString(): string
    {
        return $this->code;
    }

    /**
     * @return HasMany
     */
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class); 
    }
}
