/** Class used to manage connection with node server.
 * @class
*/

var NodeSocket = function() {
	this.socket = io();
	this.alpha = 0
	this.beta = 0
	this.theta =0
	this.getBeta = function(){
		return this.beta;
	}
	this.setBeta= function(val){
		this.beta = val;
	}
	this.getAlpha = function(){
		return this.alpha;
	}
	this.setAlpha= function(val){
		this.alpha = val;
	}
	this.getTheta = function(){
		return this.theta;
	}
	this.setTheta= function(val){
		this.theta = val;
	}



	this.socket.on('channel1', function(packet) {
		//console.log(packet.msg);
		socket.setBeta(packet.msg[5])
		socket.setAlpha(packet.msg[4])
		socket.setTheta(packet.msg[3])
	})
}
