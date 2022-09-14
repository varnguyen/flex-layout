import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Action, Actions, Layout, Model, TabNode } from 'flexlayout-react'
import { COMPONENTS, DEFAULT_JSON_MODEL, WIDGETS } from './constants'
import { BiLink } from 'react-icons/bi'

import 'flexlayout-react/style/light.css'
import './assets/styles.css'

function CustomLayout() {
  const layoutRef = useRef<any>()
  const [rawModel, setRawModel] = useState<Model>()
  const [showWidgets, setShowWidgets] = useState<boolean>(false)

  useEffect(() => {
    setRawModel(Model.fromJson(DEFAULT_JSON_MODEL))
  }, [])

  const factory = (node: TabNode) => {
    var component = node.getComponent()
    if (component === 'text') {
      return <div className="panel">Panel {node.getName()}</div>
    }
  }

  const onAction = (action: Action) => {
    const tabNode = rawModel ? rawModel?.getActiveTabset()?.getSelectedNode()?.getId() : ''

    if (
      [Actions.ADJUST_SPLIT, Actions.DELETE_TAB, Actions.MAXIMIZE_TOGGLE, Actions.ADD_NODE, Actions.MOVE_NODE].includes(
        action.type
      ) ||
      (action.type === Actions.SELECT_TAB && action.data.tabNode !== tabNode)
    ) {
      return action
    }

    return undefined
  }

  const onModelChange = (model: Model) => {
    console.log('onModelChange', model)
    setRawModel(model)
  }

  const onAddWidget = (name: string) => {
    const { current: layout } = layoutRef
    if (!layout) {
      return
    }

    const titleDragAndDrop = `Di chuột đến khu vực cần thêm và thả\n${name}`
    layout.addTabWithDragAndDrop(titleDragAndDrop, COMPONENTS[name])
  }

  const iconFactory = useCallback((node: TabNode) => {
    if (!node) {
      return <></>
    }

    return (
      <div>
        <BiLink />
      </div>
    )
  }, [])

  const titleFactory = (node: TabNode) => {
    const name = node.getName() || ''
    return {
      name,
      titleContent: <div>{name}</div>
    }
  }

  return (
    <div className="custom-layout">
      <div className="header">
        <span>Flex Layout Example</span>
        <div className="widgets">
          <span onClick={() => setShowWidgets(!showWidgets)}>Widgets</span>
          {showWidgets && (
            <div className="list">
              {WIDGETS.map((item, index) => (
                <div key={index} onClick={() => onAddWidget(item.name)}>
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {!!rawModel && (
        <div className="layout-container">
          <Layout
            ref={layoutRef}
            model={rawModel}
            icons={{
              close: () => <div title="Close">x</div>,
              maximize: () => <div title="Full">Full</div>,
              restore: () => <div title="Small">Small</div>,
              more: (_node, hiddenTabs) => {
                return <div title="Hidden Tabs">Tabs: {hiddenTabs.length}</div>
              }
            }}
            factory={factory}
            iconFactory={iconFactory}
            titleFactory={titleFactory}
            onAction={onAction}
            onModelChange={onModelChange}
          />
        </div>
      )}
    </div>
  )
}

export default memo(CustomLayout)
