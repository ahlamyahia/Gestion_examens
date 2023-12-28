<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\ProfesseurStoreRequest;
use App\Http\Resources\ProfesseurResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\professeur;
use App\Imports\ProfesseursImport;
use Maatwebsite\Excel\Facades\Excel;


class ProfesseurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    
    {
        $professeur = Professeur::paginate(6);
       
        if($request->search){
            $professeur =Professeur::where('professeur',"like","%{$request->search}%")
            // ->orWhere('prenom',"like","%{$request->search}%")
            ->orWhere('grade',"like","%{$request->search}%")
            ->orWhere('cin',"like","%{$request->search}%")
            ->orWhere('telephone',"like","%{$request->search}%")
            ->get();
        }
      
        return ProfesseurResource::collection($professeur);
    }

    public function saveExcelProf(Request $request){

        //  return $request->all();
        //  $path=$request->file('select_salles_file')->getRealPath();
        //  Excel::import(new SallesImport, $path);
         Excel::import(new ProfesseursImport,$request->file('select_profs_file') );
       
     }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProfesseurStoreRequest $request)
    {
        $professeur = Professeur::create($request->validated());
        return response()->json($professeur);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Professeur $professeur)
    {
        return new ProfesseurResource($professeur);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProfesseurStoreRequest $request, Professeur $professeur)
    {
        $professeur->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Professeur $professeur)
    {
       $professeur->delete();
       return response()->json('professeur deleted successfully');
    }
}

