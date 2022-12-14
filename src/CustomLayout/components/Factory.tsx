import React, { memo } from 'react'
import { TabNode } from 'flexlayout-react'
import { COMPONENT_KEYS } from '../constants'
import Component1 from './Component1'
import Component2 from './Component2'

interface Props {
  node: TabNode
}

function Factory({ node }: Props) {
  const component = node.getComponent()

  if (component === COMPONENT_KEYS.component1) {
    return <Component1 />
  }

  if (component === COMPONENT_KEYS.component2) {
    return <Component2 />
  }

  return <></>
}

export default memo(Factory)
