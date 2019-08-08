import * as React from 'react'
import * as models from 'dto'
import { NavBar } from 'antd-mobile';
import DialogContainer from 'client/containers/dialog'

interface Props {
  layout: models.Layout
}

const Layout: React.FC<Props> = ({layout, children}) => {
  return (
    <React.Fragment>
      <DialogContainer />
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