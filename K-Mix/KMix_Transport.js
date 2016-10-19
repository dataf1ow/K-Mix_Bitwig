//KMix_Transport.js

KMix_Transport = function()
{
	var self = this;

	self.play_button = new Button(PLAY_BUTTON);
	self.stop_button = new Button(STOP_BUTTON);
	self.rec_button = new Button(RECORD_BUTTON);
	self.rewind_button = new Button(REWIND_BUTTON);
	
	this.transport = host.createTransport();
	this.current_position = 0;
	this.rewind_length = 1.0;
	this.position = this.transport.getPosition();
	this.position.addRawValueObserver(function(value)
	{
		this.current_position = Math.round(value);
	})



	this.transport.addIsPlayingObserver(function(value)
	{
		self.play_button.set_value(value ? 1 : 0);
		self.stop_button.set_value(1 - value ? 1 : 0 );
	})

	this.transport.addIsRecordingObserver(function(value)
	{
      	self.rec_button.set_value(value ? 1 : 0);
	})
	
}

KMix_Transport.prototype.constructor = KMix_Transport;

KMix_Transport.prototype.onMIDI = function (status,data1,data2)
{
	
	if(status == 144 && data2 > 0){
		switch(data1){
			case this.play_button.note : this.transport.play(); break;
			case this.stop_button.note : this.transport.stop(); break;
			case this.rec_button.note : this.transport.record(); break;
			case this.rewind_button.note : 
				this.position.setRaw(this.current_position - this.rewind_length)
				this.transport.rewind(); break;
		}
	}
	
	if(status == 128 && data2 == 0){
		switch(data1){
			case this.play_button.note : this.play_button.on_release();
			case this.stop_button.note : this.stop_button.on_release();
			case this.rec_button.note : this.rec_button.on_release();
		}
		
	}
}
