function drawStepLine(context, ang, rx, needleSize) {
  context.rotate(ang);
  context.translate(0, - rx)
  
  context.fillRect(0, -rx * 0.135, needleSize, rx * 0.175)
  context.translate(0, rx)
  context.rotate(-ang)
}

function drawStepText(context, text, ang, rx) {
  context.rotate(ang);
  context.translate(0, - rx * 0.83)
  context.rotate(-ang)

  context.fillText(text, 0, 0)
  context.rotate(ang)
  context.translate(0, rx * 0.83)
  context.rotate(-ang)
}

export default class GaugeHalfCircle extends scene.Ellipse {

  _draw(context) {
    var {
      value = 0,
      hidden = false,
      lineWidth = 20,
      startValue,
      endValue,
      step,
      fontColor = 'black',
      showStepText = true,
      showStartText = true,
      showEndText = true,
      showStepLine = true,
      fillStep,
      fillStyle,
      textFillStyle,
      needleFillStyle,
      needleSize = 2,
      stepFillStyle,
      cx, cy, rx, ry
    } = this.model

    context.translate(cx, cy)


    ////  메인 게이지 원 그리  ////
    context.beginPath()

    context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, Math.PI * 0.75, Math.PI * 2.25)
    context.ellipse(0, 0, Math.abs(rx / 1.3), Math.abs(ry / 1.3), 0, Math.PI * 2.25, Math.PI * 0.75, true)
    
    
    this.drawFill(context)
    this.drawStroke(context)
    

    context.closePath()
    

    ////  스텝별 색 칠하기  ////
    if(fillStep){ 
      fillStep.forEach(v =>{
        context.beginPath()
        let startAngle = Math.PI * (0.75 + (1.5 * v.start / (endValue - startValue)))
        let endAngle = Math.PI * (0.75 + (1.5 * v.end / (endValue - startValue)))

        context.moveTo(0, 0)
        context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, startAngle, endAngle)
        context.lineTo(0, 0)

        context.ellipse(0, 0, Math.abs(rx / 1.3), Math.abs(ry / 1.3), 0, endAngle, startAngle, true)
   
        context.fillStyle = v.fillStyle
        context.fill()
      })
    }


    ////  작은 원 그리기  ////
    context.beginPath()
    context.ellipse(0, 0, Math.abs(rx) / 30, Math.abs(ry) / 30, 0, 0, 2 * Math.PI)
    context.fillStyle = needleFillStyle
    context.fill()


    context.scale(1, 1)


    ////  바늘 그리기  ////
    var needleLocation = (value - startValue) / (endValue - startValue) * Math.PI * 1.5
    needleLocation = Math.max(Math.min(needleLocation, Math.PI * 1.5), 0)  // 0 보다 크고 PI * 1.5 보다 작게 만듦 

    context.lineWidth = rx * 0.02
    
    context.moveTo(0, 0)
    context.lineTo(rx * 0.8 * Math.cos(Math.PI * 0.75 + needleLocation) , ry * 0.8 * Math.sin(Math.PI * 0.75 + needleLocation))
    
    context.strokeStyle = needleFillStyle
    context.stroke()
    context.closePath()

    context.scale(1, ry / rx)


    ////  스텝 선 그리기  ////
    context.fillStyle = stepFillStyle
    if(showStepLine){
      let count = (endValue - startValue) / step
      // Draw StartValue 
      drawStepLine(context, Math.PI * 1.25, rx * 0.8, needleSize)

      // Draw StepValue
      for(let num = 1; num < count; num++){
        let ang = Math.PI * (1.5 / count * num) + 1.25 * Math.PI

        drawStepLine(context, ang, rx * 0.8, needleSize)
      }
      // Draw EndValue
      drawStepLine(context, Math.PI * 2.75, rx * 0.8, needleSize)
    }


    ////  스텝 텍스트 그리기  ////
    context.fillStyle = textFillStyle
    context.font = rx * 0.1 + "px arial"
    context.textBaseline = "middle"
    context.textAlign = "center"
    if(showStartText){  // Draw StartText
      drawStepText(context, startValue, Math.PI * 1.25, rx * 0.8)
    }

    if(showEndText){   // Draw EndText
      drawStepText(context, endValue, Math.PI * 2.745, rx * 0.8)
    }

    if(showStepText){  // Draw StepText
      let count = (endValue - startValue) / step

      for(let num = 1; num < count; num++){
        let value = startValue + step * num
        let ang = Math.PI * (1.5 / count * num) + 1.25 * Math.PI

        drawStepText(context, value, ang, rx * 0.8)
      }
    }

    context.translate(-cx, -cy)
  }
}

scene.Component.register('gauge-half-circle', GaugeHalfCircle)