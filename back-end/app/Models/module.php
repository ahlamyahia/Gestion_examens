<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class module extends Model
{
    use HasFactory;
    use HasFactory;
    protected $fillable = ['name','code','filiere_id','semestre_id','Groupe'];
}
