import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilPeople, cilEducation, cilBuilding,cilMoney,cilHouse } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
//import { compose } from 'redux'

const nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
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
      {
        component: CNavItem,
        name: 'Años de Servicio',
        to: '/docentes/servicioedad',
      },
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
        icon: <CIcon icon={cilMoney}customClassName="nav-icon"  />,
        items: [
          {
            component: CNavGroup,
            name: 'Alimentacion',
            to: '/beca',
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
            name: 'Docencia',
            to: '/base',
            items:[
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
            component:CNavGroup,
            name: 'Investigacion',
            to: '/base',
            items:[
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
            component:CNavGroup,
            name: 'Graduacion',
            to: '/base',
            items:[
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
            component:CNavGroup,
            name: 'Trabajo',
            to: '/base',
            items:[
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
        to: '/admision',
        icom: <CIcon icon={cilHouse} customClassName="nav-icon" />
      },
      {
        component: CNavGroup,
        name: 'Poblacion Estudiantil',
        to: './poblacion',
        icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
        
        items: [
          {
            component: CNavItem,
            name: 'A',
            to: './poblacion',
          },
          {
            component: CNavItem,
            name: 'B',
            to: './poblacion',
          },
        ]
      },
      {
        component: CNavGroup,
        name: 'Mobilidad Estudiantil',
        to: '/mobilidad',
        icom: <CIcon icon={cilHouse} customClassName="nav-icon" />
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
