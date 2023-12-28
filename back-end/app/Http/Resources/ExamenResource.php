<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamenResource extends JsonResource
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
            'jour'=>$this->jour,
            'heure' => $this->heure,
            'salle'=>$this->salle,
            'professeur'=>$this->professeur,
        ];
    }
}
