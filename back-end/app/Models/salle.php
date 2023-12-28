<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\examen;
class salle extends Model
{
    use HasFactory;
    protected $fillable = ['name','capacite','nombresSurveillant'];


    public function Examen()
    {
        return $this->hasMany(examen::class);
    }
}
