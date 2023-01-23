<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrUpdateNoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'text'       => 'string|nullable',
            'color_id'   => 'required|exists:colors,id',
            'position_x' => 'required|numeric',
            'position_y' => 'required|numeric',
            'image'      => 'nullable|mimetypes:image/jpeg,image/png'
        ];

        if ('PATCH' == $this->method()) {
            $rules = array_map(function($ruleValue){
                return sprintf('sometimes|%s', $ruleValue);
            }, $rules);
        }

        return $rules;
    }
}
