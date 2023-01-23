<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    const NOTE_IMAGES_DIR = 'note-images';

    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = [
        'file',
        'mime_type',
        'note_id',
    ];

    /**
     * @return BelongsTo
     */
    public function note(): BelongsTo
    {
        return $this->belongsTo(Note::class);
    }

    /**
     * @param boolean $base64
     * @return string
     */
    public function getBase64FileData($srcFormat = false)
    {
        $filePath = sprintf('%s/%s', self::NOTE_IMAGES_DIR, $this->file);
        $file = base64_encode(Storage::get($filePath));

        $data = [
            'mimeType' => $this->mime_type,
            'file'     => $file,
        ];

        if ($srcFormat) {
            return vsprintf('data:%s;base64, %s', $data);
        }

        return $data;
    }
}
