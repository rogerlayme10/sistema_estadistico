import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://www.uatf.edu.bo/" target="_blank" rel="noopener noreferrer">
          UATF
        </a>
        <span className="ms-1">&copy; 2024 Estadisticas</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">DSA</span>
        <a href="https://virtual.uatf.edu.bo/course/index.php?categoryid=63" target="_blank" rel="noopener noreferrer">
          DireccionServiciosAcademicos
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
