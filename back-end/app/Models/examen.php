<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\salle;
use App\Models\professeur;

class examen extends Model
{
    use HasFactory;
    protected $fillable = ['jour','heure','salle_id','professeur_id'];

    public function salle()
      {
          return $this->belongsTo(salle::class);
      }

      public function professeur()
      {
          return $this->belongsTo(professeur::class);
      }
}
