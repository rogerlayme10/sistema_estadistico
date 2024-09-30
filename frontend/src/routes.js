
import React from 'react'


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
const AlimentacionFacultad = React.lazy(() => import('./views/beca/alimentacion/alimentacionfacultad/AlimentacionFacultad'))
const AlimentacionCarrera = React.lazy(() => import('./views/beca/alimentacion/alimentacioncarrera/AlimentacionCarrera'))

const DocenciaFacultad = React.lazy(() => import('./views/beca/docencia/docenciafacultad/DocenciaFacultad'))
const DocenciaCarrera = React.lazy(() => import('./views/beca/docencia/docenciacarrera/DocenciaCarrera'))

const InvestigacionFacultad = React.lazy(() => import('./views/beca/investigacion/investigacionfacultad/Investigacionfacultad'))
const InvestigacionCarrera = React.lazy(() => import('./views/beca/investigacion/investigacioncarrera/InvestigacionCarrera'))

const GraduacionFacultad = React.lazy(() => import('./views/beca/graduacion/graduacionfacultad/GraduacionFacultad'))
const GraduacionCarrera = React.lazy(() => import('./views/beca/graduacion/graduacioncarrera/GraduacionCarrera'))

const TrabajoFacultad = React.lazy(() => import('./views/beca/trabajo/trabajofacultad/TrabajoFacultad'))
const TrabajoCarrera = React.lazy(() => import('./views/beca/trabajo/trabajocarrera/TrabajoCarrera'))

//admison estudiantil 
//poblacion estudiantil 
//mobilidad estudoinatil 

//Graduados
// Programas
const ProgramaDetalle = React.lazy(() => import('./views/programas/ProgramaDetalle'))

const routes = [
    {path: '/', exact:true, name:'Home'},
    { path:'/dashboard', name:'Dashboard',element:Dashboard},
    //{ path: '/administrativos', name:'Administrativos', exact:true},
    //docentes 
    { path: '/docentes', name:'Docentes', exact:true},
    { path: '/docentes/cargodedicacionsexo', name:'stat', element: CargoDedicacionSexo},
    { path: '/docentes/cargodedicacionsexoaa', name:'stat', element: CargoDedicacionSexoAA},
    { path: '/docentes/cargodedicacionsexoc', name:'stat', element: CargoDedicacionSexoC},

    { path: '/docentes/docentescarrerasexo', name:'stat', element: DocentesCarreraSexo},
    { path: '/docentes/docentesfacultadsexo', name:'stat', element: DocentesFacultadSexo},

    { path: '/docentes/gradoacademicoalcanzado', name:'stat', element: GradoAcademicoAlcanzado},
    { path: '/docentes/profesionnivelacademico', name:'stat', element: ProfesionNivelAcademico},
    { path: '/docentes/sexoedad', name:'stat', element: SexoEdad},
    { path: '/docentes/servicioedad', name:'stat', element: ServicioEdad},
    { path: '/docentes/cargahorariacargo', name:'stat', element: CargaHorariaCargo},
    { path: '/docentes/docentescrecimiento', name:'stat', element: DocentesCrecimiento},
    


    //administrativos
    { path: '/administrativo', name:'Administrativos', exact:true},
    { path: '/administrativo/contratosexo', name:'stat', element: TipoContratoSexo},
    { path: '/administrativo/actividadsexo', name:'stat', element: ActividadSexo},

    { path: '/administrativo/cargosexo', name:'stat', element: CargoSexo},
    { path: '/administrativo/unidadsexo', name:'stat', element: UnidadSexo},
    { path: '/administrativo/unidadtipocontrato', name:'stat', element: UnidadTipoContrato},
    { path: '/administrativo/profesiontipocontrato', name:'stat', element: ProfesionTipoContrato},
    { path: '/administrativo/unidadnivelacademico', name:'stat', element: UnidadNivelAcademico},
    { path: '/administrativo/profesionnivelacad', name:'stat', element: ProfesionNivelAcad},
    { path: '/administrativo/edadsexo', name:'stat', element: EdadSexo},
    { path: '/administrativo/administrativoscrecimiento', name:'stat', element: AdministrativosCrecimiento},


    //becas
    { path: '/beca', name:'Beca', exact:true},
    { path: '/beca/alimentacion/alimentacionfacultad', name:'stat', element: AlimentacionFacultad},
    { path: '/beca/alimentacion/alimentacioncarrera', name:'stat', element: AlimentacionCarrera},
    
    { path: '/beca/docencia/docenciafacultad', name:'stat', element: DocenciaFacultad},
    { path: '/beca/docencia/docenciacarrera', name:'stat', element: DocenciaCarrera},

    { path: '/beca/investigacion/investigacionfacultad', name:'stat', element: InvestigacionFacultad},
    { path: '/beca/investigacion/investigacioncarrera', name:'stat', element: InvestigacionCarrera},

    { path: '/beca/graduacion/graduacionfacultad', name:'stat', element: GraduacionFacultad},
    { path: '/beca/graduacion/graduacioncarrera', name:'stat', element: GraduacionCarrera},

    { path: '/beca/trabajo/trabajofacultad', name:'stat', element: TrabajoFacultad},
    { path: '/beca/trabajo/trabajocarrera', name:'stat', element: TrabajoCarrera},


    //estudiantes
    { path: '/estudiantes', name:'Estudiantes', exact:true},

    //admisicion estduiantil 
    { path: '/admision', name:'Admision', exact:true},

    //poblacion estduiantil 
    { path: '/poblacion', name:'Poblacion', exact:true},
    
    //mobilidiad estudiantil 
    { path: '/mobilidad', name:'Mobilidad', exact:true},


    //graduados
    { path: '/graduados', name:'Graduados', exact:true},

    // Nueva ruta para los detalles del programa
    { path: '/programas/:id_programa', name: 'ProgramaDetalle', element: ProgramaDetalle },
    




]   
export default routes