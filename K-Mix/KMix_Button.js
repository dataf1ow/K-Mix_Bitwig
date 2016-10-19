//KMix_Button.js

var Button = function (MIDI_NOTE, value)
{
	this.note = MIDI_NOTE;
	this.value = value || 0;
}

Button.prototype = new Button();
Button.prototype.constructor = Button;

Button.prototype.set_value = function(value){
	this.value = value;
	this.send_LED(); 
}

Button.prototype.on_release = function(){
	this.send_LED();
}

Button.prototype.send_LED = function (){
	val = (this.value)
	sendMidi(144,this.note,val)
}

Button.prototype.get_value = function(){
	return this.value;
}



var Slider = function (MIDI_CC, index, value)
{
	this.CC = MIDI_CC;
	this.index = index;
	this.value = value || 0;
}

Slider.prototype = new Button();
Slider.prototype.constructor = Slider;

Slider.prototype.getIndex = function() 
	{ 
		return this.index; 
	}

Slider.prototype.send_LED = function(){
	val = this.value;
	sendMidi(176, this.CC, val)
}

var Rotary = function (MIDI_CC,index,value){
	this.CC = MIDI_CC;
	this.index = index;
	this.value = value || 0;
}

Rotary.prototype = new Slider();
Rotary.prototype.constructor = Rotary;