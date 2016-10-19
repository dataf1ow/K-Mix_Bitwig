//KMix_Mixer

KMix_Mixer = function()
{
	var self = this;
	self.sliders = [];
	self.rotaries = [];
	self.track_select_buttons = [];
	self.VU_mode_button = new Button(VU_BUTTON);
	self.master_fader = new Slider(MASTER_SLIDER);
	self.master_select = new Button(MASTER_BUTTON);
	self.bank_up = new Button(MAIN_BUTTON);
	self.bank_down = new Button(AUX1_BUTTON);

	this.master = host.createMasterTrack(8);
	this.track_bank = host.createTrackBank(8,3,8);
	this.selected_track = host.createCursorTrack(3, 0);

	this.master.getVolume().addValueObserver(128,function(value){
		self.master_fader.set_value(161/128 * value);
	})

	this.master.addIsSelectedInMixerObserver(function(value){
		self.master_select.set_value(value ? 1 : 0);
	})

	this.track_bank.addCanScrollTracksUpObserver(function(value){
		self.bank_up.set_value(value ? 1 : 0)
	})

	this.track_bank.addCanScrollTracksDownObserver(function(value){
		self.bank_down.set_value(value ? 1 : 0)
	})

	for (x = 0; x < 4; x ++)
	{
		self.rotaries.push(new Rotary(ROTARIES[x]));
	}	
	this.selected_track.getPan().addValueObserver(128, function(value){
		self.rotaries[0].set_value(value)
	})

	for(y = 0; y < 3 ;y ++)
	{
		this.selected_track.getSend(y).addValueObserver(128, makeIndexedFunction(y,function(index,value){
			self.rotaries[index + 1].set_value(value);
		}))
	}

	for (i = 0; i < 8; i ++)
	{
		self.sliders.push(new Slider(SLIDERS[i]));
		var track = this.track_bank.getTrack(i);
		if (track != undefined)
		{
			track.getVolume().addValueObserver(128, makeIndexedFunction(i, function(index, value)
			{
				self.sliders[index].set_value(value);
			}));

			//initializing our track selection buttons
			self.track_select_buttons.push(new Button(SELECT_BUTTONS[i]))
			track.addIsSelectedInMixerObserver(makeIndexedFunction(i,function(index,value)
			{
				self.track_select_buttons[index].set_value(value ? 1 : 0)
			}));
		}
	}

}


KMix_Mixer.prototype.onMIDI = function (status,data1,data2)
{
	if(status == 176)
	{
		if(data1 > 0 && data1 < 9){
			this.track_bank.getTrack(data1 - 1).getVolume().set(data2, 128); 
		}else if(data1 == this.master_fader.CC){
			this.master.getVolume().set(data2, 161); 
		}else if (data1 > 9 && data1 < 14){
			if(data1 == 10){
				this.selected_track.getPan().set(data2,128);
			}else if(data1 > 10){
				this.selected_track.getSend(data1 - 11).set(data2,128);
			}
		}
	}
	
	if(status == 144 && data2 > 0)
	{
		if(data1 > 0 && data1 < 9){
			this.track_bank.getTrack(data1 - 1).selectInMixer();
		}else if(data1 == this.master_select.note){
			this.master.selectInMixer();
		}else if(data1 == this.bank_up.note){
			this.track_bank.scrollTracksUp();
		}else if(data1 == this.bank_down.note){
			this.track_bank.scrollTracksDown();
		}
	}

	

	if(status == 128 && data2 == 0)
	{
		if(data1 > 0 && data1 < 9){
			this.track_select_buttons[data1-1].on_release();
		}else if(data1 == this.master_select.note){
			this.master_select.on_release();
		}else if(data1 == this.bank_up.note){
			this.bank_up.on_release();
		}else if(data1 == this.bank_down.note){
			this.bank_down.on_release();
		}
	} 
}
	


