/*!
 * audioServo JavaScript Library v0.3
 * You can control the servo moter in this library.
 * Support:
 *  - GlueMotor(http://www.gluemotor.com/)
 * 
 * Copyright 2014 wakasa masao
 * Released under the MIT license
 *
 * Date: 2014-05-18
 *
 * How to use:
 *
 * Servo1 Move to 30%
 * code: audioServo.moveServo1(30);
 *
 * Servo2 Move to 80%
 * code: audioServo.moveServo2(80);
 */

var audioServo = {
    _set:{
        context:null
    },
    moveServo1:function(par){
        this.setServo(par,-1);
    },
    moveServo2:function(par){
        this.setServo(par,1);
    },
    setServo:function(par,pan){
        if(!this._set.context){
            this._set.context=new (window.webkitAudioContext||window.AudioContext||Audio);
            this._set.context.samplingRate = 50000;
        }
        var context=this._set.context;
        if(par<0) par=0;
        if(par>100) par=100;

        var p=context.createPanner();
        p.panningModel = 0;
        p.setPosition(pan,0,0);
        var ti = (0.7+1.6*par/100)*50;
        var buffer = context.createBuffer(1, ti, 50000);
        var audioData = buffer.getChannelData(0);
        for(var i = 0; i < audioData.length; i++){
            audioData[i] = 1;
        }
        p.connect(context.destination);
        var node = context.createBufferSource();
        node.buffer = buffer;
        node.panner=p;
        node.connect(p);
        node.start(0);
    }
}