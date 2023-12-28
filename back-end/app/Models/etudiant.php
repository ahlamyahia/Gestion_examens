<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\filiere;

class etudiant extends Model
{
    use HasFactory;
    protected $fillable = ['num_apogee','cne','nom','prenom','date_naissance','cin','filiere_id'];
    
 
   public function filiere()
     {
         return $this->belongsTo(filiere::class);
     }
}
