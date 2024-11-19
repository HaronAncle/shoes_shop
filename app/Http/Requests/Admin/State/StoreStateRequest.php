<?php

namespace App\Http\Requests\Admin\State;

use Illuminate\Foundation\Http\FormRequest;

class StoreStateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'foto_url' => 'required|url',
            'title' => 'required|string|max:255',
            'statabody' => 'required|string',
            'views' => 'required|integer',
        ];
    }
}
