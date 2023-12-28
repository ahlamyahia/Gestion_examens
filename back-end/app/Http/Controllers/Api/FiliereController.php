<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\FiliereStoreRequest;
use App\Http\Resources\FiliereResource;
use App\Models\filiere;

class FiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    
    {
        $filiere = Filiere::paginate(6);
       
        if($request->search){
            $filiere = Filiere::where('name',"like","%{$request->search}%")
            ->get();
        }
      
        return FiliereResource::collection($filiere);
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
    public function store(FiliereStoreRequest $request)
    {
        $filiere = Filiere::create($request->validated());
        return response()->json($filiere);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Filiere $filiere)
    {
        return new FiliereResource($filiere);
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
    public function update(FiliereStoreRequest $request, Filiere $filiere)
    {
        $filiere->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Filiere $filiere)
    {
       $filiere->delete();
       return response()->json('Filiere deleted successfully');
    }
}
