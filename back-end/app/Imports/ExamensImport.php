<?php
namespace App\Imports;
use App\Models\Salle;
use App\Models\Examen;
use App\Models\Type;
use App\Models\Filiere;
use App\Models\Section;
use App\Models\Semestre;
use App\Models\Module;
use App\Models\Professeur;
use App\Models\Departement;
use App\Models\Professeur_has_module;
use Maatwebsite\Excel\Concerns\ToModel;
 use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
class ExamensImport implements ToCollection
 ,WithHeadingRow{
// {       private $type;
//         private $departement;
//         public function __construct (){
//           $this->type=type::select('id','name')->get();
//          $this->departement=departement::select('id','name')->get();
//         }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function collection(Collection $rows){
     
        foreach ($rows as $row)
        {

            $salle = Salle::firstOrCreate([
                'name' => trim($row['locaux']),
                'capacite'=> trim($row['effectif']),

            ]);
           
            $departement = Departement::firstOrCreate([
                'name' => trim($row['departement']),
    
            ]);

            $type = Type::firstOrCreate([
                'name' => trim($row['type']),
    
            ]);

            $professeur = Professeur::firstOrCreate([
                'professeur' =>trim($row['responsable']),
    
            ]); 

            
            $section = Section::firstOrCreate([
                'name' => trim($row['section']),
    
            ]);



        
        // $typ=$this->type->where('name',$row['type'])->first();
        //  $depart=$this->departement->where('name',$row['departement'])->first();
        $filiere = Filiere::firstOrCreate([
            'name' => trim($row['filiere']),
            'type_id'=>  $type->id,
            'departement_id'=>$departement->id,
            // 'type_id' =>$typ->id??NULL,
            //  'departement_id' =>$depart->id??NULL,

        ]);
        $semestre = Semestre::firstOrCreate([
            'semestre' =>trim($row['semestre']),
            'filiere_id'=>  $filiere->id,
        ]);
    
        $module = Module::firstOrCreate([
            'name' => trim($row['module']),
           'code' => trim($row['codem']),
         'filiere_id'=>  $filiere->id,
          'semestre_id'=>$semestre->id,
        ]);
        $professeurhasmod = Professeur_has_module::firstOrCreate([
            'professeur_id'=>  $professeur->id,
            'module_id'=> $module->id,
            'section_id'=> $section->id,
            
       ]);
      

        Examen::firstOrCreate([
            'jour' => trim($row['date']),
           'heure' => trim($row['heure']),
           'salle_id'=>$salle->id,
           'professeur_id'=>$professeur->id,
       ]);
    }
        
    }

}



        
    

