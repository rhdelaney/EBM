//var camera, scene, renderer;
//var mesh;
var synth = new Tone.Synth().toMaster();

// Link to OSC data
socket = new NodeSocket();
/*init();*/
animate();
/*var keyDownAnimationA = {
    box-shadow: "0px 3px 0px #AA00FF !important"
}

$("#a" ).animate(keyDownAnimationA)*/
/*
$( "#a" ).animate({
    width: "70%",
    opacity: 0.4,
    marginLeft: "0.6in",
    fontSize: "3em",
    borderWidth: "10px"
  }, 1500 );*/

/*function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}*/
function animate() {
    //requestAnimationFrame( animate );
    var b = socket.getBeta()/20000;
    console.log(b);
    if(b > 0.0 && b<0.4){
        //(#a).addClass("active");
                  //mesh.rotation.x += 0.005;
		    synth.triggerAttackRelease('C4', '8n');
                  //mesh.rotation.y += 0.01;
        //(#a).removeClass("active");
   }
   else if(b > 0.4 && b<0.8){
        //(#b).addClass("active");
                  //mesh.rotation.x += 0.005;
		    synth.triggerAttackRelease('D4', '8n');
                  //mesh.rotation.y += 0.01;
        //(#b).removeClass("active");
   }
   else if(b > 0.8 && b<1.2){
        //(#c).addClass("active");
                //mesh.rotation.x += 0.005;
		    synth.triggerAttackRelease('A4', '8n');
                //mesh.rotation.y += 0.01;
        //(#c).removeClass("active");
   }
   else if (b > 1.2 && b<1.6) {
     //(#d).addClass("active");
	             //mesh.rotation.x += 0.005;
		  synth.triggerAttackRelease('A4', '8n');
              //mesh.rotation.y += 0.01;
      //(#d).removeClass("active");
   }
    else if  (b > 1.6 && b<2.0) {
      //(#e).addClass("active");
	             //mesh.rotation.x += 0.005;
		  synth.triggerAttackRelease('A4', '8n');
              //mesh.rotation.y += 0.01;
      //(#e).removeClass("active");
   }
    else if (b > 2.4 && b<2.8) {
      //(#f).addClass("active");
	             //mesh.rotation.x += 0.005;
		  synth.triggerAttackRelease('A4', '8n');
              //mesh.rotation.y += 0.01;
      //(#f).removeClass("active");
   }
   else{
      //(#g).addClass("active");
      synth.triggerAttackRelease('A4', '8n');}
      renderer.render( scene, camera );
      //(#g).removeClass("active");
}
