<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\filiere;
use App\Models\examen;
class professeur extends Model
{
    use HasFactory;
    use HasFactory;
    // protected $fillable = ['nom','prenom','grade','cin','telephone'];
    protected $fillable = ['professeur','grade','cin','telephone'];
    public function filiere()
    {
        return $this->hasOne(filiere::class);
    }
    public function professeur()
    {
        return $this->hasMany(professeur::class);
    }
//     public function professeur()
//     {
//         return $this->hasManyThrough(examen::class, professeur_has_module::class);
//     }

public function examen()
{
    return $this->hasMany(examen::class);
}
}
