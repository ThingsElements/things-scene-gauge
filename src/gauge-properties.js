/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

export const PROPERTIES = [
  {
    type: 'string',
    label: 'value',
    name: 'value',
    property: 'value'
  },
  {
    type: 'number',
    label: 'start-value',
    name: 'startValue',
    observe: function (startValue) {
      this.parentNode.querySelector('[name=colorStops]').property.min = startValue
    },
    property: 'startValue'
  },
  {
    type: 'number',
    label: 'end-value',
    name: 'endValue',
    observe: function (endValue) {
      this.parentNode.querySelector('[name=colorStops]').property.max = endValue
    },
    property: 'endValue'
  },
  {
    type: 'number',
    label: 'step',
    name: 'step',
    property: 'step'
  },
  {
    type: 'number',
    label: 'step-text-size',
    name: 'stepTextSize',
    property: 'stepTextSize'
  },
  {
    type: 'number',
    label: 'sub-step',
    name: 'subStep',
    property: 'subStep'
  },
  {
    type: 'number',
    label: 'step-needle-size',
    name: 'stepNeedleSize',
    property: 'stepNeedleSize'
  },
  {
    type: 'color',
    label: 'step-fill-style',
    name: 'stepFillStyle',
    property: 'stepFillStyle'
  },
  {
    type: 'solid-color-stops',
    label: 'color-stops',
    name: 'colorStops',
    property: {
      min: 0,
      max: 100
    }
  },
  {
    type: 'legend',
    label: '',
    name: 'toggleOption',
    property: {
      label: 'Toggle Option'
    }
  },
  {
    type: 'checkbox',
    label: 'show-start-value',
    name: 'showStartValue',
    property: 'showStartValue'
  },
  {
    type: 'checkbox',
    label: 'show-end-value',
    name: 'showEndValue',
    property: 'showEndValue'
  },
  {
    type: 'checkbox',
    label: 'show-step-line',
    name: 'showStepLine',
    property: 'showStepLine'
  },
  {
    type: 'checkbox',
    label: 'show-step-text',
    name: 'showStepText',
    property: 'showStepText'
  },
  {
    type: 'checkbox',
    label: 'show-sub-step',
    name: 'showSubStep',
    property: 'showSubStep'
  },
  {
    type: 'checkbox',
    label: 'anim-from-base',
    name: 'animFromBase'
  }
]
