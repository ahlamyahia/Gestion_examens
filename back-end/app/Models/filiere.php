<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\type;
use App\Models\etudiant;
use App\Models\departement;
use App\Models\professeur;
class filiere extends Model
{
    use HasFactory;
    protected $fillable = ['name','type_id','departement_id','professeur_id'];
   

    public function type()
    {
        return $this->belongsTo(type::class);
    }
    public function Etudiant()
    {
        return $this->hasMany(etudiant::class);
    }
   
    public function departement()
    {
        return $this->belongsTo(departement::class);
    }
    
    public function professeur()
    {
        return $this->belongsTo(professeur::class);
    }
}
