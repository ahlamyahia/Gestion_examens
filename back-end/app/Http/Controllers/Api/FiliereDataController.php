<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\type;
use App\Models\departement;
use App\Models\professeur;


class FiliereDataController extends Controller
{
    public function types()
    {
        $types = type::all();

        return response()->json( $types);
}
public function departements()
{
    $departements = departement::all();

    return response()->json( $departements);
}
public function professeurs()
{
    $professeurs = professeur::all();

    return response()->json( $professeurs);
}
}

