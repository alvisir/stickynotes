<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = [
        'text',
        'color_id',
        'position_x',
        'position_y',
        'user_id',
    ];

    public static function boot()
    {
        parent::boot();

        self::deleting(function($note) {
            if ($note->image) {
                $file = sprintf('%s/%s', Image::NOTE_IMAGES_DIR, $note->image->file);
                Storage::delete($file);
            }
        });
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class);
    }

    /**
     * @return HasOne
     */
    public function image(): HasOne
    {
        return $this->hasOne(Image::class);
    }

    /**
     * Return note position coordinates in array format
     *
     * @return array
     */
    public function coordinates(): array
    {
        return [
            'x' => $this->position_x,
            'y' => $this->position_y,
        ];
    }
}
