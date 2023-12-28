<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SalleStoreRequest;
use App\Http\Resources\SalleResource;
use App\Models\salle;
use App\Imports\SallesImport;
use Maatwebsite\Excel\Facades\Excel;


class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    
    {
        $salle = Salle::paginate(6);
       
        if($request->search){
            $salle =Salle::where('name',"like","%{$request->search}%")
            ->get();
        }
      
        return SalleResource::collection($salle);
    }


    public function saveExcelSalle(Request $request){

        //  return $request->all();
        //  $path=$request->file('select_salles_file')->getRealPath();
        //  Excel::import(new SallesImport, $path);
         Excel::import(new SallesImport,$request->file('select_salles_file') );
       
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
    public function store(SalleStoreRequest $request)
    {
        $salle = Salle::create($request->validated());
        return response()->json($salle);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Salle $salle)
    {
        return new SalleResource($salle);
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
    public function update(SalleStoreRequest $request, Salle $salle)
    {
        $salle->update($request->validated());
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Salle $salle)
    {
       $salle->delete();
       return response()->json('salle deleted successfully');
    }
}
