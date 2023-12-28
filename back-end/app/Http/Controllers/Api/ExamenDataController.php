<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\salle;
use App\Models\professeur_has_module;
use App\Models\professeur;


class ExamenDataController extends Controller
{
    public function salles()
    {
        $salles = salle::all();

        return response()->json( $salles);
}


 public function professeurs()
 {
     $professeurs= professeur::all();

    return response()->json( $professeurs);
 }
 
//  public function professeur_has_modules()
//  {

//       $professeur_has_modules = professeur::join('professeur_has_modules','professeur_has_modules.professeur_id','professeurs.id')
//       ->join('examens','examens.professeur_has_modules_id','professeur_has_modules.id')
//       ->select('professeurs.nom')
//       ->get();

//         return response()->json($professeur_has_modules);

//  }

}
