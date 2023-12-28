<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EtudiantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'num_apogee'=>$this->num_apogee,
            'cne'=>$this->cne,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'date_naissance'=>$this->date_naissance,
            'cin'=>$this->cin,
            'filiere'=>$this->filiere,
        
        ];
    }
}
