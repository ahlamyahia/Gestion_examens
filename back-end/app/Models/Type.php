<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\filiere;
class Type extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    public function filieres()
    {
        return $this->hasMany(filiere::class);
    }
}
