function drawStepLine(context, ang, rx, needleSize) {
  context.rotate(ang);
  context.translate(0, - rx)

  context.fillRect(0, -rx * 0.14, needleSize, rx * 0.175)
  context.translate(0, rx)
  context.rotate(-ang)
}

function drawSubStepLine(context, ang, rx, needleSize) {
  context.rotate(ang);
  context.translate(0, - rx)

  context.fillRect(0, -rx * 0.04, needleSize, rx * 0.075)
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

export default class GaugeCircle extends scene.Donut {

  _draw(context) {
    var {
      value = 0,
      hidden = false,
      lineWidth = 20,
      startValue,
      endValue,
      step,
      subStep,
      angle = 270,
      fontColor = 'black',
      showStepText = true,
      showStartText = true,
      showEndText = true,
      showStepLine = true,
      showSubStep = true,
      fillStep,   // 스텝별 각각 다른 색
      fillStyle,
      textFillStyle = 'black',
      needleFillStyle = 'black',
      needleSize = 2,
      stepFillStyle,
      cx, cy, rx, ry, ratio
    } = this.model

    const rxRatio = rx / 100 * ratio  // 원 안에 지워지는 비율을 계산한 rx - ratio의 비율에 따라 크기가 변함
    const ryRatio = ry / 100 * ratio  // 원 안에 지워지는 비율을 계산한 ry - ratio의 비율에 따라 크기가 변함
    const startAngle = (1.5 - angle / 180 * 0.5) * Math.PI  //  맨 위쪽을 중심으로 앵글의 범위에 따라 왼쪽으로 넓어짐
    const endAngle   = (1.5 + angle / 180 * 0.5) * Math.PI  //  맨 위쪽을 중심으로 앵글의 범위에 따라 오른쪽으로 넓어짐
    const circleSize = angle / 180     // 원의 총 길이. - PI * 2가 원이므로 (360도 = 2, 180도 = 1)


    context.translate(cx, cy)


    ////  메인 게이지 원 그리  ////
    context.beginPath()

    context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, startAngle, endAngle)
    context.ellipse(0, 0, Math.abs(rxRatio), Math.abs(ryRatio), 0, endAngle, startAngle, true)  // 반대로 그리며 원을 지움.
    
    this.drawFill(context)
    this.drawStroke(context)
    
    context.closePath()


    ////  스텝별 색 칠하기  ////
    if(fillStep){ 
      let beforeValue = startValue
      fillStep.forEach(v =>{
        context.beginPath()
        let startStepAngle = startAngle + Math.PI * (circleSize * beforeValue / (endValue - startValue))
        let endStepAngle = startAngle + Math.PI * (circleSize * v.value / (endValue - startValue))

        context.moveTo(0, 0)
        context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, startStepAngle, endStepAngle)
        context.lineTo(0, 0)

        context.ellipse(0, 0, Math.abs(rxRatio), Math.abs(ryRatio), 0, endStepAngle, startStepAngle, true)
   
        context.fillStyle = v.fillStyle
        context.fill()

        beforeValue = v.value
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
    needleLocation = Math.max(Math.min(needleLocation, Math.PI * circleSize), 0)  // 0 보다 크고 PI * 1.5 보다 작게 만듦 

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
      drawStepLine(context, Math.PI * 0.7, rx * 0.8, needleSize)

      // Draw StepValue
      for(let num = 1; num < count; num++){
        let ang = Math.PI * (1.5 / count * num) + 1.25 * Math.PI

        drawStepLine(context, ang, rx * 0.8, needleSize)
      }
      // Draw EndValue
      drawStepLine(context, Math.PI * 2.75, rx * 0.8, needleSize)
    }


    ////  서브 스탭 그리기  ////
    if(showSubStep){
      let count = endValue - startValue

      // Draw StartValue     
      drawSubStepLine(context, Math.PI * 1.25, rx * 0.8, needleSize)
      
      // Draw StepValue
      for(let num = 1; num < count; num++){
        if(num % step == 0 || num % subStep != 0){  // 메인 스탭과 서브 스탭은 그리지 않음
          continue;
        }

        let ang = Math.PI * (1.5 / count * num) + 1.25 * Math.PI

        drawSubStepLine(context, ang, rx * 0.8, needleSize)
      }
      // Draw EndValue
      drawSubStepLine(context, Math.PI * 2.75, rx * 0.8, needleSize)
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

  contains(x, y) {   // 컨테인즈는 Ellipse로 정의함
    var { cx, cy, rx, ry } = this.model;

    var normx = (x - cx) / (rx * 2 - 0.5);
    var normy = (y - cy) / (ry * 2 - 0.5);

    return (normx * normx + normy * normy) < 0.25;
  }
}

scene.Component.register('gauge-circle', GaugeCircle)