var startTime;
var isStarted=false;
$('#start').click(function(){
	if(isStarted===true) return;
	isStarted=true;
	startTime=Date.now();
	$('#result').text('0.000').removeClass();
$(this).addClass('pushed');
$('#stop').removeClass();
});
$('#stop').click(function(){
	if(isStarted===false) return;
	isStarted=false;
	$(this).addClass('pushed');
	$('#start').removeClass();
	var elapsedTime=(Date.now()-startTime)/1000;
	$('#result').text(elapsedTime.toFixed(3));
	diff=elapsedTime-5.0;
	if(Math.abs(diff)<1.0) $('#result').addClass('perfect');
	});