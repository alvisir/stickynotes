<?php

namespace App\Http\Resources;

use JsonSerializable;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            'id'          => $this->id,
            'content'     => $this->text,
            'color'       => $this->color->id,
            'coordinates' => $this->coordinates(),
        ];

        if ($this->image) {
            $data['image'] = $this->image->getBase64FileData(true);
        }

        return $data;
    }
}
