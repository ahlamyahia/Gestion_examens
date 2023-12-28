<?php

namespace App\Imports;
use App\Models\filiere;
use App\Models\etudiant;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
class EtudiantsImport implements ToModel,WithHeadingRow
{
 private $filieres;

public function __construct (){
  $this->filieres=filiere::select('id','name')->get();}
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    { 
     
 $filier=$this->filieres->where('name',$row['filiere'])->first();
        return new Etudiant([
                'num_apogee' => $row['n_ap'],
                'cne'     => $row['cne'],
                'nom'    => $row['nom'], 
                'prenom' => $row['prenom'],
                'date_naissance' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['date_naissance']),
                'cin' => $row['cin'],
                 'filiere_id'=>$filier->id??NULL
                
           
        ]);
    }
}
