
import React from 'react'



const Principal = React.lazy(() => import('./components/Principal'))//27/11/24
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Administrativos
const TipoContratoSexo =React.lazy(() => import('./views/administrativo/contratosexo/TipoContratoSexo'))
const ActividadSexo =React.lazy(() => import('./views/administrativo/actividadsexo/ActividadSexo'))

const CargoSexo =React.lazy(() => import('./views/administrativo/cargosexo/CargoSexo'))
const UnidadSexo =React.lazy(() => import('./views/administrativo/unidadsexo/UnidadSexo'))
const UnidadTipoContrato =React.lazy(() => import('./views/administrativo/unidadtipocontrato/UnidadTipoContrato'))
const ProfesionTipoContrato =React.lazy(() => import('./views/administrativo/profesiontipocontrato/ProfesionTipoContrato'))
const UnidadNivelAcademico =React.lazy(() => import('./views/administrativo/unidadnivelacademico/UnidadNivelAcademico'))
const ProfesionNivelAcad =React.lazy(() => import('./views/administrativo/profesionnivelacad/ProfesionNivelAcad'))
const EdadSexo =React.lazy(() => import('./views/administrativo/edadsexo/EdadSexo'))
const AdministrativosCrecimiento =React.lazy(() => import('./views/administrativo/administrativoscrecimiento/AdministrativosCrecimiento'))




//Docentes
const CargoDedicacionSexo =React.lazy(() => import('./views/docentes/cargodedicacionsexo/CargoDedicacionSexo'))
const CargoDedicacionSexoAA =React.lazy(() => import('./views/docentes/cargodedicaciponsexoaa/CargoDedicacionSexoAA'))
const CargoDedicacionSexoC =React.lazy(() => import('./views/docentes/cargodedicacionsexoc/CargoDedicacionSexoC'))

const DocentesFacultadSexo = React.lazy(() => import('./views/docentes/docentesfacultadsexo/DocentesFacultadSexo'))
const DocentesCarreraSexo = React.lazy(() => import('./views/docentes/docentescarrerasexo/DocentesCarreraSexo'))

const GradoAcademicoAlcanzado = React.lazy(() => import('./views/docentes/gradoacademicoalcanzado/GradoAcademicoAlcanzado'))
const ProfesionNivelAcademico = React.lazy(() => import('./views/docentes/profesionnivelacademico/ProfesionNivelAcademico'))
const SexoEdad = React.lazy(() => import('./views/docentes/sexoedad/SexoEdad'))
const ServicioEdad = React.lazy(() => import('./views/docentes/servicioedad/ServicioEdad'))
const CargaHorariaCargo = React.lazy(() => import('./views/docentes/cargahorariacargo/CargaHorariaCargo'))
const DocentesCrecimiento = React.lazy(() => import('./views/docentes/docentescrecimiento/DocentesCrecimiento'))


//Estudiantes
//becas
const BecaPrincipal = React.lazy(() => import('./views/beca/becaprincipal/BecaPrincipal'))

const AlimentacionFacultad = React.lazy(() => import('./views/beca/alimentacion/alimentacionfacultad/AlimentacionFacultad'))
const AlimentacionCarrera = React.lazy(() => import('./views/beca/alimentacion/alimentacioncarrera/AlimentacionCarrera'))
const AlimentacionResumen = React.lazy(() => import('./views/beca/alimentacion/alimentacionresumen/AlimentacionResumen'))

const DocenciaFacultad = React.lazy(() => import('./views/beca/docencia/docenciafacultad/DocenciaFacultad'))
const DocenciaCarrera = React.lazy(() => import('./views/beca/docencia/docenciacarrera/DocenciaCarrera'))
const DocenciaResumen = React.lazy(() => import('./views/beca/docencia/docenciaresumen/DocenciaResumen'))

const InvestigacionFacultad = React.lazy(() => import('./views/beca/investigacion/investigacionfacultad/Investigacionfacultad'))
const InvestigacionCarrera = React.lazy(() => import('./views/beca/investigacion/investigacioncarrera/InvestigacionCarrera'))
const InvestigacionResumen = React.lazy(() => import('./views/beca/investigacion/investigacionresumen/InvestigacionResumen'))

const GraduacionFacultad = React.lazy(() => import('./views/beca/graduacion/graduacionfacultad/GraduacionFacultad'))
const GraduacionCarrera = React.lazy(() => import('./views/beca/graduacion/graduacioncarrera/GraduacionCarrera'))
const GraduacionResumen = React.lazy(() => import('./views/beca/graduacion/graduacionresumen/GraduacionResumen'))

const TrabajoFacultad = React.lazy(() => import('./views/beca/trabajo/trabajofacultad/TrabajoFacultad'))
const TrabajoCarrera = React.lazy(() => import('./views/beca/trabajo/trabajocarrera/TrabajoCarrera'))
const TrabajoResumen = React.lazy(() => import('./views/beca/trabajo/trabajoresumen/TrabajoResumen'))


//poblacion estudiantil 
const MatriculasPrincipal = React.lazy(() => import('./views/estudiantes/matriculas/matriculasprincipal/MatriculasPrincipal'))

const PoblacionProcedenciaEducativa = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/poblacionprocedenciaeducativa/PoblacionProcedenciaEducativa'))
const PoblacionProcedenciaCarrera = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/poblacionprocedenciacarrera/PoblacionProcedenciaCarrera'))
const PoblacionLugarFacultad = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/poblacionlugarfacultad/PoblacionLugarFacultad'))
const PoblacionLugarCarrera = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/poblacionlugarcarrera/PoblacionLugarCarrera'))

const MatriculadosProgramadosFacultad = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/matriculadosprogramadosfacultad/MatriculadosProgramadosFacultad'))
const MatriculadosProgramadosCarrera = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/matriculadosprogramadoscarrera/MatriculadosProgramadosCarrera'))

const MatriculadosFacultad = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/matriculadosfacultad/MatriculadosFacultad'))
const MatriculadosCarrera = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/matriculadoscarrera/MatriculadosCarrera'))

const DepartamentoFacultad = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/departamentofacultad/DepartamentoFacultad'))
const DepartamentoCarrera = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/departamentocarrera/DepartamentoCarrera'))

const ColegioTipo = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/colegiotipo/ColegioTipo'))

const EstudianteFacultad = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/estudiantefacultad/EstudianteFacultad'))
const EstudianteCarrera = React.lazy(() => import('./views/estudiantes/matriculas/poblacion/estudiantecarrera/EstudianteCarrera'))

//nuevos
const ProcedenciaNuevosFacultad = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/procedencianuevosfacultad/ProcedenciaNuevosFacultad'))
const ProcedenciaNuevosCarrera = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/procedencianuevoscarrera/ProcedenciaNuevosCarrera'))
const NuevosLugarFacultad = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/nuevoslugarfacultad/NuevosLugarFacultad'))
const NuevosLugarCarrera = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/nuevoslugarcarrera/NuevosLugarCarrera'))



const MatriculadosNuevosFacultad = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/matriculadosnuevosfacultad/MatriculadosNuevosFacultad'))
const MatriculadosNuevosCarrera = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/matriculadosnuevoscarrera/MatriculadosNuevosCarrera'))

const CrecimientoNuevosCarrera = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/crecimientonuevoscarrera/CrecimientoNuevosCarrera'))

const DepartamentoNuevosFacultad = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/departamentonuevosfacultad/DepartamentoNuevosFacultad'))
const DepartamentoNuevosCarrera = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/departamentonuevoscarrera/DepartamentoNuevosCarrera'))

const ColegioTipoNuevos = React.lazy(() => import('./views/estudiantes/matriculas/nuevos/colegiotiponuevos/ColegioTipoNuevos'))
//regular
const RegularProcedenciaEducativa = React.lazy(() => import('./views/estudiantes/matriculas/regulares/regularprocedenciaeducativa/RegularProcedenciaEducativa'))
const RegularProcedenciaCarrera = React.lazy(() => import('./views/estudiantes/matriculas/regulares/regularprocedenciacarrera/RegularProcedenciaCarrera'))
const RegularLugarFacultad = React.lazy(() => import('./views/estudiantes/matriculas/regulares/regularlugarfacultad/RegularLugarFacultad'))
const RegularLugarCarrera = React.lazy(() => import('./views/estudiantes/matriculas/regulares/regularlugarcarrera/RegularLugarCarrera'))

const MatriculadosRegularFacultad = React.lazy(() => import('./views/estudiantes/matriculas/regulares/matriculadosregularfacultad/MatriculasRegularFacultad'))
const MatriculadosRegularCarrera = React.lazy(() => import('./views/estudiantes/matriculas/regulares/matriculadosregularcarrera/MatriculasRegularCarrera'))

const CrecimientoRegularCarrera = React.lazy(() => import('./views/estudiantes/matriculas/regulares/crecimientoregularcarrera/CrecimientoRegularCarrera'))

const DepartamentoRegularFacultad = React.lazy(() => import('./views/estudiantes/matriculas/regulares/departamentoregularfacultad/DepartamentoRegularFacultad'))
const DepartamentoRegularCarrera = React.lazy(() => import('./views/estudiantes/matriculas/regulares/departamentoregularcarrera/DepartamentoRegularCarrera'))

const ColegioTipoRegular = React.lazy(() => import('./views/estudiantes/matriculas/regulares/colegiotiporegular/ColegioTipoRegular'))


//mobilidad estudiantil 
//actas
const MovilidadPrincipal = React.lazy(() => import('./views/estudiantes/movilidad/movilidadprincipal/MovilidadPrincipal'))

const ActasCarrera = React.lazy(() => import('./views/estudiantes/movilidad/actas/actascarrera/ActasCarrera'))
const ActasFacultad = React.lazy(() => import('./views/estudiantes/movilidad/actas/actasfacultad/ActasFacultad'))
const ActasResumen = React.lazy(() => import('./views/estudiantes/movilidad/actas/actasresumen/ActasResumen'))

const CambioCarrera = React.lazy(() => import('./views/estudiantes/movilidad/cambio/cambiocarrera/CambioCarrera'))
const CambioFacultad = React.lazy(() => import('./views/estudiantes/movilidad/cambio/cambiofacultad/CambioFacultad'))
const CambioResumen = React.lazy(() => import('./views/estudiantes/movilidad/cambio/cambioresumen/CambioResumen'))

const NotasCarrera = React.lazy(() => import('./views/estudiantes/movilidad/notas/notascarrera/NotasCarrera'))
const NotasFacultad = React.lazy(() => import('./views/estudiantes/movilidad/notas/notasfacultad/NotasFacultad'))
const NotasResumen = React.lazy(() => import('./views/estudiantes/movilidad/notas/notasresumen/NotasResumen'))

const ReadmisionCarrera = React.lazy(() => import('./views/estudiantes/movilidad/readmision/readmisioncarrera/ReadmisionCarrera'))
const ReadmisionFacultad = React.lazy(() => import('./views/estudiantes/movilidad/readmision/readmisionfacultad/ReadmisionFacultad'))
const ReadmisionResumen = React.lazy(() => import('./views/estudiantes/movilidad/readmision/readmisionresumen/ReadmisionResumen'))

const SuspensionCarrera = React.lazy(() => import('./views/estudiantes/movilidad/suspension/suspensioncarrera/SuspensionCarrera'))
const SuspensionFacultad = React.lazy(() => import('./views/estudiantes/movilidad/suspension/suspensionfacultad/SuspensionFacultad'))
const SuspensionResumen = React.lazy(() => import('./views/estudiantes/movilidad/suspension/suspensionresumen/SuspensionResumen'))

const TransferenciaCarrera = React.lazy(() => import('./views/estudiantes/movilidad/transferencia/transferenciacarrera/TransferenciaCarrera'))
const TransferenciaFacultad = React.lazy(() => import('./views/estudiantes/movilidad/transferencia/transferenciafacultad/TransferenciaFacultad'))
const TransferenciaResumen = React.lazy(() => import('./views/estudiantes/movilidad/transferencia/transferenciaresumen/TransferenciaResumen'))

const TraspasosCarrera = React.lazy(() => import('./views/estudiantes/movilidad/traspasos/traspasoscarrera/TraspasosCarrera'))
const TraspasosFacultad = React.lazy(() => import('./views/estudiantes/movilidad/traspasos/traspasosfacultad/TraspasosFacultad'))
const TraspasosResumen = React.lazy(() => import('./views/estudiantes/movilidad/traspasos/traspasosresumen/TraspasosResumen'))

//admison estudiantil 
const AdmisionPrincipal = React.lazy(() => import('./views/estudiantes/admision/admisionprincipal/AdmisionPrincipal'))

//psa
const PsaProcedencia = React.lazy(() => import('./views/estudiantes/admision/psa/psaprocedencia/PsaProcedencia'))
const PsaProcedenciaCarrera = React.lazy(() => import('./views/estudiantes/admision/psa/psaprocedenciacarrera/PsaProcedenciaCarrera'))
const PsaLugarFacultad = React.lazy(() => import('./views/estudiantes/admision/psa/psalugarfacultad/PsaLugarFacultad'))
const PsaLugarCarrera= React.lazy(() => import('./views/estudiantes/admision/psa/psalugarcarrera/PsaLugarCarrera'))

const PsaFacultad = React.lazy(() => import('./views/estudiantes/admision/psa/psafacultad/PsaFacultad'))
const PsaCarrera = React.lazy(() => import('./views/estudiantes/admision/psa/psacarrera/PsaCarrera'))
const PsaDepartamentoFacultad = React.lazy(() => import('./views/estudiantes/admision/psa/psadepartamentofacultad/PsaDepartamentoFacultad'))
const PsaDepartamentoCarrera = React.lazy(() => import('./views/estudiantes/admision/psa/psadepartamentocarrera/PsaDepartamentoCarrera'))
const PsaTipoColegio = React.lazy(() => import('./views/estudiantes/admision/psa/psatipocolegio/PsaTipoColegio'))
const PsaTurnoColegio = React.lazy(() => import('./views/estudiantes/admision/psa/psaturnocolegio/PsaTurnoColegio'))
const PsaEdadSexo = React.lazy(() => import('./views/estudiantes/admision/psa/psaedadsexo/PsaEdadSexo'))
const PsaCrecimientoPostulantes = React.lazy(() => import('./views/estudiantes/admision/psa/psacrecimientopostulantes/PsaCrecimientoPostulantes'))
const PsaCrecimientoAceptados = React.lazy(() => import('./views/estudiantes/admision/psa/psacrecimientoaceptados/PsaCrecimientoAceptados'))

//pre-universiatario
const PreProcedencia = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/preprocedencia/PreProcedencia'))
const PreProcedenciaCarrera = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/preprocedenciacarrera/PreProcedenciaCarrera'))
const PreLugarFacultad = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/prelugarfacultad/PreLugarFacultad'))
const PreLugarCarrera = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/prelugarcarrera/PreLugarCarrera'))

const PreFacultad = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/prefacultad/PreFacultad'))
const PreCarrera = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/precarrera/PreCarrera'))
const PreDepartamentoFacultad = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/predepartamentofacultad/PreDepartamentoFacultad'))
const PreDepartamentoCarrera = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/predepartamentocarrera/PreDepartamentoCarrera'))
const PreTipoColegio = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/pretipocolegio/PreTipoColegio'))
const PreTurnoColegio = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/preturnocolegio/PreTurnoColegio'))
const PreEdadSexo = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/preedadsexo/PreEdadSexo'))
const PreCrecimientoPostulantes = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/precrecimientopostulantes/PreCrecimientoPostulantes'))
const PreCrecimientoAceptados = React.lazy(() => import('./views/estudiantes/admision/preuniversitario/precrecimientoaceptados/PreCrecimientoAceptados'))

//especial
const EspecialProcedencia = React.lazy(() => import('./views/estudiantes/admision/especial/especialprocedencia/EspecialProcedencia'))
const EspecialProcedenciaCarrera = React.lazy(() => import('./views/estudiantes/admision/especial/especialprocedenciacarrera/EspecialProcedenciaCarrera'))
const EspecialLugarFacultad = React.lazy(() => import('./views/estudiantes/admision/especial//especiallugarfacultad/EspecialLugarFacultad'))
const EspecialLugarCarrera = React.lazy(() => import('./views/estudiantes/admision/especial/especiallugarcarrera/EspecialLugarCarrera'))


const EspecialFacultad = React.lazy(() => import('./views/estudiantes/admision/especial/especialfacultad/EspecialFacultad'))
const EspecialCarrera = React.lazy(() => import('./views/estudiantes/admision/especial/especialcarrera/EspecialCarrera'))
const EspecialDepartamentoFacultad = React.lazy(() => import('./views/estudiantes/admision/especial/especialdepartamentofacultad/EspecialDepartamentoFacultad'))
const EspecialDepartamentoCarrera = React.lazy(() => import('./views/estudiantes/admision/especial/especialdepartamentocarrera/EspecialDepartamentoCarrera'))
const EspecialTipoColegio = React.lazy(() => import('./views/estudiantes/admision/especial/especialtipocolegio/EspecialTipoColegio'))
const EspecialTurnoColegio = React.lazy(() => import('./views/estudiantes/admision/especial/especialturnocolegio/EspecialTurnoColegio'))
const EspecialEdadSexo = React.lazy(() => import('./views/estudiantes/admision/especial/especialedadsexo/EspecialEdadSexo'))
const EspecialCrecimientoPostulantes = React.lazy(() => import('./views/estudiantes/admision/especial/especialcrecimientopostulantes/EspecialCrecimientoPostulantes'))
const EspecialCrecimientoAceptados = React.lazy(() => import('./views/estudiantes/admision/especial/especialcrecimientoaceptados/EspecialCrecimientoAceptados'))



//Graduados
const FacultadGraduados = React.lazy(() => import('./views/graduados/facultadgraduados/FacultadGraduados'))
const CarreraGraduados = React.lazy(() => import('./views/graduados/carreragraduados/CarreraGraduados'))
const ModalidadGraduados = React.lazy(() => import('./views/graduados/modalidadgraduados/ModalidadGraduados'))
const PermanenciaGraduados = React.lazy(() => import('./views/graduados/permanenciagraduados/PermanenciaGraduados'))
const NotaGraduados = React.lazy(() => import('./views/graduados/notagraudados/NotaGraduados'))


// Programas
const ProgramaDetalle = React.lazy(() => import('./views/programas/ProgramaDetalle'))

const routes = [
    { path: '/', exact: true, name: 'Home', element: Principal },//27/11/24
    { path:'/dashboard', name:'Panel',element:Dashboard},
    //{ path: '/administrativos', name:'Administrativos', exact:true},
    //docentes 
    //{ path: '/docentes', name:'Docentes', exact:true},
    { path: '/docentes/cargodedicacionsexo', name:'Docentes', element: CargoDedicacionSexo},
    { path: '/docentes/cargodedicacionsexoaa', name:'Docentes', element: CargoDedicacionSexoAA},
    { path: '/docentes/cargodedicacionsexoc', name:'Docentes', element: CargoDedicacionSexoC},

    { path: '/docentes/docentescarrerasexo', name:'Docentes', element: DocentesCarreraSexo},
    { path: '/docentes/docentesfacultadsexo', name:'Docentes', element: DocentesFacultadSexo},

    { path: '/docentes/gradoacademicoalcanzado', name:'Docentes', element: GradoAcademicoAlcanzado},
    { path: '/docentes/profesionnivelacademico', name:'Docentes', element: ProfesionNivelAcademico},
    { path: '/docentes/sexoedad', name:'Docentes', element: SexoEdad},
    { path: '/docentes/servicioedad', name:'Docentes', element: ServicioEdad},
    { path: '/docentes/cargahorariacargo', name:'Docentes', element: CargaHorariaCargo},
    { path: '/docentes/docentescrecimiento', name:'Docentes', element: DocentesCrecimiento},
    


    //administrativos
    //{ path: '/administrativo', name:'Administrativos', exact:true},
    { path: '/administrativo/contratosexo', name:'Administrativos', element: TipoContratoSexo},
    { path: '/administrativo/actividadsexo', name:'Administrativos', element: ActividadSexo},

    { path: '/administrativo/cargosexo', name:'Administrativos', element: CargoSexo},
    { path: '/administrativo/unidadsexo', name:'Administrativos', element: UnidadSexo},
    { path: '/administrativo/unidadtipocontrato', name:'Administrativos', element: UnidadTipoContrato},
    { path: '/administrativo/profesiontipocontrato', name:'Administrativos', element: ProfesionTipoContrato},
    { path: '/administrativo/unidadnivelacademico', name:'Administrativos', element: UnidadNivelAcademico},
    { path: '/administrativo/profesionnivelacad', name:'Administrativos', element: ProfesionNivelAcad},
    { path: '/administrativo/edadsexo', name:'Administrativos', element: EdadSexo},
    { path: '/administrativo/administrativoscrecimiento', name:'Administrativos', element: AdministrativosCrecimiento},


    //becas
    { path: '/beca', name:'Beca', exact:true},
    { path: '/beca/becaprincipal', name:'Resumen', element: BecaPrincipal},

    { path: '/beca/alimentacion/alimentacionfacultad', name:'Alimentacion', element: AlimentacionFacultad},
    { path: '/beca/alimentacion/alimentacioncarrera', name:'Alimentacion', element: AlimentacionCarrera},
    { path: '/beca/alimentacion/alimentacionresumen', name:'Alimentacion', element: AlimentacionResumen},
    
    { path: '/beca/docencia/docenciafacultad', name:'Auxiliar de Docencia', element: DocenciaFacultad},
    { path: '/beca/docencia/docenciacarrera', name:'Auxiliar de Docencia', element: DocenciaCarrera},
    { path: '/beca/docencia/docenciaresumen', name:'Auxiliar de Docencia', element: DocenciaResumen},

    { path: '/beca/investigacion/investigacionfacultad', name:'Investigacion', element: InvestigacionFacultad},
    { path: '/beca/investigacion/investigacioncarrera', name:'Investigacion', element: InvestigacionCarrera},
    { path: '/beca/investigacion/investigacionresumen', name:'Investigacion', element: InvestigacionResumen},

    { path: '/beca/graduacion/graduacionfacultad', name:'Graduacion', element: GraduacionFacultad},
    { path: '/beca/graduacion/graduacioncarrera', name:'Graduacion', element: GraduacionCarrera},
    { path: '/beca/graduacion/graduacionresumen', name:'Graduacion', element: GraduacionResumen},

    { path: '/beca/trabajo/trabajofacultad', name:'Trabajo', element: TrabajoFacultad},
    { path: '/beca/trabajo/trabajocarrera', name:'Trabajo', element: TrabajoCarrera},
    { path: '/beca/trabajo/trabajoresumen', name:'Trabajo', element: TrabajoResumen},


    //estudiantes
    { path: '/estudiantes', name:'Estudiantes', exact:true},

    //admisicion estduiantil 
    { path: '/admision', name:'Admision', exact:true},

    //poblacion estduiantil 
    { path: '/poblacion', name:'Poblacion', exact:true},
    
    //mobilidiad estudiantil 
    { path: '/movilidad', name:'Movilidad', exact:true},
    { path: '/estudiantes/movilidad/movilidadprincipal', name:'Movilidad', element: MovilidadPrincipal},

    { path: '/estudiantes/movilidad/actas/actascarrera', name:'Certificados de Actas', element: ActasCarrera},
    { path: '/estudiantes/movilidad/actas/actasfacultad', name:'Certificado de Actas', element: ActasFacultad},
    { path: '/estudiantes/movilidad/actas/actasresumen', name:'Certificado de Actas', element: ActasResumen},

    { path: '/estudiantes/movilidad/cambio/cambiocarrera', name:'Cambio de Carrera', element: CambioCarrera},
    { path: '/estudiantes/movilidad/cambio/cambiofacultad', name:'Cambio de Facultad', element: CambioFacultad},
    { path: '/estudiantes/movilidad/cambio/cambioresumen', name:'Cambio de Facultad', element: CambioResumen},

    { path: '/estudiantes/movilidad/notas/notascarrera', name:'Certificado de Notas', element: NotasCarrera},
    { path: '/estudiantes/movilidad/notas/notasfacultad', name:'Certificado de Notas', element: NotasFacultad},
    { path: '/estudiantes/movilidad/notas/notasresumen', name:'Certificado de Notas', element: NotasResumen},

    { path: '/estudiantes/movilidad/readmision/readmisioncarrera', name:'Readmision', element: ReadmisionCarrera},
    { path: '/estudiantes/movilidad/readmision/readmisionfacultad', name:'Readmision', element: ReadmisionFacultad},
    { path: '/estudiantes/movilidad/readmision/readmisionresumen', name:'Readmision', element: ReadmisionResumen},

    { path: '/estudiantes/movilidad/suspension/suspensioncarrera', name:'Suspension', element: SuspensionCarrera},
    { path: '/estudiantes/movilidad/suspension/suspensionfacultad', name:'Suspencion', element: SuspensionFacultad},
    { path: '/estudiantes/movilidad/suspension/suspensionresumen', name:'Suspencion', element: SuspensionResumen},

    { path: '/estudiantes/movilidad/transferencia/transferenciacarrera', name:'Transferencia', element: TransferenciaCarrera},
    { path: '/estudiantes/movilidad/transferencia/transferenciafacultad', name:'Trnsferencia', element: TransferenciaFacultad},
    { path: '/estudiantes/movilidad/transferencia/transferenciaresumen', name:'Trnsferencia', element: TransferenciaResumen},

    { path: '/estudiantes/movilidad/traspasos/traspasoscarrera', name:'Traspasos', element: TraspasosCarrera},
    { path: '/estudiantes/movilidad/traspasos/traspasosfacultad', name:'Traspaso', element: TraspasosFacultad},
    { path: '/estudiantes/movilidad/traspasos/traspasosresumen', name:'Traspaso', element: TraspasosResumen},

    //poblacion estudiantil
    { path: '/estudiantes/matriculas/matriculasprincipal', name:'Matriculas', element: MatriculasPrincipal},
    
    { path: '/estudiantes/matriculas/poblacion/poblacionprocedenciaeducativa', name:'Poblacion', element: PoblacionProcedenciaEducativa},
    { path: '/estudiantes/matriculas/poblacion/poblacionprocedenciacarrera', name:'Poblacion', element: PoblacionProcedenciaCarrera},
    { path: '/estudiantes/matriculas/poblacion/poblacionlugarfacultad', name:'Poblacion', element: PoblacionLugarFacultad},
    { path: '/estudiantes/matriculas/poblacion/poblacionlugarcarrera', name:'Poblacion', element: PoblacionLugarCarrera},




    { path: '/estudiantes/matriculas/poblacion/matriculadosprogramadosfacultad', name:'Matriculas', element: MatriculadosProgramadosFacultad},
    { path: '/estudiantes/matriculas/poblacion/matriculadosprogramadoscarrera', name:'Traspasos', element: MatriculadosProgramadosCarrera},

    { path: '/estudiantes/matriculas/poblacion/matriculadosfacultad', name:'Traspasos', element: MatriculadosFacultad},
    { path: '/estudiantes/matriculas/poblacion/matriculadoscarrera', name:'Traspasos', element: MatriculadosCarrera},

    { path: '/estudiantes/matriculas/poblacion/departamentofacultad', name:'Traspasos', element: DepartamentoFacultad},
    { path: '/estudiantes/matriculas/poblacion/departamentocarrera', name:'Traspasos', element: DepartamentoCarrera},

    { path: '/estudiantes/matriculas/poblacion/colegiotipo', name:'Traspasos', element: ColegioTipo},

    { path: '/estudiantes/matriculas/poblacion/estudiantefacultad', name:'Traspasos', element: EstudianteFacultad},
    { path: '/estudiantes/matriculas/poblacion/estudiantecarrera', name:'Traspasos', element: EstudianteCarrera},
    //nuevos
    { path: '/estudiantes/matriculas/nuevos/procedencianuevosfacultad', name:'Nuevos', element: ProcedenciaNuevosFacultad},
    { path: '/estudiantes/matriculas/nuevos/procedencianuevoscarrera', name:'Nuevos', element: ProcedenciaNuevosCarrera},
    { path: '/estudiantes/matriculas/nuevos/nuevoslugarfacultad', name:'Nuevos', element: NuevosLugarFacultad},
    { path: '/estudiantes/matriculas/nuevos/nuevoslugarcarrera', name:'Nuevos', element: NuevosLugarCarrera},



    { path: '/estudiantes/matriculas/nuevos/matriculadosnuevosfacultad', name:'Nuevos', element: MatriculadosNuevosFacultad},
    { path: '/estudiantes/matriculas/nuevos/matriculadosnuevoscarrera', name:'Nuevos', element: MatriculadosNuevosCarrera},

    { path: '/estudiantes/matriculas/nuevos/crecimientonuevoscarrera', name:'Nuevos', element: CrecimientoNuevosCarrera},

    { path: '/estudiantes/matriculas/nuevos/departamentonuevosfacultad', name:'Nuevos', element: DepartamentoNuevosFacultad},
    { path: '/estudiantes/matriculas/nuevos/departamentonuevoscarrera', name:'Nuevos', element: DepartamentoNuevosCarrera},

    { path: '/estudiantes/matriculas/nuevos/colegiotiponuevos', name:'Nuevos', element: ColegioTipoNuevos},

    //regular
    { path: '/estudiantes/matriculas/regular/regularprocedenciaeducativa', name:'Regulares', element: RegularProcedenciaEducativa},
    { path: '/estudiantes/matriculas/regular/regularprocedenciacarrera', name:'Regulares', element: RegularProcedenciaCarrera},
    { path: '/estudiantes/matriculas/regular/regularlugarfacultad', name:'Regulares', element: RegularLugarFacultad},
    { path: '/estudiantes/matriculas/regular/regularlugarcarrera', name:'Regulares', element: RegularLugarCarrera},

    { path: '/estudiantes/matriculas/regular/matriculadosregularfacultad', name:'Regulares', element: MatriculadosRegularFacultad},
    { path: '/estudiantes/matriculas/regular/matriculadosregularcarrera', name:'Regulares', element: MatriculadosRegularCarrera},

    { path: '/estudiantes/matriculas/regular/crecimientoregularcarrera', name:'TRegulares', element: CrecimientoRegularCarrera},

    { path: '/estudiantes/matriculas/regular/departamentoregularfacultad', name:'Regulares', element: DepartamentoRegularFacultad},
    { path: '/estudiantes/matriculas/regular/departamentoregularcarrera', name:'Regulares', element: DepartamentoRegularCarrera},

    { path: '/estudiantes/matriculas/regular/colegiotiporegular', name:'Regulares', element: ColegioTipoRegular},

    //postulantes
    { path: '/estudiantes/admision/admisionprincipal', name:'Admision', element: AdmisionPrincipal},
    //psa
    { path: '/estudiantes/admision/psa/psaprocedencia', name:'PSA', element: PsaProcedencia},
    { path: '/estudiantes/admision/psa/psaprocedenciacarrera', name:'PSA', element: PsaProcedenciaCarrera},
    { path: '/estudiantes/admision/psa/psalugarfacultad', name:'PSA', element: PsaLugarFacultad},
    { path: '/estudiantes/admision/psa/psalugarCarrera', name:'PSA', element: PsaLugarCarrera},

    { path: '/estudiantes/admision/psa/psafacultad', name:'PSA', element: PsaFacultad},
    { path: '/estudiantes/admision/psa/psacarrera', name:'PSA', element: PsaCarrera},
    { path: '/estudiantes/admision/psa/psadepartamentofacultad', name:'PSA', element: PsaDepartamentoFacultad},
    { path: '/estudiantes/admision/psa/psadepartamentocarrera', name:'PSA', element: PsaDepartamentoCarrera},
    { path: '/estudiantes/admision/psa/psatipocolegio', name:'PSA', element: PsaTipoColegio},
    { path: '/estudiantes/admision/psa/psaturnocolegio', name:'PSA', element: PsaTurnoColegio},
    { path: '/estudiantes/admision/psa/psaedadsexo', name:'PSA', element: PsaEdadSexo},
    { path: '/estudiantes/admision/psa/psacrecimientopostulantes', name:'PSA', element: PsaCrecimientoPostulantes},
    { path: '/estudiantes/admision/psa/psacrecimientoaceptados', name:'PSA', element: PsaCrecimientoAceptados},

    //preuniversitario
    { path: '/estudiantes/admision/preuniversitario/preprocedencia', name:'Pre-Universitario', element: PreProcedencia},
    { path: '/estudiantes/admision/preuniversitario/preprocedenciacarrera', name:'Pre-Universitario', element: PreProcedenciaCarrera},
    { path: '/estudiantes/admision/preuniversitario/prelugarfacultad', name:'Pre-Universitario', element: PreLugarFacultad},
    { path: '/estudiantes/admision/preuniversitario/prelugarcarrera', name:'Pre-Universitario', element: PreLugarCarrera},


    { path: '/estudiantes/admision/preuniversitario/prefacultad', name:'Admision', element: PreFacultad},
    { path: '/estudiantes/admision/preuniversitario/precarrera', name:'Admision', element: PreCarrera},
    { path: '/estudiantes/admision/preuniversitario/predepartamentofacultad', name:'Admision', element: PreDepartamentoFacultad},
    { path: '/estudiantes/admision/preuniversitario/predepartamentocarrera', name:'Admision', element: PreDepartamentoCarrera},
    { path: '/estudiantes/admision/preuniversitario/pretipocolegio', name:'Admision', element: PreTipoColegio},
    { path: '/estudiantes/admision/preuniversitario/preturnocolegio', name:'Admision', element: PreTurnoColegio},
    { path: '/estudiantes/admision/preuniversitario/preedadsexo', name:'Admision', element: PreEdadSexo},
    { path: '/estudiantes/admision/preuniversitario/precrecimientopostulantes', name:'Admision', element: PreCrecimientoPostulantes},
    { path: '/estudiantes/admision/preuniversitario/precrecimientoaceptados', name:'Admision', element: PreCrecimientoAceptados},
    
    //especial
    { path: '/estudiantes/admision/especial/especialprocedencia', name:'Admision Especial', element: EspecialProcedencia},
    { path: '/estudiantes/admision/especial/especialprocedenciacarrera', name:'Admision Especial', element: EspecialProcedenciaCarrera},
    { path: '/estudiantes/admision/especial/especiallugarfacultad', name:'Admision Especial', element: EspecialLugarFacultad},
    { path: '/estudiantes/admision/especial/especiallugarcarrera', name:'Admision Especial', element: EspecialLugarCarrera},

    { path: '/estudiantes/admision/especial/especialfacultad', name:'Admision', element: EspecialFacultad},
    { path: '/estudiantes/admision/especial/especialcarrera', name:'Admision', element: EspecialCarrera},
    { path: '/estudiantes/admision/especial/especialdepartamentofacultad', name:'Admision', element: EspecialDepartamentoFacultad},
    { path: '/estudiantes/admision/especial/especialdepartamentocarrera', name:'Admision', element: EspecialDepartamentoCarrera},
    { path: '/estudiantes/admision/especial/especialtipocolegio', name:'Admision', element: EspecialTipoColegio},
    { path: '/estudiantes/admision/especial/especialturnocolegio', name:'Admision', element: EspecialTurnoColegio},
    { path: '/estudiantes/admision/especial/especialedadsexo', name:'Admision', element: EspecialEdadSexo},
    { path: '/estudiantes/admision/especial/especialcrecimientopostulantes', name:'Admision', element: EspecialCrecimientoPostulantes},
    { path: '/estudiantes/admision/especial/especialcrecimientoaceptados', name:'Admision', element: EspecialCrecimientoAceptados},
    

    //graduados
    { path: '/graduados', name:'Graduados', exact:true},
    { path: '/graduados/facultadgraduados', name:'Graduados', element: FacultadGraduados},
    { path: '/graduados/carreragraduados', name:'Graduados', element: CarreraGraduados},
    { path: '/graduados/modalidadgraduados', name:'Graduados', element: ModalidadGraduados},
    { path: '/graduados/permanenciagraduados', name:'Graduados', element: PermanenciaGraduados},
    { path: '/graduados/notagraduados', name:'Graduados', element: NotaGraduados},

    // Nueva ruta para los detalles del programa
    { path: '/programas/:id_programa', name: 'ProgramaDetalle', element: ProgramaDetalle },
    




]   
export default routes