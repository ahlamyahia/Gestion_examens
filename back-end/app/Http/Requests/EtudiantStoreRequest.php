<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EtudiantStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'num_apogee'=> ['required'],
            'cne'=> ['required'],
            'nom'=> ['required'],
            'prenom'=> ['required'],
            'date_naissance'=>['required'],
            'cin'=> ['required'],
            'filiere_id'=> ['required'],
        ];
    }
}
