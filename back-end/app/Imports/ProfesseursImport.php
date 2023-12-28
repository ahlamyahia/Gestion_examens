<?php

namespace App\Imports;

use App\Models\Professeur;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class ProfesseursImport implements ToModel,WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Professeur([
                'nom'   => $row[ 'nom'],
                'prenom' => $row['prenom'], 
                'grade' => $row['grade'],
                'cin'=> $row['cin'],
                'telephone'=> $row['telephone'],
        
        ]);
    }
}
