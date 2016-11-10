const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'value',
    name: 'value',
    property: 'value'
  },{
    type: 'number',
    label: 'startValue',
    name: 'startValue',
    observe: function(startValue) {
      this.parentElement.querySelector('[name=colorStops]').set('property.min', startValue)
    },
    property: 'startValue'
  },{
    type: 'number',
    label: 'endValue',
    name: 'endValue',
    observe: function(endValue) {
      this.parentElement.querySelector('[name=colorStops]').set('property.max', endValue)
    },
    property: 'endValue'
  },{
    type: 'number',
    label: 'step',
    name: 'step',
    property: 'step'
  },{
    type: 'number',
    label: 'stepTextSize',
    name: 'stepTextSize',
    property: 'stepTextSize'
  },{
    type: 'number',
    label: 'subStep',
    name: 'subStep',
    property: 'subStep'
  },{
    type: 'number',
    label: 'stepNeedleSize',
    name: 'stepNeedleSize',
    property: 'stepNeedleSize'
  },{
    type: 'color',
    label: 'textFillStyle',
    name: 'textFillStyle',
    property: 'textFillStyle'
  },{
    type: 'color',
    label: 'needleFillStyle',
    name: 'needleFillStyle',
    property: 'needleFillStyle'
  },{
    type: 'number',
    label: 'needleSize',
    name: 'needleSize',
    property: 'needleSize'
  },{
    type: 'color',
    label: 'stepFillStyle',
    name: 'stepFillStyle',
    property: 'stepFillStyle'
  },{
    type: 'gradient-color-stops',
    label: 'colorStops',
    name: 'colorStops',
    property: {
      min: 0,
      max: 100
    }
  }, {
    type: 'legend',
    label: '',
    name: 'toggleOption',
    property: {
      label: 'Toggle Option'
    }
  },{
    type: 'checkbox',
    label: 'showStartValue',
    name: 'showStartValue',
    property: 'showStartValue'
  },{
    type: 'checkbox',
    label: 'showEndValue',
    name: 'showEndValue',
    property: 'showEndValue'
  },{
    type: 'checkbox',
    label: 'showStepLine',
    name: 'showStepLine',
    property: 'showStepLine'
  },{
    type: 'checkbox',
    label: 'showStepText',
    name: 'showStepText',
    property: 'showStepText'
  },{
    type: 'checkbox',
    label: 'showSubStep',
    name: 'showSubStep',
    property: 'showSubStep'
  }]
}

export default class GaugeHorizon extends scene.Rect {

  _draw(context) {
    var {
      value = 0,
      startValue,
      endValue,
      step,
      subStep,
      colorStops,
      needleFillStyle,
      stepFillStyle,
      textFillStyle,
      needleSize,
      stepNeedleSize,
      stepTextSize,
      showStepText = true,
      showStartValue = true,
      showEndValue = true,
      showStepLine = true,
      showSubStep = true,
      width,
      height,
      top,
      left
    } = this.model

    const totalValue = endValue - startValue    // 게이지의 시작과 끝 값의 크기

    context.translate(left, top)   // top과 left의 좌표에 영향을 받지 않기 위해 transalate를 한다음 모든 탑과 레프트의 좌표를 0으로 줌

    ////  메인 막대 그리기  ////
    context.beginPath()

    context.rect(0, 0, width, height)

    this.drawFill(context)
    this.drawStroke(context)
    context.closePath()


    ////  스텝별 색 칠하기  ////
    if(colorStops){
      let beforeValue = 0
      colorStops.forEach(function(v, idx, arr){
        context.beginPath()

        let value = Math.max(Math.min(v.position - startValue, totalValue), 0)   // v.position 범위의 최소값은 0, 최대값은 totalValue가 되야함.
        let startStepPosition = width * beforeValue / totalValue
        let endStepPosition

        if(idx == arr.length - 1 || startStepPosition + (width * value / totalValue))   // 배열의 마지막 값이거나 중간 시작값 + 그려지는 값이 width 를 넘을 경우는 무조건 끝까지 채워주도록 한다
          endStepPosition = width - startStepPosition
        else
          endStepPosition = width * value / totalValue


        if(beforeValue > totalValue || beforeValue > value)  // 값이 게이지의 최대 값을 넘어가거나 이전 값 보다 현재값이 작으면 다시 그릴 필요 없음
          return false

        context.rect(startStepPosition, 0, endStepPosition, height)

        context.fillStyle = v.color
        context.fill()

        beforeValue = value
      })
    }


    ////  스텝 선 그리기  ////
    context.fillStyle = stepFillStyle
    if(showStepLine){
      let count = totalValue / step
      let stepSize = width * 0.06

      // Draw StartValue
      context.fillRect(0, height - stepSize, stepNeedleSize, stepSize)
      // Draw StepValue
      for(let num = 1; num < count; num++){
        let locate = width / count * num

        context.fillRect(locate, height - stepSize, stepNeedleSize, stepSize)
      }
      // Draw EndValue
     context.fillRect(width, height - stepSize, stepNeedleSize, stepSize)
    }


    ////  서브 스탭 그리기  ////
    if(showSubStep){
      let count = totalValue
      let subStepSize = width * 0.027
      // Draw StartValue
      context.fillRect(0, height - subStepSize, stepNeedleSize, subStepSize)

      // Draw StepValue
      for(let num = 1; num <= count; num++){
        if(num % step == 0 || num % subStep != 0){  // 메인 스탭과 서브 스탭은 그리지 않음
          continue;
        }
        let locate = width / count * num
        context.fillRect(locate, height - subStepSize, stepNeedleSize, subStepSize)
      }
    }


     ////  스텝 텍스트 그리기  ////
    let fontSize = width * stepTextSize / 150
    context.fillStyle = textFillStyle
    context.font =  fontSize + "px arial"
    context.textBaseline = "middle"
    context.textAlign = "center"
    if(showStartValue){  // Draw StartText
      context.fillText(startValue, 0, height + fontSize * 0.75)
    }

    if(showEndValue){   // Draw EndText
      context.fillText(endValue, width, height + fontSize * 0.75)
    }

    if(showStepText){  // Draw StepText
      let count = totalValue / step

      for(let num = 1; num < count; num++){
        let value = startValue + step * num
        let locate = width / count * num

        context.fillText(value, locate, height + fontSize * 0.75)
      }
    }


    ////  바늘 그리기  ////
    context.beginPath()
    let drawingValue = value + (this._anim_alpha || 0)
    drawingValue = Math.max(Math.min(drawingValue, endValue), startValue) // 그려지는 값은 startValue보다 작을 수 없고, endValue보다 클 수 없음.
    let position = (drawingValue - startValue) / totalValue * width

    needleSize *= 4
    context.moveTo(position, height + fontSize * 1.4)
    context.lineTo(position + needleSize / 2, height + needleSize + fontSize * 1.4)
    context.lineTo(position - needleSize / 2, height + needleSize + fontSize * 1.4)

    context.fillStyle = needleFillStyle
    context.fill()
    context.closePath()

    context.translate(-left, -top)
  }

  get controls() {}

  onchange(after, before) {
    if(!after.hasOwnProperty('value'))
      return

    var self = this
    var diff = after.value - before.value

    this._anim_alpha = -diff

    this.animate({
      step: function(delta) {
        self._anim_alpha = diff * (delta - 1)
        self.invalidate()
      },
      duration: 1000,
      delta: 'circ',
      options: {
        x: 1
      },
      ease: 'out'
    }).start()
  }

  _post_draw(context) {
    this.drawText(context);
  }

  get nature(){
    return NATURE
  }
}

scene.Component.register('gauge-horizon', GaugeHorizon)
