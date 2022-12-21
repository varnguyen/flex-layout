import { IJsonModel } from 'flexlayout-react'

export enum COMPONENT_KEYS {
  component1 = 'component1',
  component2 = 'component2'
}

export const COMPONENTS: Record<string, any> = {
  [COMPONENT_KEYS.component1]: {
    component: COMPONENT_KEYS.component1,
    name: 'Comp 1'
  },
  [COMPONENT_KEYS.component2]: {
    component: COMPONENT_KEYS.component2,
    name: 'Comp 2'
  }
}

export const DEFAULT_JSON_MODEL: IJsonModel = {
  global: {},
  borders: [],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        id: 'Navigation',
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: []
      }
    ]
  }
}

export const WIDGETS = [
  {
    name: COMPONENT_KEYS.component1,
    title: 'Component 1'
  },
  {
    name: COMPONENT_KEYS.component2,
    title: 'Component 2'
  }
]
