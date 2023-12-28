<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\EtudiantStoreRequest;
use App\Http\Resources\EtudiantResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\etudiant;
use App\Imports\EtudiantsImport;
use Maatwebsite\Excel\Facades\Excel;


class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    
    {
        $etudiant = Etudiant::paginate(4);
        if($request->search){
            $etudiant = Etudiant::where('nom',"like","%{$request->search}%")
            ->orWhere('prenom',"like","%{$request->search}%")
            ->orWhere('cne',"like","%{$request->search}%")
            ->orWhere('cin',"like","%{$request->search}%")
            ->orWhere('num_apogee',"like","%{$request->search}%")
            ->get();
        } elseif ($request->filiere_id) {
            $etudiant = Etudiant::where('filiere_id', $request->filiere_id)->get();
        }
      
        return EtudiantResource::collection($etudiant);
    }
 public function saveExcelEtudiant(Request $request){

    //  return $request->all();
    // $path=$request->file('select_etudiants_file')->getRealPath();
    // Excel::import(new EtudiantsImport, $path);
    Excel::import(new EtudiantsImport,$request->file('select_etudiants_file') );
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
    public function store(EtudiantStoreRequest $request)
    {
        $etudiant = Etudiant::create($request->validated());
        return response()->json($etudiant);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Etudiant $etudiant)
    {
        return new EtudiantResource($etudiant);
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
    public function update(EtudiantStoreRequest $request, Etudiant $etudiant)
    {
        $etudiant->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Etudiant $etudiant)
    {
       $etudiant->delete();
       return response()->json('Etudiant deleted successfully');
    }
}
