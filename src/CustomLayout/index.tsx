import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Action, Actions, Layout, Model, TabNode } from 'flexlayout-react'
import { COMPONENTS, DEFAULT_JSON_MODEL, WIDGETS } from './constants'
import { LayoutInfo } from './types'
import { BiPlus, BiLink } from 'react-icons/bi'
import { MdOutlineClose, MdFullscreen, MdFullscreenExit, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import 'flexlayout-react/style/dark.css'
import './assets/styles.css'
import Factory from './components/Factory'

const defaultLayouts = [
  {
    name: 'Tab 1',
    layoutId: 1,
    model: DEFAULT_JSON_MODEL
  }
]

function CustomLayout() {
  const layoutRef = useRef<any>()
  const [rawModel, setRawModel] = useState<Model>()
  const [showWidgets, setShowWidgets] = useState<boolean>(false)
  const [layouts, setLayouts] = useState<LayoutInfo[]>(defaultLayouts)
  const [layoutActived, setLayoutActived] = useState<LayoutInfo>()

  useEffect(() => {
    setLayoutActived({
      name: 'Tab 1',
      layoutId: 1,
      model: DEFAULT_JSON_MODEL
    })
  }, [])

  useEffect(() => {
    if (!layoutActived) {
      return
    }

    setRawModel(Model.fromJson(layoutActived.model))
  }, [layoutActived])

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
    const layoutModel = model.toJson()

    if (!layoutActived || !layoutModel) {
      return
    }

    const index = layouts.findIndex((layout) => layout.layoutId === layoutActived.layoutId)
    if (index < 0) {
      return
    }

    layouts[index].model = layoutModel

    setLayouts([...layouts])
  }

  const onAddWidget = (name: string) => {
    const { current: layout } = layoutRef
    if (!layout) {
      return
    }

    const titleDragAndDrop = `Hover over the area to add and release\n${name}\nPress [ESC] to cancel`
    layout.addTabWithDragAndDropIndirect(titleDragAndDrop, COMPONENTS[name]) //addTabWithDragAndDrop
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

  const onCreateLayout = () => {
    setLayouts([
      ...layouts,
      {
        name: `Tab ${layouts.length + 1}`,
        layoutId: layouts.length + 1,
        model: DEFAULT_JSON_MODEL
      }
    ])
  }

  const onActiveLayout = (layout: LayoutInfo) => {
    if (layout.layoutId === layoutActived?.layoutId) {
      return
    }

    setLayoutActived(layout)
  }

  return (
    <div className="custom-layout">
      <div className="header">Flex Layout Example</div>
      <div className="tools-bar">
        <div className="tabs">
          {layouts.map((layout: LayoutInfo) => (
            <div
              key={layout.layoutId}
              className={`tab ${layout.layoutId === layoutActived?.layoutId ? 'active' : ''}`}
              onClick={() => onActiveLayout(layout)}
            >
              {layout.name}
            </div>
          ))}
          {layouts.length < 5 && (
            <div className="tab add-layout" onClick={onCreateLayout}>
              <BiPlus />
              Add layout
            </div>
          )}
        </div>
        <div className="widgets" onClick={() => setShowWidgets(!showWidgets)}>
          List widgets
          {showWidgets && (
            <div className="list">
              {WIDGETS.map((item, index) => (
                <div className="widget" key={index} onClick={() => onAddWidget(item.name)}>
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
              close: () => <MdOutlineClose title="" />,
              maximize: () => <MdFullscreen />,
              restore: () => <MdFullscreenExit />,
              more: (_node, hiddenTabs) => {
                return (
                  <div>
                    <MdOutlineKeyboardArrowDown title="" />
                    {hiddenTabs.length}
                  </div>
                )
              }
            }}
            factory={(node) => <Factory node={node} />}
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
