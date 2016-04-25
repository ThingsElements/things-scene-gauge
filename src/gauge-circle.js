function drawStepLine(context, ang, rx, needleSize) {
  context.rotate(ang)
  context.translate(0, - rx)

  context.fillRect(0, -rx * 0.14, needleSize, rx * 0.175)
  context.translate(0, rx)
  context.rotate(-ang)
}

function drawSubStepLine(context, ang, rx, needleSize) {
  context.rotate(ang)
  context.translate(0, - rx)

  context.fillRect(0, -rx * 0.04, needleSize, rx * 0.075)
  context.translate(0, rx)
  context.rotate(-ang)
}

function drawStepText(context, text, ang, rx) {
  context.rotate(ang)
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
      innerCircleFillStyle = 'gray',
      needleSize = 2,
      stepFillStyle,
      subTextSize,
      cx, cy, rx, ry, ratio
    } = this.model

    const rxRatio = rx / 100 * ratio  // 원 안에 지워지는 비율을 계산한 rx - ratio의 비율에 따라 크기가 변함
    const ryRatio = ry / 100 * ratio  // 원 안에 지워지는 비율을 계산한 ry - ratio의 비율에 따라 크기가 변함
    const startAngle = (1.5 - angle / 360)  //  맨 위쪽을 중심으로 앵글의 범위에 따라 왼쪽으로 넓어짐
    const endAngle   = (1.5 + angle / 360)  //  맨 위쪽을 중심으로 앵글의 범위에 따라 오른쪽으로 넓어짐
    const circleSize = angle / 180     // 원의 총 길이. - PI * 2가 원이므로 (360도 = 2, 180도 = 1)


    context.translate(cx, cy)


    ////  메인 게이지 원 그리  ////
    context.beginPath()

    context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, startAngle * Math.PI, endAngle * Math.PI)
    context.ellipse(0, 0, Math.abs(rxRatio), Math.abs(ryRatio), 0, endAngle * Math.PI, startAngle * Math.PI, true)  // 반대로 그리며 원을 지움.
    
    this.drawFill(context)
    this.drawStroke(context)
    
    context.closePath()


    ////  스텝별 색 칠하기  ////
    if(fillStep){ 
      let beforeValue = startValue
      fillStep.forEach(v =>{
        context.beginPath()
        let startStepAngle = Math.PI * (startAngle + circleSize * beforeValue / (endValue - startValue))
        let endStepAngle = Math.PI * (startAngle + circleSize * v.value / (endValue - startValue))

        context.moveTo(0, 0)
        context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, startStepAngle, endStepAngle)
        context.lineTo(0, 0)

        context.ellipse(0, 0, Math.abs(rxRatio), Math.abs(ryRatio), 0, endStepAngle, startStepAngle, true)
   
        context.fillStyle = v.fillStyle
        context.fill()

        beforeValue = v.value
      })
    }

    context.scale(1, ry / rx)
    

    ////  바늘 그리기  ////
    value = Math.max(Math.min(value, endValue), startValue)   // 값이 startValue보다 작을 수 없고, endValue보다 클 수 없음.
    let ang = Math.PI * (circleSize * (value + startValue) / (endValue - startValue) + startAngle - 0.5)

    context.rotate(ang)

    context.beginPath()

    context.moveTo(rx * 0.02, 0)

    context.lineTo(0, rx * 0.8)

    context.lineTo(-rx * 0.02, 0)
    context.lineTo(-rx * 0.01, -rx * 0.13)
    context.lineTo(rx * 0.01, -rx * 0.13)

    context.rotate(-ang)

    context.fillStyle = needleFillStyle
    context.fill()
    context.closePath()


    ////  작은 원 그리기  ////
    context.beginPath()
    context.ellipse(0, 0, Math.abs(rx) / 20, Math.abs(rx) / 20, 0, 0, 2 * Math.PI)
    context.fillStyle = innerCircleFillStyle
    context.fill()


    ////  스텝 선 그리기  ////
    context.fillStyle = stepFillStyle
    if(showStepLine){
      let count = (endValue - startValue) / step

      // Draw StartValue 
      drawStepLine(context, Math.PI * (startAngle + 0.5), rx * 0.8, needleSize) // 원을 그릴때 PI는 45도 부터 그리지만 angle은 0도부터 틀어서 + 0.5도를 곱해줘야함
      // Draw StepValue
      for(let num = 1; num < count; num++){
        let ang = Math.PI * (circleSize / count * num + startAngle + 0.5)

        drawStepLine(context, ang, rx * 0.8, needleSize)
      }
      // Draw EndValue
      drawStepLine(context, Math.PI * (endAngle + 0.5), rx * 0.8, needleSize)
    }


    ////  서브 스탭 그리기  ////
    if(showSubStep){
      let count = endValue - startValue

      // Draw StartValue
      drawSubStepLine(context, Math.PI * (startAngle + 0.5), rx * 0.8, needleSize)
      
      // Draw StepValue
      for(let num = 1; num < count; num++){
        if(num % step == 0 || num % subStep != 0){  // 메인 스탭과 서브 스탭은 그리지 않음
          continue;
        }
        let ang = Math.PI * (circleSize / count * num + startAngle + 0.5)

        drawSubStepLine(context, ang, rx * 0.8, needleSize)
      }
      // Draw EndValue
      drawSubStepLine(context, Math.PI * (endAngle + 0.5), rx * 0.8, needleSize)
    }


    ////  스텝 텍스트 그리기  ////
    context.fillStyle = textFillStyle
    context.font = rx * subTextSize / 50 + "px arial"
    context.textBaseline = "middle"
    context.textAlign = "center"
    if(showStartText){  // Draw StartText
      drawStepText(context, startValue, Math.PI * (startAngle + 0.5), rx * 0.8)
    }

    if(showEndText){   // Draw EndText
      drawStepText(context, endValue, Math.PI * (endAngle + 0.5), rx * 0.8)
    }

    if(showStepText){  // Draw StepText
      let count = (endValue - startValue) / step

      for(let num = 1; num < count; num++){
        let value = startValue + step * num
        let ang = Math.PI * (circleSize / count * num + startAngle + 0.5)

        drawStepText(context, value, ang, rx * 0.8)
      }
    }

    context.scale(1, 1)
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