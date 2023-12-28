<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\filiere;
class EtudiantDataController extends Controller
{
    public function filieres()
    {
        $filieres = filiere::all();

        return response()->json( $filieres);
}
}
