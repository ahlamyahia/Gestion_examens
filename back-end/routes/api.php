<?php
use App\Http\Controllers\Api\EtudiantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EtudiantDataController;
use App\Http\Controllers\Api\ProfesseurController;
use App\Http\Controllers\Api\FiliereDataController;
use App\Http\Controllers\Api\FiliereController;
use App\Http\Controllers\Api\SalleController;
 use App\Http\Controllers\Api\ExamenDataController;
 use App\Http\Controllers\Api\ExamenController;
 use App\Http\Controllers\Api\UserController;
 
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/register', [UserController::class, 'createUser']);
Route::post('/auth/login', [UserController::class, 'loginUser']);


              // **************************Etudiants*******************
    Route::get('/etudiants/filieres', [EtudiantDataController::class, 'filieres']);
   //Route::get('/etudiants',[EtudiantController::class, 'index']);
    //Route::post('/etudiants',[EtudiantController::class, 'store']);
    //Route::delete('/etudiants/{etudiant}',[EtudiantController::class, 'destroy']);
    Route::apiResource('etudiants', EtudiantController::class);
    Route::post('etudiants/import_excel',[EtudiantController::class,'saveExcelEtudiant']);

        // **************************Professeurs******************
//Route::get('/professeurs',[ProfesseurController::class, 'index']);
//Route::post('/professeurs',[ProfesseurController::class, 'store']);
  // Route::delete('/professeurs/{professeur}',[ProfesseurController::class, 'destroy']);
    Route::apiResource('professeurs', ProfesseurController::class);
    Route::post('professeurs/import_excel',[ProfesseurController::class,'saveExcelProf']);



        // **************************Filieres*******************
    Route::get('/filieres/types', [FiliereDataController::class, 'types']);
    Route::get('/filieres/departements', [FiliereDataController::class, 'departements']);
    Route::get('/filieres/professeurs', [FiliereDataController::class, 'professeurs']);
   // Route::get('/filieres',[FiliereController::class, 'index']);
//Route::post('/filieres',[FiliereController::class, 'store']);
  // Route::delete('/filieres/{filiere}',[FiliereController::class, 'destroy']);
  Route::apiResource('filieres', FiliereController::class);



          // **************************Salles*******************
  //Route::get('/salles',[SalleController::class, 'index']);
//Route::post('/salles',[SalleController::class, 'store']);
  // Route::delete('/salles/{Salle}',[SallesController::class, 'destroy']);
  Route::apiResource('salles', SalleController::class);
  Route::post('salles/import_excel',[SalleController::class,'saveExcelSalle']);

  // **************************Examens*******************
   Route::get('/examens/salles', [ExamenDataController::class, 'salles']);
   Route::get('/examens/professeurs', [ExamenDataController::class, 'professeurs']);
   Route::apiResource('examens', ExamenController::class);
   Route::post('examens/import_excel',[ExamenController::class,'saveExcelExamen']);
  

 