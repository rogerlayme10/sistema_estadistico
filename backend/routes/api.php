<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProgramaController;
use App\Http\Controllers\AdminCountController;
use App\Http\Controllers\EstudiantesCountController;

//administrativos
//use App\Http\Controllers\AdministrativosController;
//use App\Http\Controllers\AdministrativosChartController;
use App\Http\Controllers\AdministrativosTipoContratoController;
use App\Http\Controllers\AdministrativosActividadController;
use App\Http\Controllers\AdministrativosUnidadController;
use App\Http\Controllers\AdministrativosUnidadTipoContratoController;
use App\Http\Controllers\AdministrativosProfesionTipoContratoController;
use App\Http\Controllers\AdministrativosUnidadNivelAcademicoController;
use App\Http\Controllers\AdministrativosProfesionNivelAcademicoController;
use App\Http\Controllers\AdministrativosEdadSexoController;
use App\Http\Controllers\AdministrativosCountGraficController;

// App\Http\Controllers\AdministrativosProfesionSexoController;

//becas
use App\Http\Controllers\BecaAlimentacionFacultadController;
use App\Http\Controllers\BecaAlimentacionCarreraController;

use App\Http\Controllers\BecaDocenciaFacultadController;
use App\Http\Controllers\BecaDocenciaCarreraController;

use App\Http\Controllers\BecaInvestigacionFacultadController;
use App\Http\Controllers\BecaInvestigacionCarreraController;

use App\Http\Controllers\BecaGraduacionFacultadController;
use App\Http\Controllers\BecaGraduacionCarreraController;

use App\Http\Controllers\BecaTrabajoFacultadController;
use App\Http\Controllers\BecaTrabajoCarreraController;


use App\Http\Controllers\FacultadController;
use App\Http\Controllers\FacultadGraficoController;

//docentes
use App\Http\Controllers\DocentesCargoController;
use App\Http\Controllers\DocentesCargoAAController;
use App\Http\Controllers\DocentesCargoCController;
use App\Http\Controllers\DocentesFacultadController;
use App\Http\Controllers\DocentesCarreraController;
use App\Http\Controllers\DocentesNivelAcademicoAlcanzadoController;
use App\Http\Controllers\DocentesProfesionNivelAcademicoController;
use App\Http\Controllers\DocentesEdadSexoController;
use App\Http\Controllers\DocentesServicioEdadController;
use App\Http\Controllers\DocentesCargaHorariaCargoController;
use App\Http\Controllers\DocentesCountController;
use App\Http\Controllers\DocentesCountGraficController;
//plantilla
use App\Http\Controllers\ExcelController;

use App\Http\Controllers\ExcelExportController;



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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/programas', [ProgramaController::class, 'index']);


//dasboard
//facyltadgarfico 
Route::get('/facultades-grafico', [FacultadGraficoController::class, 'index']);


//facultad y programa 
Route::get('/facultades', [FacultadController::class, 'getFacultades']);
Route::get('/facultades/{cod_fac}/programas', [FacultadController::class, 'getProgramasByFacultad']);
Route::get('/programas/{id_programa}', [ProgramaController::class, 'getProgramaById']);

//contadores y grafic 
Route::get('/count-administrativos', [AdminCountController::class, 'countAdministrativos']);
Route::get('/count-estudiantes',[EstudiantesCountController::class,'countEstudiantes']);
Route::get('/docentes/gestion-2023/count', [DocentesCountController::class, 'contarDocentesGestion2023']);

Route::get('/docentes-gestiongrafic', [DocentesCountGraficController::class, 'getDocentesPorGestion']);
Route::get('/administrativos-gestiongrafic', [AdministrativosCountGraficController::class, 'getAdministrativosPorGestion']);



//Administrativos tablas y graficos
Route::get('/administrativos-contrato/{gestion?}', [AdministrativosTipoContratoController::class, 'getData']);
Route::get('/administrativos-actividad/{gestion?}', [AdministrativosActividadController::class, 'getDataActividad']);
Route::get('/administrativos-unidad/{gestion?}', [AdministrativosUnidadController::class, 'getDataUnidad']);
Route::get('/administrativos-unidadcontrato/{gestion?}', [AdministrativosUnidadTipoContratoController::class, 'getUnidadTipoContrato']);
Route::get('/administrativos-profesioncontrato/{gestion?}', [AdministrativosProfesionTipoContratoController::class, 'getProfesionTipoContrato']);
Route::get('/administrativos-unidadnivelacademico/{gestion?}', [AdministrativosUnidadNivelAcademicoController::class, 'getUnidadNivelAcademico']);
Route::get('/administrativos-profesionnivelacademico/{gestion?}', [AdministrativosProfesionNivelAcademicoController::class, 'getProfesionNivelAcademico']);
Route::get('/administrativos-edadsexo', [AdministrativosEdadSexoController::class, 'getEdadSexo']);


//docentes
Route::get('/docentes', [DocentesCargoController::class, 'index']);
Route::get('/docentes-cargo-aa', [DocentesCargoAAController::class, 'index']);
Route::get('/docentes-cargo-c', [DocentesCargoCController::class, 'index']);
Route::get('/facultades-sexo', [DocentesFacultadController::class, 'getDocentesFacultadSexo']);
Route::get('/carreras-sexo', [DocentesCarreraController::class, 'getDocentesCarreraSexo']);
Route::get('/docentes-nivelacademico', [DocentesNivelAcademicoAlcanzadoController::class, 'getDatosPorGestion']);
Route::get('/docentes-profesionnivelacad', [DocentesProfesionNivelAcademicoController::class, 'getProfesionesNivelAcademico']);
Route::get('/docentes-sexoedad', [DocentesEdadSexoController::class, 'index']);
Route::get('/docentes-permanencia/{gestion}', [DocentesServicioEdadController::class, 'getDocentesYGestiones']);
Route::get('/docentes-cargahoraria', [DocentesCargaHorariaCargoController::class, 'getCargaHoraria']);





//becas
Route::get('/alimentacion-facultad/{gestion?}', [BecaAlimentacionFacultadController::class, 'getAlimentacionFacultad']);
Route::get('/alimentacion-carrera/{gestion?}', [BecaAlimentacionCarreraController::class, 'getAlimentacionCarrera']);

Route::get('/docencia-facultad/{gestion?}', [BecaDocenciaFacultadController::class, 'getDocenciaFacultad']);
Route::get('/docencia-carrera/{gestion?}', [BecaDocenciaCarreraController::class, 'getDocenciaCarrera']);

Route::get('/investigacion-facultad/{gestion?}', [BecaInvestigacionFacultadController::class, 'getInvestigacionFacultad']);
Route::get('/investigacion-carrera/{gestion?}', [BecaInvestigacionCarreraController::class, 'getInvestigacionCarrera']);

Route::get('/graduacion-facultad/{gestion?}', [BecaGraduacionFacultadController::class, 'getGraduacionFacultad']);
Route::get('/graduacion-carrera/{gestion?}', [BecaGraduacionCarreraController::class, 'getGraduacionCarrera']);

Route::get('/trabajo-facultad/{gestion?}', [BecaTrabajoFacultadController::class, 'getTrabajoFacultad']);
Route::get('/trabajo-carrera/{gestion?}', [BecaTrabajoCarreraController::class, 'getTrabajoCarrera']);



//plantilla excel
//Route::get('/download-template', [ExcelController::class, 'downloadTemplate']);

//Route::get('/export-excel/{table}', [ExcelController::class, 'export'])->name('export.excel');
Route::post('/download-excel', [ExcelController::class, 'downloadExcel']);