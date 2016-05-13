(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}function drawStepLine(context,ang,rx,stepNeedleSize){context.rotate(ang);context.translate(0,-rx);context.fillRect(0,-rx*.14,stepNeedleSize,rx*.175);context.translate(0,rx);context.rotate(-ang)}function drawSubStepLine(context,ang,rx,stepNeedleSize){context.rotate(ang);context.translate(0,-rx);context.fillRect(0,-rx*.04,stepNeedleSize,rx*.075);context.translate(0,rx);context.rotate(-ang)}function drawStepText(context,text,ang,rx){context.rotate(ang);context.translate(0,-rx*.83);context.rotate(-ang);context.fillText(text,0,0);context.rotate(ang);context.translate(0,rx*.83);context.rotate(-ang)}function drawNeedle(context,rx,ang){context.rotate(ang);context.beginPath();context.moveTo(rx*.035,0);context.lineTo(0,rx*.8);context.lineTo(-rx*.035,0);context.lineTo(-rx*.015,-rx*.2);context.lineTo(rx*.015,-rx*.2);context.rotate(-ang)}var GaugeCircle=function(_scene$Donut){_inherits(GaugeCircle,_scene$Donut);function GaugeCircle(){_classCallCheck(this,GaugeCircle);return _possibleConstructorReturn(this,Object.getPrototypeOf(GaugeCircle).apply(this,arguments))}_createClass(GaugeCircle,[{key:"_draw",value:function _draw(context){var _this2=this;var _model=this.model;var _model$value=_model.value;var value=_model$value===undefined?0:_model$value;var _model$hidden=_model.hidden;var hidden=_model$hidden===undefined?false:_model$hidden;var _model$lineWidth=_model.lineWidth;var lineWidth=_model$lineWidth===undefined?20:_model$lineWidth;var startValue=_model.startValue;var endValue=_model.endValue;var step=_model.step;var subStep=_model.subStep;var _model$startAngle=_model.startAngle;var startAngle=_model$startAngle===undefined?0:_model$startAngle;var _model$endAngle=_model.endAngle;var endAngle=_model$endAngle===undefined?180:_model$endAngle;var _model$fontColor=_model.fontColor;var fontColor=_model$fontColor===undefined?"black":_model$fontColor;var _model$showStepText=_model.showStepText;var showStepText=_model$showStepText===undefined?true:_model$showStepText;var _model$showStartValue=_model.showStartValue;var showStartValue=_model$showStartValue===undefined?true:_model$showStartValue;var _model$showEndValue=_model.showEndValue;var showEndValue=_model$showEndValue===undefined?true:_model$showEndValue;var _model$showStepLine=_model.showStepLine;var showStepLine=_model$showStepLine===undefined?true:_model$showStepLine;var _model$showSubStep=_model.showSubStep;var showSubStep=_model$showSubStep===undefined?true:_model$showSubStep;var colorStops=_model.colorStops;var fillStyle=_model.fillStyle;var _model$textFillStyle=_model.textFillStyle;var textFillStyle=_model$textFillStyle===undefined?"black":_model$textFillStyle;var _model$needleFillStyl=_model.needleFillStyle;var needleFillStyle=_model$needleFillStyl===undefined?"black":_model$needleFillStyl;var _model$innerCircleFil=_model.innerCircleFillStyle;var innerCircleFillStyle=_model$innerCircleFil===undefined?"gray":_model$innerCircleFil;var _model$stepNeedleSize=_model.stepNeedleSize;var stepNeedleSize=_model$stepNeedleSize===undefined?2:_model$stepNeedleSize;var stepFillStyle=_model.stepFillStyle;var subTextSize=_model.subTextSize;var cx=_model.cx;var cy=_model.cy;var rx=_model.rx;var ry=_model.ry;var ratio=_model.ratio;if(!hidden){(function(){var RADIAN=.0174533/Math.PI;var rxRatio=rx/100*ratio;var ryRatio=ry/100*ratio;var circleSize=(endAngle-startAngle)/180;var totalValue=endValue-startValue;startAngle=startAngle*RADIAN-.5;endAngle=endAngle*RADIAN-.5;context.translate(cx,cy);context.beginPath();context.ellipse(0,0,Math.abs(rx),Math.abs(ry),0,startAngle*Math.PI,endAngle*Math.PI);_this2.drawStroke(context);context.ellipse(0,0,Math.abs(rxRatio),Math.abs(ryRatio),0,endAngle*Math.PI,startAngle*Math.PI,true);_this2.drawFill(context);context.closePath();if(colorStops){(function(){var beforeValue=0;colorStops.forEach(function(v,idx,arr){context.beginPath();var value=Math.max(Math.min(v.position-startValue,totalValue),0);var startStepAngle=Math.PI*(startAngle+circleSize*beforeValue/totalValue);var endStepAngle=void 0;if(idx===arr.length-1)endStepAngle=Math.PI*(startAngle+circleSize);else endStepAngle=Math.PI*(startAngle+circleSize*value/totalValue);if(beforeValue>totalValue||beforeValue>value)return false;context.moveTo(0,0);context.ellipse(0,0,Math.abs(rx),Math.abs(ry),0,startStepAngle,endStepAngle);context.lineTo(0,0);context.ellipse(0,0,Math.abs(rxRatio),Math.abs(ryRatio),0,endStepAngle,startStepAngle,true);context.fillStyle=v.color;context.fill();beforeValue=value})})()}context.scale(1,ry/rx);context.beginPath();var drawingValue=value+(_this2._anim_alpha||0);drawingValue=Math.max(Math.min(drawingValue,endValue),startValue);var ang=Math.PI*(circleSize*(drawingValue-startValue)/totalValue+startAngle-.5);drawNeedle(context,rx,ang);context.fillStyle=needleFillStyle;context.fill();context.closePath();context.beginPath();context.ellipse(0,0,Math.abs(rx)/15,Math.abs(rx)/15,0,0,2*Math.PI);context.fillStyle=innerCircleFillStyle;context.fill();context.fillStyle=stepFillStyle;if(showStepLine){var count=totalValue/step;drawStepLine(context,Math.PI*(startAngle+.5),rx*.8,stepNeedleSize);for(var num=1;num<count;num++){var _ang=Math.PI*(circleSize/count*num+startAngle+.5);drawStepLine(context,_ang,rx*.8,stepNeedleSize)}drawStepLine(context,Math.PI*(endAngle+.5),rx*.8,stepNeedleSize)}if(showSubStep){var _count=totalValue;for(var _num=1;_num<=_count;_num++){if(_num%step==0||_num%subStep!=0){continue}var _ang2=Math.PI*(circleSize/_count*_num+startAngle+.5);drawSubStepLine(context,_ang2,rx*.8,stepNeedleSize)}}context.fillStyle=textFillStyle;context.font=rx*subTextSize/50+"px arial";context.textBaseline="middle";context.textAlign="center";if(showStartValue){drawStepText(context,startValue,Math.PI*(startAngle+.5),rx*.8)}if(showEndValue){drawStepText(context,endValue,Math.PI*(endAngle+.5),rx*.8)}if(showStepText){var _count2=totalValue/step;for(var _num2=1;_num2<_count2;_num2++){var _value=startValue+step*_num2;var _ang3=Math.PI*(circleSize/_count2*_num2+startAngle+.5);drawStepText(context,_value,_ang3,rx*.8)}}context.scale(1,rx/ry);context.translate(-cx,-cy)})()}}},{key:"contains",value:function contains(x,y){var _model2=this.model;var cx=_model2.cx;var cy=_model2.cy;var rx=_model2.rx;var ry=_model2.ry;var normx=(x-cx)/(rx*2-.5);var normy=(y-cy)/(ry*2-.5);return normx*normx+normy*normy<.25}},{key:"onchange",value:function onchange(after,before){if(!after.hasOwnProperty("value"))return;var self=this;var diff=after.value-before.value;this._anim_alpha=-diff;this.animate({step:function step(delta){self._anim_alpha=diff*(delta-1);self.invalidate()},duration:1e3,delta:"bounce",ease:"out"}).start()}}]);return GaugeCircle}(scene.Donut);exports.default=GaugeCircle;scene.Component.register("gauge-circle",GaugeCircle)},{}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var GaugeHorizon=function(_scene$Rect){_inherits(GaugeHorizon,_scene$Rect);function GaugeHorizon(){_classCallCheck(this,GaugeHorizon);return _possibleConstructorReturn(this,Object.getPrototypeOf(GaugeHorizon).apply(this,arguments))}_createClass(GaugeHorizon,[{key:"_draw",value:function _draw(context){var _this2=this;var _model=this.model;var _model$value=_model.value;var value=_model$value===undefined?0:_model$value;var _model$hidden=_model.hidden;var hidden=_model$hidden===undefined?false:_model$hidden;var _model$lineWidth=_model.lineWidth;var lineWidth=_model$lineWidth===undefined?5:_model$lineWidth;var startValue=_model.startValue;var endValue=_model.endValue;var step=_model.step;var subStep=_model.subStep;var colorStops=_model.colorStops;var needleFillStyle=_model.needleFillStyle;var stepFillStyle=_model.stepFillStyle;var textFillStyle=_model.textFillStyle;var needleSize=_model.needleSize;var stepNeedleSize=_model.stepNeedleSize;var subTextSize=_model.subTextSize;var _model$showStepText=_model.showStepText;var showStepText=_model$showStepText===undefined?true:_model$showStepText;var _model$showStartValue=_model.showStartValue;var showStartValue=_model$showStartValue===undefined?true:_model$showStartValue;var _model$showEndValue=_model.showEndValue;var showEndValue=_model$showEndValue===undefined?true:_model$showEndValue;var _model$showStepLine=_model.showStepLine;var showStepLine=_model$showStepLine===undefined?true:_model$showStepLine;var _model$showSubStep=_model.showSubStep;var showSubStep=_model$showSubStep===undefined?true:_model$showSubStep;var width=_model.width;var height=_model.height;var top=_model.top;var left=_model.left;if(!hidden){(function(){var totalValue=endValue-startValue;context.translate(left,top);context.beginPath();context.rect(0,0,width,height);_this2.drawFill(context);_this2.drawStroke(context);context.closePath();if(colorStops){(function(){var beforeValue=0;colorStops.forEach(function(v,idx,arr){context.beginPath();var value=Math.max(Math.min(v.position-startValue,totalValue),0);var startStepPosition=width*beforeValue/totalValue;var endStepPosition=void 0;if(idx===arr.length-1)endStepPosition=width-startStepPosition;else endStepPosition=width*value/totalValue;if(beforeValue>totalValue||beforeValue>value)return false;context.rect(startStepPosition,0,endStepPosition,height);context.fillStyle=v.color;context.fill();beforeValue=value})})()}context.fillStyle=stepFillStyle;if(showStepLine){var count=totalValue/step;var stepSize=width*.06;context.fillRect(0,height-stepSize,stepNeedleSize,stepSize);for(var num=1;num<count;num++){var locate=width/count*num;context.fillRect(locate,height-stepSize,stepNeedleSize,stepSize)}context.fillRect(width,height-stepSize,stepNeedleSize,stepSize)}if(showSubStep){var _count=totalValue;var subStepSize=width*.027;context.fillRect(0,height-subStepSize,stepNeedleSize,subStepSize);for(var _num=1;_num<=_count;_num++){if(_num%step==0||_num%subStep!=0){continue}var _locate=width/_count*_num;context.fillRect(_locate,height-subStepSize,stepNeedleSize,subStepSize)}}var fontSize=width*subTextSize/150;context.fillStyle=textFillStyle;context.font=fontSize+"px arial";context.textBaseline="middle";context.textAlign="center";if(showStartValue){context.fillText(startValue,0,height+fontSize*.75)}if(showEndValue){context.fillText(endValue,width,height+fontSize*.75)}if(showStepText){var _count2=totalValue/step;for(var _num2=1;_num2<_count2;_num2++){var _value=startValue+step*_num2;var _locate2=width/_count2*_num2;context.fillText(_value,_locate2,height+fontSize*.75)}}context.beginPath();var drawingValue=value+(_this2._anim_alpha||0);drawingValue=Math.max(Math.min(drawingValue,endValue),startValue);var position=(drawingValue-startValue)/totalValue*width;needleSize*=4;context.moveTo(position,height+fontSize*1.4);context.lineTo(position+needleSize/2,height+needleSize+fontSize*1.4);context.lineTo(position-needleSize/2,height+needleSize+fontSize*1.4);context.fillStyle=needleFillStyle;context.fill();context.closePath();context.translate(-left,-top)})()}}},{key:"onchange",value:function onchange(after,before){if(!after.hasOwnProperty("value"))return;var self=this;var diff=after.value-before.value;this._anim_alpha=-diff;this.animate({step:function step(delta){self._anim_alpha=diff*(delta-1);self.invalidate()},duration:1e3,delta:"circ",options:{x:1},ease:"out"}).start()}},{key:"controls",get:function get(){}}]);return GaugeHorizon}(scene.Rect);exports.default=GaugeHorizon;scene.Component.register("gauge-horizon",GaugeHorizon)},{}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var GaugeVertical=function(_scene$Rect){_inherits(GaugeVertical,_scene$Rect);function GaugeVertical(){_classCallCheck(this,GaugeVertical);return _possibleConstructorReturn(this,Object.getPrototypeOf(GaugeVertical).apply(this,arguments))}_createClass(GaugeVertical,[{key:"_draw",value:function _draw(context){var _this2=this;var _model=this.model;var _model$value=_model.value;var value=_model$value===undefined?0:_model$value;var _model$hidden=_model.hidden;var hidden=_model$hidden===undefined?false:_model$hidden;var _model$lineWidth=_model.lineWidth;var lineWidth=_model$lineWidth===undefined?5:_model$lineWidth;var startValue=_model.startValue;var endValue=_model.endValue;var step=_model.step;var subStep=_model.subStep;var colorStops=_model.colorStops;var needleFillStyle=_model.needleFillStyle;var stepFillStyle=_model.stepFillStyle;var textFillStyle=_model.textFillStyle;var needleSize=_model.needleSize;var stepNeedleSize=_model.stepNeedleSize;var subTextSize=_model.subTextSize;var _model$showStepText=_model.showStepText;var showStepText=_model$showStepText===undefined?true:_model$showStepText;var _model$showStartValue=_model.showStartValue;var showStartValue=_model$showStartValue===undefined?true:_model$showStartValue;var _model$showEndValue=_model.showEndValue;var showEndValue=_model$showEndValue===undefined?true:_model$showEndValue;var _model$showStepLine=_model.showStepLine;var showStepLine=_model$showStepLine===undefined?true:_model$showStepLine;var _model$showSubStep=_model.showSubStep;var showSubStep=_model$showSubStep===undefined?true:_model$showSubStep;var width=_model.width;var height=_model.height;var top=_model.top;var left=_model.left;if(!hidden){(function(){var totalValue=endValue-startValue;context.translate(left,top);context.beginPath();context.rect(0,0,width,height);_this2.drawFill(context);_this2.drawStroke(context);context.closePath();if(colorStops){(function(){var beforeValue=0;colorStops.forEach(function(v,idx,arr){context.beginPath();var value=Math.max(Math.min(v.position-startValue,totalValue),0);var startStepPosition=height*beforeValue/totalValue;var endStepPosition=void 0;if(idx===arr.length-1)endStepPosition=height-startStepPosition;else endStepPosition=height-height*value/totalValue;if(beforeValue>totalValue||beforeValue>value)return false;context.rect(0,height-startStepPosition,width,-endStepPosition);context.fillStyle=v.color;context.fill();beforeValue=value})})()}context.beginPath();var drawingValue=value+(_this2._anim_alpha||0);drawingValue=Math.max(Math.min(drawingValue,endValue),startValue);var position=height-(drawingValue-startValue)/totalValue*height;needleSize*=4;context.moveTo(width*1.05,position);context.lineTo(width*1.05+needleSize,position+needleSize/2);context.lineTo(width*1.05+needleSize,position-needleSize/2);context.fillStyle=needleFillStyle;context.fill();context.closePath();context.fillStyle=stepFillStyle;if(showStepLine){var count=totalValue/step;context.fillRect(0,height,height*.06,stepNeedleSize);for(var num=1;num<count;num++){var locate=height/count*num;context.fillRect(0,locate,height*.06,stepNeedleSize)}context.fillRect(0,0,height*.06,stepNeedleSize)}if(showSubStep){var _count=totalValue;context.fillRect(0,0,height*.027,stepNeedleSize);for(var _num=1;_num<=_count;_num++){if(_num%step==0||_num%subStep!=0){continue}var _locate=height/_count*_num;context.fillRect(0,_locate,height*.027,stepNeedleSize)}}var fontSize=height*subTextSize/150;context.fillStyle=textFillStyle;context.font=fontSize+"px arial";context.textBaseline="middle";context.textAlign="center";if(showStartValue){context.fillText(startValue,-fontSize,height)}if(showEndValue){context.fillText(endValue,-fontSize,0)}if(showStepText){var _count2=totalValue/step;for(var _num2=1;_num2<_count2;_num2++){var _value=startValue+step*_num2;var _locate2=height-height/_count2*_num2;context.fillText(_value,-fontSize,_locate2)}}context.translate(-left,-top)})()}}},{key:"onchange",value:function onchange(after,before){if(!after.hasOwnProperty("value"))return;var self=this;var diff=after.value-before.value;this._anim_alpha=-diff;this.animate({step:function step(delta){self._anim_alpha=diff*(delta-1);self.invalidate()},duration:1e3,delta:"circ",options:{x:1},ease:"out"}).start()}},{key:"controls",get:function get(){}}]);return GaugeVertical}(scene.Rect);exports.default=GaugeVertical;scene.Component.register("gauge-vertical",GaugeVertical)},{}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _gaugeCircle=require("./gauge-circle");Object.defineProperty(exports,"GaugeCircle",{enumerable:true,get:function get(){return _interopRequireDefault(_gaugeCircle).default}});var _gaugeVertical=require("./gauge-vertical");Object.defineProperty(exports,"GaugeVertical",{enumerable:true,get:function get(){return _interopRequireDefault(_gaugeVertical).default}});var _gaugeHorizon=require("./gauge-horizon");Object.defineProperty(exports,"GaugeHorizon",{enumerable:true,get:function get(){return _interopRequireDefault(_gaugeHorizon).default}});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}},{"./gauge-circle":1,"./gauge-horizon":2,"./gauge-vertical":3}]},{},[4]);