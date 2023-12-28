<?php

namespace App\Imports;
use App\Models\Salle;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SallesImport implements ToModel,WithHeadingRow{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Salle([
                'name'     =>strtolower(trim( $row[ 'name'])),
                'capacite' => $row['capacite'], 
                'nombresSurveillant' => $row['surveillant'],
        ]);
    }
}
