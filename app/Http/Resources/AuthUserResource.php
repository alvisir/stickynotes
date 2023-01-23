<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
{
    /**
     * @var string
     */
    public string $message;

    public function __construct(mixed $resource, string $message)
    {
        parent::__construct($resource);
        $this->message = $message;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'token'   => $this->createToken($this->username)->plainTextToken,
            'message' => $this->message,
            'user'    => $this->username,
        ];
    }
}
