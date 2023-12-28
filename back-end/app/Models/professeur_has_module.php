<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\professeur;
use App\Models\module;
use App\Models\annee;
use App\Models\courstdtps;
use App\Models\examen;

class professeur_has_module extends Model
{
    use HasFactory;
    protected $fillable = ['courstdtp_id','annee_id','professeur_id','module_id','section_id'];
    public function professeurs()
    {
        return $this->belongsTo(professeur::class);
    }
    public function annees()
    {
        return $this->belongsTo(annee::class);
    }
    public function modules()
    {
        return $this->belongsTo(module::class);
    }
    public function courstdtps()
    {
        return $this->belongsTo(courstdtps::class);
    }
    public function examen()
    {
        return $this->hasMany(examen::class);
    }
}
