import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilPeople, cilEducation, cilBuilding, cilMoney, cilHouse,cilOptions,cilGarage, cilChevronRight } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const nav = [
  {
    component: CNavItem,
    name: 'Principal',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    
  },
  {
    component: CNavTitle,
    name: 'Estadisticas',
  },
  {
    component: CNavGroup,
    name: 'Administrativos',
    to: '/administrativo',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Total Administrativos ',
        to: './administrativo/administrativoscrecimiento',
      },
      {
        component: CNavItem,
        name: 'Actividad segun Sexo',
        to: './administrativo/actividadsexo',
      },
      {
        component: CNavItem,
        name: 'Contrato segun Sexo',
        to: './administrativo/contratosexo',
      },
      {
        component: CNavItem,
        name: 'Edad Sexo',
        to: './administrativo/edadsexo',
      },
      {
        component: CNavItem,
        name: 'Profesion Nivel Academico',
        to: './administrativo/profesionnivelacad',
      },
      {
        component: CNavItem,
        name: 'Profesion Tipo Contrato',
        to: './administrativo/profesiontipocontrato',
      },
      {
        component: CNavItem,
        name: 'Unidad segun Sexo',
        to: './administrativo/unidadsexo',
      },
      {
        component: CNavItem,
        name: 'Unidad Tipo Contrato',
        to: './administrativo/unidadtipocontrato',
      },
      {
        component: CNavItem,
        name: 'Unidad Nivel Academico',
        to: './administrativo/unidadnivelacademico',
      },
      /*
       {
         component: CNavItem,
         name: 'Cargo segun Sexo',
         to: './administrativo/cargosexo',
       },
      
       {
         component: CNavItem,
         name: 'Profesion Segun Sexo',
         to: './administrativos',
       },*/
    ],
  },

  {
    component: CNavGroup,
    name: 'Docentes',
    to: '/docentes',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Total Docentes  ',
        to: '/docentes/docentescrecimiento',
      },
      {
        component: CNavItem,
        name: 'Autoridades ',
        to: '/docentes/cargodedicacionsexo',
      },
      {
        component: CNavItem,
        name: 'Autoridades Academicas ',
        to: '/docentes/cargodedicacionsexoaa',
      },
      /*{
        component: CNavItem,
        name: 'Años de Servicio',
        to: '/docentes/servicioedad',
      },*/
      {
        component: CNavItem,
        name: 'Categoria',
        to: '/docentes/cargodedicacionsexoc',
      },
      {
        component: CNavItem,
        name: 'Carrera Segun sexo',
        to: '/docentes/docentescarrerasexo',
      },
      {
        component: CNavItem,
        name: 'Carga Horaria',
        to: '/docentes/cargahorariacargo',
      },
      {
        component: CNavItem,
        name: 'Edad segun Sexo',
        to: '/docentes/sexoedad',
      },
      {
        component: CNavItem,
        name: 'Facultad Segun sexo',
        to: '/docentes/docentesfacultadsexo',
      },
      {
        component: CNavItem,
        name: 'Grado Academico Alcanzado',
        to: '/docentes/gradoacademicoalcanzado',
      },
      {
        component: CNavItem,
        name: 'Profesion, Nivel Academico',
        to: '/docentes/profesionnivelacademico',
      },



    ],

  },
  {
    component: CNavGroup,
    name: 'Estudiantes',
    to: '/estudiantes',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Becas',
        to: './beca',
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
        items: [
          {
            component: CNavGroup,
            name: 'Alimentacion',
            to: '/beca',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad Sexo',
                to: '/beca/alimentacion/alimentacionfacultad',

              },
              {
                component: CNavItem,
                name: 'Carrera Sexo',
                to: '/beca/alimentacion/alimentacioncarrera',

              }

            ]
          },
          {
            component: CNavGroup,
            name: 'Aux Docencia',
            to: '/beca',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad Sexo',
                to: '/beca/docencia/docenciafacultad',

              },
              {
                component: CNavItem,
                name: 'Carrera Sexo',
                to: '/beca/docencia/docenciacarrera',

              }
            ],
          },
          {
            component: CNavGroup,
            name: 'Graduacion',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            to: '/beca',
            
            items: [
              {
                component: CNavItem,
                name: 'Facultad Sexo',
                to: '/beca/graduacion/graduacionfacultad',

              },
              {
                component: CNavItem,
                name: 'Carrera Sexo',
                to: '/beca/graduacion/graduacioncarrera',

              }
            ],
          },
          {
            component: CNavGroup,
            name: 'Aux Investigacion',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            to: '/beca',
            items: [
              {
                component: CNavItem,
                name: 'Facultad Sexo',
                to: '/beca/investigacion/investigacionfacultad',

              },
              {
                component: CNavItem,
                name: 'Carrera Sexo',
                to: '/beca/investigacion/investigacioncarrera',

              }
            ],

          },
          {
            component: CNavGroup,
            name: 'Trabajo',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            to: '/b',
            items: [
              {
                component: CNavItem,
                name: 'Facultad Sexo',
                to: '/beca/trabajo/trabajofacultad',

              },
              {
                component: CNavItem,
                name: 'Carrera Sexo',
                to: '/beca/trabajo/trabajocarrera',

              }
            ],
          },

        ]
      },
      {
        component: CNavGroup,
        name: 'Admision Estudiantil',
        to: './estudiantes',
        icon: <CIcon icon={cilChevronRight} customClassName="nav-icon" />,
        items: [
          {
            component:CNavGroup,
            name: 'PSA',
            to:'./estudinates',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items:[
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/admision/psa/psafacultad',
              }, 
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/admision/psa/psacarrera',
              },
              {
                component: CNavItem,
                name: 'Departamento Facultad',
                to: './estudiantes/admision/psa/psadepartamentofacultad',
              }, 
              {
                component: CNavItem,
                name: 'Departamento Carrera',
                to: './estudiantes/admision/psa/psadepartamentocarrera',
              },
              {
                component: CNavItem,
                name: 'Tipo Colegio',
                to: './estudiantes/admision/psa/psatipocolegio',
              }, 
              {
                component: CNavItem,
                name: 'Turno Colegio',
                to: './estudiantes/admision/psa/psaturnocolegio',
              },
              {
                component: CNavItem,
                name: 'Edad Sexo',
                to: './estudiantes/admision/psa/psaedadsexo',
              },
              {
                component: CNavItem,
                name: 'Tasa Postulantes',
                to: './estudiantes/admision/psa/psacrecimientopostulantes',
              },
              {
                component: CNavItem,
                name: 'Tasa Aceptados',
                to: './estudiantes/admision/psa/psacrecimientoaceptados',
              },
            ]
          },
          {
            component:CNavGroup,
            name: 'Pre Universitario',
            to:'./estudiantes',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items:[
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/admision/preuniversitario/prefacultad',
              }, 
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/admision/preuniversitario/precarrera',
              },
              {
                component: CNavItem,
                name: 'Departamento Facultad',
                to: './estudiantes/admision/preuniversitario/predepartamentofacultad',
              }, 
              {
                component: CNavItem,
                name: 'Departamento Carrera',
                to: './estudiantes/admision/preuniversitario/predepartamentocarrera',
              },
              {
                component: CNavItem,
                name: 'Tipo Colegio',
                to: './estudiantes/admision/preuniversitario/pretipocolegio',
              }, 
              {
                component: CNavItem,
                name: 'Turno Colegio',
                to: './estudiantes/admision/preuniversitario/preturnocolegio',
              },
              {
                component: CNavItem,
                name: 'Edad Sexo',
                to: './estudiantes/admision/preuniversitario/preedadsexo',
              },
              {
                component: CNavItem,
                name: 'Tasa Postulantes',
                to: './estudiantes/admision/preuniversitario/precrecimientopostulantes',
              },
              {
                component: CNavItem,
                name: 'Tasa Aceptados',
                to: './estudiantes/admision/preuniversitario/precrecimientoaceptados',
              },
            ]
          },
          {
            component:CNavGroup,
            name: 'Admision Especial ',
            to:'./poblacion',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items:[
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/admision/especial/especialfacultad',
              }, 
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/admision/especial/especialcarrera',
              },
              {
                component: CNavItem,
                name: 'Departamento Facultad',
                to: './estudiantes/admision/especial/especialdepartamentofacultad',
              }, 
              {
                component: CNavItem,
                name: 'Departamento Carrera',
                to: './estudiantes/admision/especial/especialdepartamentocarrera',
              },
              {
                component: CNavItem,
                name: 'Tipo Colegio',
                to: './estudiantes/admision/especial/especialtipocolegio',
              }, 
              {
                component: CNavItem,
                name: 'Turno Colegio',
                to: './estudiantes/admision/especial/especialturnocolegio',
              },
              {
                component: CNavItem,
                name: 'Edad Sexo',
                to: './estudiantes/admision/especial/especialedadsexo',
              },
              {
                component: CNavItem,
                name: 'Tasa Postulantes',
                to: './estudiantes/admision/especial/especialcrecimientopostulantes',
              },
              {
                component: CNavItem,
                name: 'Tasa Aceptados',
                to: './estudiantes/admision/especial/especialcrecimientoaceptados',
              }, 
            ]
          },
        ]
      },
      {
        component: CNavGroup,
        name: 'Poblacion Estudiantil',
        to: './poblacion',
        icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
        items: [
          {
            component:CNavGroup,
            name: 'Poblacion Estudiantil',
            to:'./poblacion',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items:[
              {
                component: CNavItem,
                name: 'Programados Facultad',
                to: './estudiantes/matriculas/poblacion/matriculadosprogramadosfacultad',
              },
              {
                component: CNavItem,
                name: 'Programados Carrera',
                to: './estudiantes/matriculas/poblacion/matriculadosprogramadoscarrera',
              },
              {
                component: CNavItem,
                name: 'Matriculados Facultad',
                to: './estudiantes/matriculas/poblacion/matriculadosfacultad',
              },
              {
                component: CNavItem,
                name: 'Matriculados Carrera',
                to: './estudiantes/matriculas/poblacion/matriculadoscarrera',
              },
              {
                component: CNavItem,
                name: 'Departamento Facultad',
                to: './estudiantes/matriculas/poblacion/departamentofacultad',
              },
              {
                component: CNavItem,
                name: 'Departamento Carrera',
                to: './estudiantes/matriculas/poblacion/departamentocarrera',
              },
              {
                component: CNavItem,
                name: 'Tipo de Colegio',
                to: './estudiantes/matriculas/poblacion/colegiotipo',
              },
              {
                component: CNavItem,
                name: 'Estudiantes Facultad',
                to: './estudiantes/matriculas/poblacion/estudiantefacultad',
              },
              {
                component: CNavItem,
                name: 'Estudiantes Carrera',
                to: './estudiantes/matriculas/poblacion/estudiantecarrera',
              },

            ]

          },
          {
            component:CNavGroup,
            name: 'Estudiantes Regulares',
            to:'./poblacion',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items:[
              {
                component: CNavItem,
                name: 'Matriculados Facultad',
                to: './estudiantes/matriculas/regular/matriculadosregularfacultad',
              },
              {
                component: CNavItem,
                name: 'Matriculados Carrera',
                to: './estudiantes/matriculas/regular/matriculadosregularcarrera',
              },
              {
                component: CNavItem,
                name: 'Tasa Crecimiento',
                to: './estudiantes/matriculas/regular/crecimientoregularcarrera',
              },
              {
                component: CNavItem,
                name: 'Departamento Facultad',
                to: './estudiantes/matriculas/regular/departamentoregularfacultad',
              },
              {
                component: CNavItem,
                name: 'Departamento Carrera',
                to: './estudiantes/matriculas/regular/departamentoregularcarrera',
              },
              {
                component: CNavItem,
                name: 'Tipo Colegio',
                to: './estudiantes/matriculas/regular/colegiotiporegular',
              },

            ]

          },
          {
            component:CNavGroup,
            name: 'Estudiantes Nuevos',
            to:'./poblacion',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items:[
              {
                component: CNavItem,
                name: 'Matriculados Facultad',
                to: './estudiantes/matriculas/nuevos/matriculadosnuevosfacultad',
              },
              {
                component: CNavItem,
                name: 'Matriculados Carrera',
                to: './estudiantes/matriculas/nuevos/matriculadosnuevoscarrera',
              },
              {
                component: CNavItem,
                name: 'Tasa Crecimiento',
                to: './estudiantes/matriculas/nuevos/crecimientonuevoscarrera',
              },
              {
                component: CNavItem,
                name: 'Departamento Facultad',
                to: './estudiantes/matriculas/nuevos/departamentonuevosfacultad',
              },
              {
                component: CNavItem,
                name: 'Departamento Carrera',
                to: './estudiantes/matriculas/nuevos/departamentonuevoscarrera',
              },
              {
                component: CNavItem,
                name: 'Tipo Colegio',
                to: './estudiantes/matriculas/nuevos/colegiotiponuevos',
              },
            ]
          },
          
        ]
      },
      {
        component: CNavGroup,
        name: 'Movilidad',
        to: './movilidad',
        icon: <CIcon icon={cilGarage} customClassName="nav-icon" />,
        items: [
          {
            component: CNavGroup,
            name: 'Actas',
            to: './movilidad',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/movilidad/actas/actasfacultad',
              },
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/movilidad/actas/actascarrera',
              }
            ]
          },
          
          {
            component: CNavGroup,
            name: 'Cambio Carrera',
            to: './movilidad',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/movilidad/cambio/cambiofacultad',
              },
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/movilidad/cambio/cambiocarrera',
              }
            ]
          },
          {
            component: CNavGroup,
            name: 'Notas',
            to: './movilidad',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/movilidad/notas/notasfacultad',
              },
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/movilidad/notas/notascarrera',
              }
            ]
          },
          {
            component: CNavGroup,
            name: 'Readmision',
            to: './movilidad',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/movilidad/readmision/readmisionfacultad',
              },
              {
                component: CNavItem,
                name: 'Carrera',
                to: '/estudiantes/movilidad/readmision/readmisioncarrera',
              }
            ]
          },
          {
            component: CNavGroup,
            name: 'Suspension',
            to: './movilidad',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/movilidad/suspension/suspensionfacultad',
              },
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/movilidad/suspension/suspensioncarrera',
              }
            ]
          },
          {
            component: CNavGroup,
            name: 'Transferencia',
            to: './movilidad',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/movilidad/transferencia/transferenciafacultad',
              },
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/movilidad/transferencia/transferenciacarrera',
              }
            ]
          },
          {
            component: CNavGroup,
            name: 'Traspasos',
            to: './movilidad',
            icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Facultad',
                to: './estudiantes/movilidad/traspasos/traspasosfacultad',
              },
              {
                component: CNavItem,
                name: 'Carrera',
                to: './estudiantes/movilidad/traspasos/traspasoscarrera',
              }
            ]
          },
        ]

      },
    ],

  },
  {
    component: CNavGroup,
    name: 'Graduados',
    to: '/graduados',
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'A',
        to: './graduados',
      },
    ],

  },
]
export default nav
