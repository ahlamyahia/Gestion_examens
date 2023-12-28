<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ExamenStoreRequest;
use App\Http\Resources\ExamenResource;
use App\Models\examen;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ExamensImport;
class ExamenController extends Controller
{
    public function index(Request $request)
    
    {
        $examen= Examen::paginate(6);
       
        if($request->search){
            $examen = Examen::where('heure',"like","%{$request->search}%")
            ->orWhere('jour',"like","%{$request->search}%")
            ->paginate(6);
        }
      
        return ExamenResource::collection($examen);
    }
    public function saveExcelExamen(Request $request){

        //  return $request->all();
        // $path=$request->file('select_etudiants_file')->getRealPath();
        // Excel::import(new EtudiantsImport, $path);
       // Excel::import(new ExamensImport,$request->file('select_examens_file') );
       $request->validate([
        'select_examens_file' => 'required|mimes:xlsx,xls',
    ]);

    $file = $request->file('select_examens_file');

    try {
        Excel::import(new ExamensImport, $file);
        return response()->json(['message' => 'Fichier Excel importé avec succès']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Erreur lors de l\'importation du fichier Excel'], 500);
    }
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
    public function store(ExamenStoreRequest $request)
    {
        $examen = Examen::create($request->validated());
        return response()->json($examen);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Examen $examen)
    {
        return new ExamenResource($examen);
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
    public function update(ExamenStoreRequest $request, Examen $examen)
    {
        $examen->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Examen $examen)
    {
       $examen->delete();
       return response()->json('Examen deleted successfully');
    }
}
