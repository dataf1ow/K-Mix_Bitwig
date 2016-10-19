/*

Copyright 2016 Evan Bogunia_____evanbeta@keithmcmillen.com

*/


//Load the bitwig API, and our external files.
loadAPI(1);
load( "KMix_MIDI.js" );
load( "KMix_Button.js" 	)
load( "KMix_Transport.js" );
load( "KMix_Mixer.js" )

//Define/set our controller properties [ company, device, version, uuid ]
host.defineController("Keith McMillen Instruments", "K-Mix", "1.0", "768E0540-9240-11E6-BDF4-0800200C9A66");
host.defineMidiPorts(1,1);

//Define/set input/output port names
host.addDeviceNameBasedDiscoveryPair(["K-Mix Control Surface"],["K-Mix Control Surface"]);

//------------------------------------ Init -----------------------------------//
function init()
{
	Transport = new KMix_Transport();
	Mixer = new KMix_Mixer();
	host.getMidiInPort(0).setMidiCallback(onMidiPort1);
}

//--------------------------- MIDI Callbacks ---------------------------//
function onMidiPort1(status, data1, data2)
{
	Transport.onMIDI(status, data1, data2);
	Mixer.onMIDI(status,data1,data2);
}


function exit()
{
	println("exit.");
}



