import * as React from 'react'
import * as models from 'server/DTOModels'
import { NavBar } from 'antd-mobile';

interface Props {
  layout: models.Layout
}

const Layout: React.FC<Props> = ({layout, children}) => {
  return (
    <React.Fragment>
      <NavBar
        mode="dark"
        icon={layout.leftControl}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={layout.rightControls} 
      >
        {layout.title}
      </NavBar>
      {children}
    </React.Fragment>
  )
}

export default Layout