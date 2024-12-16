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
use App\Http\Controllers\BecaPrincipalController;

use App\Http\Controllers\BecaAlimentacionFacultadController;
use App\Http\Controllers\BecaAlimentacionCarreraController;
use App\Http\Controllers\BecaAlimentacionResumenController;

use App\Http\Controllers\BecaDocenciaFacultadController;
use App\Http\Controllers\BecaDocenciaCarreraController;
use App\Http\Controllers\BecaDocenciaResumenController;

use App\Http\Controllers\BecaInvestigacionFacultadController;
use App\Http\Controllers\BecaInvestigacionCarreraController;
use App\Http\Controllers\BecaInvestigacionResumenController;

use App\Http\Controllers\BecaGraduacionFacultadController;
use App\Http\Controllers\BecaGraduacionCarreraController;
use App\Http\Controllers\BecaGraduacionResumenController;

use App\Http\Controllers\BecaTrabajoFacultadController;
use App\Http\Controllers\BecaTrabajoCarreraController;
use App\Http\Controllers\BecaTrabajoResumenController;


use App\Http\Controllers\FacultadController;
use App\Http\Controllers\FacultadGraficoController;

//Movilidad
use App\Http\Controllers\MovilidadPrincipalController;

use App\Http\Controllers\MovilidadActasFacultadController;
use App\Http\Controllers\MovilidadActasCarreraController;
use App\Http\Controllers\MovilidadActasResumenController;

use App\Http\Controllers\MovilidadCambioFacultadController;
use App\Http\Controllers\MovilidadCambioCarreraController;
use App\Http\Controllers\MovilidadCambioResumenController;

use App\Http\Controllers\MovilidadNotasFacultadController;
use App\Http\Controllers\MovilidadNotasCarreraController;
use App\Http\Controllers\MovilidadNotasResumenController;

use App\Http\Controllers\MovilidadReadmisionFacultadController;
use App\Http\Controllers\MovilidadReadmisionCarreraController;
use App\Http\Controllers\MovilidadReadmisionResumenController;

use App\Http\Controllers\MovilidadSuspensionFacultadController;
use App\Http\Controllers\MovilidadSuspensionCarreraController;
use App\Http\Controllers\MovilidadSuspensionResumenController;

use App\Http\Controllers\MovilidadTransferenciaFacultadController;
use App\Http\Controllers\MovilidadTransferenciaCarreraController;
use App\Http\Controllers\MovilidadTransferenciaResumenController;

use App\Http\Controllers\MovilidadTraspasosFacultadController;
use App\Http\Controllers\MovilidadTraspasosCarreraController;
use App\Http\Controllers\MovilidadTraspasosResumenController;

//poblacion 
use App\Http\Controllers\EstudiantesPrincipalController;

use App\Http\Controllers\EstudiantesProcedenciaController;
use App\Http\Controllers\EstudiantesProcedenciaCarreraController;
use App\Http\Controllers\EstudiantesLugarController;
use App\Http\Controllers\EstudiantesLugarCarreraController;

use App\Http\Controllers\EstudiantesMatriculadosProgramadosFacultadController;
use App\Http\Controllers\EstudiantesMatriculadosProgramadosCarreraController;
use App\Http\Controllers\EstudiantesMatriculadosSexoFacultadController;
use App\Http\Controllers\EstudiantesMatriculadosSexoCarreraController;
use App\Http\Controllers\EstudiantesDepartamentoSexoFacultadController;
use App\Http\Controllers\EstudiantesDepartamentoSexocarreraController;
use App\Http\Controllers\EstudiantesTipoColegioController;
use App\Http\Controllers\EstudiantesFacultadController;
use App\Http\Controllers\EstudiantesCarreraController;

//nuevos 
use App\Http\Controllers\EstudiantesNuevosProcedenciaController;
use App\Http\Controllers\EstudiantesNuevosProcedenciaCarreraController;
use App\Http\Controllers\EstudiantesNuevosLugarController;
use App\Http\Controllers\EstudiantesNuevosLugarcarreraController;

use App\Http\Controllers\EstudiantesNuevosMatriculadosFacultadController;
use App\Http\Controllers\EstudiantesNuevosMatriculadosCarreraController;
use App\Http\Controllers\EstudiantesNuevosCrecimientoCarreraController;
use App\Http\Controllers\EstudiantesNuevosDepartamentoFacultadController;
use App\Http\Controllers\EstudiantesNuevosDepartamentocarreraController;
use App\Http\Controllers\EstudiantesTipoColegioNuevosController;

//regular
use App\Http\Controllers\EstudiantesRegularProcedenciaController;
use App\Http\Controllers\EstudiantesRegularProcedenciaCarreraController;
use App\Http\Controllers\EstudiantesRegularLugarController;
use App\Http\Controllers\EstudiantesRegularLugarCarreraController;

use App\Http\Controllers\EstudiantesRegularMatriculadosFacultadController;
use App\Http\Controllers\EstudiantesRegularMatriculadosCarreraController;
use App\Http\Controllers\EstudiantesRegularCrecimientoCarreraController;
use App\Http\Controllers\EstudiantesRegularDepartamentoFacultadController;
use App\Http\Controllers\EstudiantesRegularDepartamentocarreraController;
use App\Http\Controllers\EstudiantesTipoColegioRegularController;

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


//admision
use App\Http\Controllers\AdmisionPrincipalController;
//psa
use App\Http\Controllers\AdmisionPSaProcedenciaController;
use App\Http\Controllers\AdmisionPSaProcedenciaCarreraController;

use App\Http\Controllers\AdmisionPSaLugarController;
use App\Http\Controllers\AdmisionPSaLugarCarreraController;

use App\Http\Controllers\AdmisionPsaFacultadController;
use App\Http\Controllers\AdmisionPsaCarreraController;
use App\Http\Controllers\AdmisionPsaDepartamentoCarreraController;
use App\Http\Controllers\AdmisionPsaDepartamentoFacultadController;
use App\Http\Controllers\AdmisionPsaTipoColegioController;
use App\Http\Controllers\AdmisionPsaTurnoColegioController;
use App\Http\Controllers\AdmisionPsaEdadController;
use App\Http\Controllers\AdmisionPsaCrecimientoPostulantesController;
use App\Http\Controllers\AdmisionPsaCrecimientoAceptadosController;

//pre-universitario
use App\Http\Controllers\AdmisionPreProcedenciaController;
use App\Http\Controllers\AdmisionPreProcedenciaCarreraController;
use App\Http\Controllers\AdmisionPreLugarController;
use App\Http\Controllers\AdmisionPreLugarCarreraController;


use App\Http\Controllers\AdmisionPreFacultadController;
use App\Http\Controllers\AdmisionPreCarreraController;
use App\Http\Controllers\AdmisionPreDepartamentoCarreraController;
use App\Http\Controllers\AdmisionPreDepartamentoFacultadController;
use App\Http\Controllers\AdmisionPreTipoColegioController;
use App\Http\Controllers\AdmisionPreTurnoColegioController;
use App\Http\Controllers\AdmisionPreEdadController;
use App\Http\Controllers\AdmisionPreCrecimientoPostulantesController;
use App\Http\Controllers\AdmisionPreCrecimientoAceptadosController;

//especial
use App\Http\Controllers\AdmisionEspecialProcedenciaController;
use App\Http\Controllers\AdmisionEspecialProcedenciaCarreraController;
use App\Http\Controllers\AdmisionEspecialLugarController;
use App\Http\Controllers\AdmisionEspecialLugarCarreraController;

use App\Http\Controllers\AdmisionEspecialFacultadController;
use App\Http\Controllers\AdmisionEspecialCarreraController;
use App\Http\Controllers\AdmisionEspecialDepartamentoCarreraController;
use App\Http\Controllers\AdmisionEspecialDepartamentoFacultadController;
use App\Http\Controllers\AdmisionEspecialTipoColegioController;
use App\Http\Controllers\AdmisionEspecialTurnoColegioController;
use App\Http\Controllers\AdmisionEspecialEdadController;
use App\Http\Controllers\AdmisionEspecialCrecimientoPostulantesController;
use App\Http\Controllers\AdmisionEspecialCrecimientoAceptadosController;

//graduados
use App\Http\Controllers\GraduadosFacultadController;
use App\Http\Controllers\GraduadosCarreraController;
use App\Http\Controllers\GraduadosModalidadController;
use App\Http\Controllers\GraduadosPermanenciaController;
use App\Http\Controllers\GraduadosNotaController;

//principal
use App\Http\Controllers\PrincipalController;

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
Route::get('/beca-principal', [BecaPrincipalController::class, 'getBecaPorGestion']);

Route::get('/alimentacion-resumen/{gestion?}', [BecaAlimentacionResumenController::class, 'getAlimentacionResumen']);
Route::get('/alimentacion-facultad/{gestion?}', [BecaAlimentacionFacultadController::class, 'getAlimentacionFacultad']);
Route::get('/alimentacion-carrera/{gestion?}', [BecaAlimentacionCarreraController::class, 'getAlimentacionCarrera']);


Route::get('/docencia-facultad/{gestion?}', [BecaDocenciaFacultadController::class, 'getDocenciaFacultad']);
Route::get('/docencia-carrera/{gestion?}', [BecaDocenciaCarreraController::class, 'getDocenciaCarrera']);
Route::get('/docencia-resumen/{gestion?}', [BecaDocenciaResumenController::class, 'getDocenciaResumen']);

Route::get('/investigacion-facultad/{gestion?}', [BecaInvestigacionFacultadController::class, 'getInvestigacionFacultad']);
Route::get('/investigacion-carrera/{gestion?}', [BecaInvestigacionCarreraController::class, 'getInvestigacionCarrera']);
Route::get('/investigacion-resumen/{gestion?}', [BecaInvestigacionResumenController::class, 'getInvestigacionResumen']);

Route::get('/graduacion-facultad/{gestion?}', [BecaGraduacionFacultadController::class, 'getGraduacionFacultad']);
Route::get('/graduacion-carrera/{gestion?}', [BecaGraduacionCarreraController::class, 'getGraduacionCarrera']);
Route::get('/graduacion-resumen/{gestion?}', [BecaGraduacionResumenController::class, 'getGraduacionResumen']);

Route::get('/trabajo-facultad/{gestion?}', [BecaTrabajoFacultadController::class, 'getTrabajoFacultad']);
Route::get('/trabajo-carrera/{gestion?}', [BecaTrabajoCarreraController::class, 'getTrabajoCarrera']);
Route::get('/trabajo-resumen/{gestion?}', [BecaTrabajoResumenController::class, 'getTrabajoResumen']);

//movilidad
Route::get('/movilidad-principal', [MovilidadPrincipalController::class, 'getMovilidadPorGestion']);

Route::get('/actas-facultad/{gestion?}', [MovilidadActasFacultadController::class, 'getActasFacultad']);
Route::get('/actas-carrera/{gestion?}', [MovilidadActasCarreraController::class, 'getActasCarrera']);
Route::get('/actas-resumen/{gestion?}', [MovilidadActasResumenController::class, 'getActasResumen']);

Route::get('/cambio-facultad/{gestion?}', [MovilidadCambioFacultadController::class, 'getCambioFacultad']);
Route::get('/cambio-carrera/{gestion?}', [MovilidadCambioCarreraController::class, 'getCambioCarrera']);
Route::get('/cambio-resumen/{gestion?}', [MovilidadCambioResumenController::class, 'getCambioResumen']);

Route::get('/notas-facultad/{gestion?}', [MovilidadNotasFacultadController::class, 'getNotasFacultad']);
Route::get('/notas-carrera/{gestion?}', [MovilidadNotasCarreraController::class, 'getNotasCarrera']);
Route::get('/notas-resumen/{gestion?}', [MovilidadNotasResumenController::class, 'getNotasResumen']);

Route::get('/readmision-facultad/{gestion?}', [MovilidadReadmisionFacultadController::class, 'getReadmisionFacultad']);
Route::get('/readmision-carrera/{gestion?}', [MovilidadReadmisionCarreraController::class, 'getReadmisionCarrera']);
Route::get('/readmision-resumen/{gestion?}', [MovilidadReadmisionResumenController::class, 'getReadmisionResumen']);

Route::get('/suspension-facultad/{gestion?}', [MovilidadSuspensionFacultadController::class, 'getSuspensionFacultad']);
Route::get('/suspension-carrera/{gestion?}', [MovilidadSuspensionCarreraController::class, 'getSuspensionCarrera']);
Route::get('/suspension-resumen/{gestion?}', [MovilidadSuspensionResumenController::class, 'getSuspensionResumen']);

Route::get('/transferencia-facultad/{gestion?}', [MovilidadTransferenciaFacultadController::class, 'getTransferenciaFacultad']);
Route::get('/transferencia-carrera/{gestion?}', [MovilidadTransferenciaCarreraController::class, 'getTransferenciaCarrera']);
Route::get('/transferencia-resumen/{gestion?}', [MovilidadTransferenciaResumenController::class, 'getTransferenciaResumen']);

Route::get('/traspasos-facultad/{gestion?}', [MovilidadTraspasosFacultadController::class, 'getTraspasosFacultad']);
Route::get('/traspasos-carrera/{gestion?}', [MovilidadTraspasosCarreraController::class, 'getTraspasosCarrera']);
Route::get('/traspasos-resumen/{gestion?}', [MovilidadTraspasosResumenController::class, 'getTraspasosResumen']);


//poblacion 
Route::get('/matriculados-principal', [EstudiantesPrincipalController::class, 'getMatriculasPorGestion']);

Route::get('/matriculados-procedencia', [EstudiantesProcedenciaController::class, 'getMatriculadosProcedencia']);
Route::get('/matriculados-procedencia-carrera', [EstudiantesProcedenciaCarreraController::class, 'getMatriculadosProcedenciaCarrera']);
Route::get('/matriculados-lugar', [EstudiantesLugarController::class, 'getMatriculadosLugar']);
Route::get('/matriculados-lugar-carrera', [EstudiantesLugarCarreraController::class, 'getMatriculadosLugarCarrera']);


Route::get('/matriculados-programados-facultad', [EstudiantesMatriculadosProgramadosFacultadController::class, 'getMatriculadosProgramadosFacultad']);
Route::get('/matriculados-programados-carrera', [EstudiantesMatriculadosProgramadosCarreraController::class, 'getMatriculadosProgramadosCarrera']);

Route::get('/matriculados-sexo-facultad', [EstudiantesMatriculadosSexoFacultadController::class, 'getMatriculadosSexoFacultad']);
Route::get('/matriculados-sexo-carrera', [EstudiantesMatriculadosSexoCarreraController::class, 'getMatriculadosSexoCarrera']);

Route::get('/facultad-departamento/{year?}', [EstudiantesDepartamentoSexoFacultadController::class, 'getDepartamentoFacultad']);
Route::get('/carrera-departamento/{year?}', [EstudiantesDepartamentoSexoCarreraController::class, 'getDepartamentoCarrera']);

Route::get('/matriculas', [EstudiantesTipoColegioController::class, 'getTipoColegio']);

Route::get('/estudiantes-facultad', [EstudiantesFacultadController::class, 'getEstudiantesFacultad']);
Route::get('/estudiantes-carrera', [EstudiantesCarreraController::class, 'getEstudiantesCarrera']);
//nuevos 
Route::get('/matriculados-nuevos-procedencia', [EstudiantesNuevosProcedenciaController::class, 'getMatriculadosNuevosProcedencia']);
Route::get('/matriculados-nuevos-procedencia-carrera', [EstudiantesNuevosProcedenciaCarreraController::class, 'getMatriculadosNuevosProcedenciaCarrera']);
Route::get('/matriculados-nuevos-lugar', [EstudiantesNuevosLugarController::class, 'getMatriculadosNuevosLugar']);
Route::get('/matriculados-nuevos-lugar-carrera', [EstudiantesNuevosLugarCarreraController::class, 'getMatriculadosNuevosLugarCarrera']);

Route::get('/matriculados-nuevos-facultad', [EstudiantesNuevosMatriculadosFacultadController::class, 'getMatriculadosNuevosFacultad']);
Route::get('/matriculados-nuevos-carrera', [EstudiantesNuevosMatriculadosCarreraController::class, 'getMatriculadosNuevosCarrera']);

Route::get('/tasa-crecimiento-carrera', [EstudiantesNuevosCrecimientoCarreraController::class, 'getTasaCrecimientoNuevosCarrera']);

Route::get('/facultad-nuevos-departamento/{year?}', [EstudiantesNuevosDepartamentoFacultadController::class, 'getNuevosDepartamentoFacultad']);
Route::get('/carrera-nuevos-departamento/{year?}', [EstudiantesNuevosDepartamentoCarreraController::class, 'getNuevosDepartamentoCarrera']);

Route::get('/matriculas-nuevos', [EstudiantesTipoColegioNuevosController::class, 'getTipoColegioNuevos']);

//regular
Route::get('/matriculados-regular-procedencia', [EstudiantesRegularProcedenciaController::class, 'getMatriculadosRegularProcedencia']);
Route::get('/matriculados-regular-procedencia-carrera', [EstudiantesRegularProcedenciaCarreraController::class, 'getMatriculadosRegularProcedenciaCarrera']);
Route::get('/matriculados-regular-lugar', [EstudiantesRegularLugarController::class, 'getMatriculadosRegularLugar']);
Route::get('/matriculados-regular-lugar-carrera', [EstudiantesRegularLugarCarreraController::class, 'getMatriculadosRegularLugarCarrera']);


Route::get('/matriculados-regular-facultad', [EstudiantesRegularMatriculadosFacultadController::class, 'getMatriculadosRegularFacultad']);
Route::get('/matriculados-regular-carrera', [EstudiantesRegularMatriculadosCarreraController::class, 'getMatriculadosRegularCarrera']);

Route::get('/crecimiento-regular-carrera', [EstudiantesRegularCrecimientoCarreraController::class, 'getTasaCrecimientoRegularCarrera']);

Route::get('/facultad-regular-departamento/{year?}', [EstudiantesRegularDepartamentoFacultadController::class, 'getRegularDepartamentoFacultad']);
Route::get('/carrera-regular-departamento/{year?}', [EstudiantesRegularDepartamentoCarreraController::class, 'getRegularDepartamentoCarrera']);

Route::get('/matriculas-regular', [EstudiantesTipoColegioRegularController::class, 'getTipoColegioRegular']);

//admision

Route::get('/admision-principal', [AdmisionPrincipalController::class, 'getAdminisionPorGestion']);

//psa
Route::get('/psa-procedencia', [AdmisionPsaProcedenciaController::class, 'getPsaProcedencia']);
Route::get('/psa-procedencia-carrera', [AdmisionPsaProcedenciaCarreraController::class, 'getPsaProcedenciaCarrera']);
Route::get('/psa-lugar', [AdmisionPsaLugarController::class, 'getPsaLugar']);
Route::get('/psa-lugar-carrera', [AdmisionPsaLugarCarreraController::class, 'getPsaLugarCarrera']);

Route::get('/psa-facultad', [AdmisionPsaFacultadController::class, 'getPsaFacultad']);
Route::get('/psa-carrera', [AdmisionPsaCarreraController::class, 'getPsaCarrera']);
Route::get('/psa-departamento-facultad/{year?}', [AdmisionPsaDepartamentoFacultadController::class, 'getDepartamentoFacultad']);
Route::get('/psa-departamento-carrera/{year?}', [AdmisionPsaDepartamentoCarreraController::class, 'getDepartamentoCarrera']);
Route::get('/psa-tipocol', [AdmisionPsaTipoColegioController::class, 'getPsaTipoColegio']);
Route::get('/psa-turnocol', [AdmisionPsaTurnoColegioController::class, 'getPsaTurnoColegio']);
Route::get('/psa-edadsexo', [AdmisionPsaEdadController::class, 'getPsaEdadSexo']);
Route::get('/psa-tasa-crecimiento-postulantes', [AdmisionPsaCrecimientoPostulantesController::class, 'getPsaTasaCrecimientoPostulantesCarrera']);
Route::get('/psa-tasa-crecimiento-aceptados', [AdmisionPsaCrecimientoAceptadosController::class, 'getPsaTasaCrecimientoAceptadosCarrera']);

//preuniversitario 
Route::get('/pre-procedencia', [AdmisionPreProcedenciaController::class, 'getPreProcedencia']);
Route::get('/pre-procedencia-carrera', [AdmisionPreProcedenciaCarreraController::class, 'getPreProcedenciaCarrera']);
Route::get('/pre-lugar', [AdmisionPreLugarController::class, 'getPreLugar']);
Route::get('/pre-lugar-carrera', [AdmisionPreLugarCarreraController::class, 'getPreLugarCarrera']);


Route::get('/pre-facultad', [AdmisionPreFacultadController::class, 'getPreFacultad']);
Route::get('/pre-carrera', [AdmisionPreCarreraController::class, 'getPreCarrera']);
Route::get('/pre-departamento-facultad/{year?}', [AdmisionPreDepartamentoFacultadController::class, 'getPreDepartamentoFacultad']);
Route::get('/pre-departamento-carrera/{year?}', [AdmisionPreDepartamentoCarreraController::class, 'getPreDepartamentoCarrera']);
Route::get('/pre-tipocol', [AdmisionPreTipoColegioController::class, 'getPreTipoColegio']);
Route::get('/pre-turnocol', [AdmisionPreTurnoColegioController::class, 'getPreTurnoColegio']);
Route::get('/pre-edadsexo', [AdmisionPreEdadController::class, 'getPreEdadSexo']);
Route::get('/pre-tasa-crecimiento-postulantes', [AdmisionPreCrecimientoPostulantesController::class, 'getPreTasaCrecimientoPostulantesCarrera']);
Route::get('/pre-tasa-crecimiento-aceptados', [AdmisionPreCrecimientoAceptadosController::class, 'getPreTasaCrecimientoAceptadosCarrera']);

//especial
Route::get('/especial-procedencia', [AdmisionEspecialProcedenciaController::class, 'getEspecialProcedencia']);
Route::get('/especial-procedencia-carrera', [AdmisionEspecialProcedenciaCarreraController::class, 'getEspecialProcedenciaCarrera']);
Route::get('/especial-lugar', [AdmisionEspecialLugarController::class, 'getEspecialLugar']);
Route::get('/especial-lugar-carrera', [AdmisionEspecialLugarCarreraController::class, 'getEspecialLugarCarrera']);

Route::get('/especial-facultad', [AdmisionEspecialFacultadController::class, 'getEspecialFacultad']);
Route::get('/especial-carrera', [AdmisionEspecialCarreraController::class, 'getEspecialCarrera']);
Route::get('/especial-departamento-facultad/{year?}', [AdmisionEspecialDepartamentoFacultadController::class, 'getEspecialDepartamentoFacultad']);
Route::get('/especial-departamento-carrera/{year?}', [AdmisionEspecialDepartamentoCarreraController::class, 'getEspecialDepartamentoCarrera']);
Route::get('/especial-tipocol', [AdmisionEspecialTipoColegioController::class, 'getEspecialTipoColegio']);
Route::get('/especial-turnocol', [AdmisionEspecialTurnoColegioController::class, 'getEspecialTurnoColegio']);
Route::get('/especial-edadsexo', [AdmisionEspecialEdadController::class, 'getEspecialEdadSexo']);
Route::get('/especial-tasa-crecimiento-postulantes', [AdmisionEspecialCrecimientoPostulantesController::class, 'getEspecialTasaCrecimientoPostulantesCarrera']);
Route::get('/especial-tasa-crecimiento-aceptados', [AdmisionEspecialCrecimientoAceptadosController::class, 'getEspecialTasaCrecimientoAceptadosCarrera']);

//graduados
Route::get('/graduados-facultad', [GraduadosFacultadController::class, 'getGraduadosFacultad']);
Route::get('/graduados-carrera', [GraduadosCarreraController::class, 'getGraduadosCarrera']);
Route::get('/graduados-modalidad', [GraduadosModalidadController::class, 'getGraduadosModalidad']);
Route::get('/graduados-permanencia', [GraduadosPermanenciaController::class, 'getGraduadosPermanencia']);
Route::get('/graduados-nota', [GraduadosNotaController::class, 'getGraduadosNotas']);

//principal
Route::get('/dashboard-data', [PrincipalController::class, 'getDashboardData']);

//Route::get('/download-template', [ExcelController::class, 'downloadTemplate']);

//Route::get('/export-excel/{table}', [ExcelController::class, 'export'])->name('export.excel');
Route::post('/download-excel', [ExcelController::class, 'downloadExcel']);