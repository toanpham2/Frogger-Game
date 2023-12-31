import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 50;


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const soundDRAKE = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();


// var timer = new THREE.Clock(true);
// var elapsed = timer.getElapsedTime();
// timer.start();
var frogNum = 5;
var exPressed = false;
var hitHome;
var frog;
var lakeField;
var logsRow1 = [];
var logsRow2 = [];
var turtles = [];
var frogHomes = [];
var carsRow1 = [];
var carsRow2 = [];

var livesCount = 10;
var score = 0;

var carriedByLog1;
var carriedByLog2;
var carriedByTurt;

function sceneSet () {
	var zone = new THREE.TextureLoader().load('grass.jpg');
	var startZone = new THREE.PlaneGeometry( window.innerWidth, 20 );
	var startCol = new THREE.MeshBasicMaterial( {map: zone} );
	var startField = new THREE.Mesh( startZone, startCol );
	scene.add( startField);
	startField.position.y = -20;

	var roadText = new THREE.TextureLoader().load('road.jpg');
	var roadZone = new THREE.PlaneGeometry( window.innerWidth, 13 );
	var roadCol = new THREE.MeshBasicMaterial( {map: roadText} );
	var roadField = new THREE.Mesh( roadZone, roadCol );
	scene.add(roadField);
	roadField.position.y = -9;

	var ground = new THREE.TextureLoader().load('ground.jpg');
	var pathZone = new THREE.PlaneGeometry( window.innerWidth, 8 );
	var pathCol = new THREE.MeshBasicMaterial( {map: ground} );
	var pathField = new THREE.Mesh( pathZone, pathCol );
	scene.add( pathField);
	pathField.position.y = 0;

	var lakeText = new THREE.TextureLoader().load('water.jpeg');
	var lakeZone = new THREE.PlaneGeometry( window.innerWidth, 20 );
	var lakeCol = new THREE.MeshBasicMaterial( {map: lakeText} );
	lakeField = new THREE.Mesh( lakeZone, lakeCol );
	scene.add( lakeField);
	lakeField.position.y = 11;

	var finishZone = new THREE.PlaneGeometry( window.innerWidth, 10 );
	var finishCol = new THREE.MeshBasicMaterial( {map: zone});
	var finishField = new THREE.Mesh( finishZone, finishCol );
	scene.add( finishField);
	finishField.position.y = 20;

	var frogtext = new THREE.TextureLoader().load( 'Luffy.jpg' );
	var frogZone = new THREE.BoxGeometry( 2, 2, 2 );
	const material = new THREE.MeshBasicMaterial({
		map: frogtext
    });


	frog = new THREE.Mesh( frogZone, material );
	scene.add( frog);
	frog.position.y = -17;
	
	
	
	var carText = new THREE.TextureLoader().load('car.jpg');
	var carGeo = new THREE.BoxGeometry(7, 2, 2);
	var carMat = new THREE.MeshBasicMaterial({
		map:carText
	});
	carsRow1[0] = new THREE.Mesh(carGeo, carMat);
	carsRow1[0].position.x = -30;
	carsRow1[0].position.y = -9;
	carsRow1[1] = new THREE.Mesh(carGeo, carMat);
	carsRow1[1].position.x = -60;
	carsRow1[1].position.y = -9;
	scene.add(carsRow1[0]);
	scene.add(carsRow1[1]);
	for(var i=2;i<4;i++){
		carsRow1[i] = new THREE.Mesh(carGeo, carMat);
		carsRow1[i].position.y = -13;
		carsRow1[i].position.x = -30 + (i*10 + 15)
		
		scene.add(carsRow1[i])
	}
	for(i=0;i<4;i++){
		carsRow2[i] = new THREE.Mesh(carGeo, carMat);
		carsRow2[i].position.y = -5.5;
		carsRow2[i].position.x = -40 + (i*15 + 15)
		scene.add(carsRow2[i])
	}

	var logText = new THREE.TextureLoader().load('log.jpg');
	var crocText = new THREE.TextureLoader().load('crocodile-one-piece-bounty-wanted-mr-0-anime-one-piece.jpg');
	var logGeo = new THREE.BoxGeometry(7, 4, 2);
	var logMat = new THREE.MeshBasicMaterial({map: logText});
	var crocMat = new THREE.MeshBasicMaterial({map:crocText});
	logsRow1[0] = new THREE.Mesh(logGeo, crocMat);
	logsRow1[0].position.x = -30;
	logsRow1[0].position.y = 13;
	scene.add(logsRow1[0]);
	for(i=1;i<4;i++){
		logsRow1[i] = new THREE.Mesh(logGeo, logMat);
		logsRow1[i].position.y = 13;
		logsRow1[i].position.x = -30 + (i*10 + 15)
		scene.add(logsRow1[i])
	}
	
	var turtleText = new THREE.TextureLoader().load('turtle.jpeg');
	var turtGeo = new THREE.BoxGeometry(7, 4, 2);
	var turtMat = new THREE.MeshBasicMaterial({map:turtleText});
	for (i = 0; i < 3; i++){
		turtles[i] = new THREE.Mesh(turtGeo, turtMat);
		turtles[i].position.y = 8;
		turtles[i].position.x = -30 + (i*10 + 15)
		
		//if(elapsed % 3 == 0){
		scene.add(turtles[i]);
		//};
	}

	logsRow2[0] = new THREE.Mesh(logGeo, logMat);
	logsRow2[0].position.x = -20;
	logsRow2[0].position.y = 3;
	scene.add(logsRow2[0]);
	for(i=1;i<4;i++){
		logsRow2[i] = new THREE.Mesh(logGeo, logMat);
		logsRow2[i].position.y = 3;
		logsRow2[i].position.x = -30 + (i*15 + 15)
		scene.add(logsRow2[i])
	}
	
	var homeText = new THREE.TextureLoader().load('house.jpg');
	var homeGeo = new THREE.BoxGeometry(4, 4, 2);
	var homeMat = new THREE.MeshBasicMaterial({map:homeText});
	for (i = 0; i < 5; i++){
		frogHomes[i] = new THREE.Mesh(homeGeo, homeMat);
		frogHomes[i].position.y = 20;
		frogHomes[i].position.x = -45 + (i*15 + 15)
		
		//if(elapsed % 3 == 0){
		scene.add(frogHomes[i]);
		//};
	}
};

function keydownAction(e) {
    if (e.key === 'w') {
        if (frog.position.y >= 0) {
            frog.position.y += 2;
        } else {
            frog.position.y += 2;
        }
    } else if (e.key === 's') {
        if (frog.position.y >= 0) {
            frog.position.y -= 3;
        } else {
            frog.position.y -= 3;
        }
    } else if (e.key === 'a') {
        frog.position.x -= 3;
    } else if (e.key === 'd') {
        frog.position.x += 3;
    } else if (e.key === '!'){
		if(exPressed == false){
			exPressed = true;
		}
		else{
			exPressed = false;
		}
		
	} else if (e.key === 'm'){
		audioLoader.load( 'drake-hotline-bling-low-quality-djlunatique.com.ogg', function( buffer ) {
			soundDRAKE.setBuffer( buffer );
			soundDRAKE.setLoop( true );
			soundDRAKE.setVolume( 0.5 );
			soundDRAKE.play();
		});
	}
}



function carCrash(){
	for(var i=0;i<carsRow1.length;i++){
		var firstBox = new THREE.Box3().setFromObject(frog);
		var secondBox = new THREE.Box3().setFromObject(carsRow1[i]);
		var collisionStat = firstBox.intersectsBox(secondBox);
		if(collisionStat) death();

	}
	for(i=0;i<carsRow2.length;i++){
		var firstBox = new THREE.Box3().setFromObject(frog);
		var secondBox = new THREE.Box3().setFromObject(carsRow2[i]);
		var collisionStat = firstBox.intersectsBox(secondBox);
		if(collisionStat) death();
	}
}

function river(){
	carriedByLog1 = false;
	carriedByLog2 = false;
	carriedByTurt = false;
	if(frog.position.y > 1 && frog.position.y < 7){
		for(var i=0;i<logsRow2.length;i++){
			var firstBox = new THREE.Box3().setFromObject(frog);
			var secondBox = new THREE.Box3().setFromObject(logsRow2[i]);
			var collisionStatLogs = firstBox.intersectsBox(secondBox);
			if(collisionStatLogs){
				carriedByLog2 = true;
				carryFrog();
			};
		}
		if(!carriedByLog2) death();
	}

	if(frog.position.y >=8 && frog.position.y < 11){
		for(var i=0;i<turtles.length;i++){
			var firstBox = new THREE.Box3().setFromObject(frog);
			var secondBox = new THREE.Box3().setFromObject(turtles[i]);
			var collisionStatTurts = firstBox.intersectsBox(secondBox);
			if(collisionStatTurts){
				carriedByTurt = true;
			};
		}
		if(!carriedByTurt) death();
	}
	//extra credit added a crocodile
	if(frog.position.y >= 12 && frog.position.y < 16){
		var firstBox = new THREE.Box3().setFromObject(frog);
		var crocBox = new THREE.Box3().setFromObject(logsRow1[0]);
		var collisionStatLogsCROC = firstBox.intersectsBox(crocBox);
		if(collisionStatLogsCROC) death()

		for(var i=1;i<logsRow1.length;i++){
			var firstBox = new THREE.Box3().setFromObject(frog);
			var secondBox = new THREE.Box3().setFromObject(logsRow1[i]);
			
			var collisionStatLogs = firstBox.intersectsBox(secondBox);
			
			if(collisionStatLogs){
				carriedByLog1 = true;
				carryFrog();
			};
		}
		if(!carriedByLog1) death();
	}
}


function death(){
	if(livesCount >1){
		livesCount--;
		alert('You lost a life, lives left: ' + livesCount + ' , died at y = ' + frog.position.y);
		frog.position.set(0,-18,0);

	}
	else {
		alert('Game Over, You lost')
	}
}

//keep track of score, extra credit
function home(){
	hitHome = false;
	if(frog.position.y > 20){
		for(var i=0;i<frogHomes.length;i++){
			var firstBox = new THREE.Box3().setFromObject(frog);
			var secondBox = new THREE.Box3().setFromObject(frogHomes[i]);
			var collisionStatLogs = firstBox.intersectsBox(secondBox);
			if(collisionStatLogs){
				hitHome = true;
				score++;
				frogNum--;
				alert('1 frog got home, your score is ' +score + ', frogs left : ' + frogNum);
				frog.position.set(0,-18,0);
			};
			if(frogNum == 0){
				alert('Game Over, You Won')
			}
		}
		if(!hitHome) death();
	}	
}

function carryFrog(){
	if(carriedByLog2) frog.position.x -= 0.1;
	if(carriedByLog1) frog.position.x += 0.1;
}


function carsMovements() {
    carsRow1.forEach(car => {
        car.position.x = (car.position.x <= 40) ? car.position.x + 0.25 : -40;
    });

    carsRow2.forEach(car => {
        car.position.x = (car.position.x >= -40) ? car.position.x - 0.25 : 40;
    });
}


function logsMovements() {
    logsRow1.forEach(log => {
        log.position.x = (log.position.x <= 40) ? log.position.x + 0.1 : -40;
    });

    logsRow2.forEach(log => {
        log.position.x = (log.position.x >= -40) ? log.position.x - 0.1 : 40;
    });
}



function render() {
	requestAnimationFrame( render );
	carsMovements();
	logsMovements();
	window.addEventListener("keydown", keydownAction, false);
	if(exPressed == false){
		carCrash();
		river();
		home();
	}
	if(exPressed == true){
		carEat();
		riverEat();
		home2();
	}
	renderer.render(scene, camera);
};




function carEat(){
	for(var i=0;i<carsRow1.length;i++){
		var firstBox = new THREE.Box3().setFromObject(frog);
		var secondBox = new THREE.Box3().setFromObject(carsRow1[i]);
		var collisionStat = firstBox.intersectsBox(secondBox);
		if(collisionStat){
			score++;
            //frog2.scale().set(frog2.scale().x*2, frog2.scale().y*2, frog2.scale().z*2);
			scene.remove(carsRow1[i]);
        };

	}
	for(i=0;i<carsRow2.length;i++){
		var firstBox = new THREE.Box3().setFromObject(frog);
		var secondBox = new THREE.Box3().setFromObject(carsRow2[i]);
		var collisionStat = firstBox.intersectsBox(secondBox);
		if(collisionStat){
			score++;
            scene.remove(carsRow2[i]);
        };
	}
}

function riverEat(){
	for(var i=0;i<logsRow1.length;i++){
		var firstBox = new THREE.Box3().setFromObject(frog);
		var secondBox = new THREE.Box3().setFromObject(logsRow1[i]);
		var collisionStat = firstBox.intersectsBox(secondBox);
		if(collisionStat){
			score++;
            scene.remove(logsRow1[i]);
        };

	}
	for(i=0;i<logsRow2.length;i++){
		var firstBox = new THREE.Box3().setFromObject(frog);
		var secondBox = new THREE.Box3().setFromObject(logsRow2[i]);
		var collisionStat = firstBox.intersectsBox(secondBox);
		if(collisionStat){
			score++;
            scene.remove(logsRow2[i]);
        };
	}
}



//keep track of score, extra credit
function home2(){
	//hitHome2 = false;
    for(var i=0;i<frogHomes.length;i++){
        var firstBox = new THREE.Box3().setFromObject(frog);
        var secondBox = new THREE.Box3().setFromObject(frogHomes[i]);
        var collisionStatLogs = firstBox.intersectsBox(secondBox);
        if(collisionStatLogs){
            //hitHome2 = true;
            score++;
            frogNum--;
            alert('1 frog got home, your score is ' +score + ', frogs left : ' + frogNum);
            frog.position.set(0,-18,0);
        };
        if(frogNum == 0){
            alert('Game Over, You Won')
        }
    }

}






sceneSet();
render();

