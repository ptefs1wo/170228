var text_value={
	vdifficalt:'超難',
	hard:'難',
	normal:'普',
	easy:'易',
	goal:"完走",
	turn:"撤退",
	lose:"敗北",
	zero:"なし",
	flute:"笛",
	jpiano:"琴",
	jgtr:"三味線",
	drum:"太鼓",
	bell:"鈴"
}
//ページ読み込み時cookie取得
var limit = new Date("2029/12/31 23:59").toUTCString();
$(function(){
	if(document.cookie=="")
	{
		document.cookie=('sumg_c=0;expires='+limit);
		document.cookie=('dropbox_value='+encodeURIComponent('ここに記録が書き込まれます')+';expires='+limit);
	}
	else
	{
		var c_value=document.cookie.split(';');
		var i=0;
		while(i<c_value.length)
		{
			var x=c_value[i].split('=');
			x[0]=x[0].replace(/ /g,'');
			select_c(x[0],x[1]);
			i++;
		}
	}
	function select_c(a,b){
		switch(a){
			case 'dropbox_value':
				var dc_db=decodeURIComponent(b);
				var text=dc_db.replace(/<br>/g,'\r\n');
				$('textarea[name=dropbox]').val(text);
			break;
			case 'sumg_c':
			$('#sumg').val(b);
			break;
			default :break;
		}
	}
}
);
add_about('difliculty','cdfc');//難易度
add_about('result','crsl');//戦闘結果
add_about('music','cmsc');//楽器
function add_about(a,b){
	$('div#'+a+' input')
	.attr('type','radio')
	.attr('name', a)
	.addClass(b);
}
var spc="";
//特別通行手形
$("input[name=special]").click(function(){
	if($(this).prop('checked')) spc="特別";
	else spc="";
});
//玉用メソッド
$('div#addgyoku button').attr('onclick','addgyoku_value(value,"#addg");');
$('div#sumgyoku button').attr('onclick','addgyoku_value(value,"#sumg");');
function addgyoku_value(gyoku_value,spot){
	var after_gyoku=parseInt($(spot).val())+parseInt(gyoku_value);
	if(after_gyoku>=0) $(spot).val(after_gyoku);
	else $(spot).val(0);
	if(spot=="#sumg") document.cookie=('sumg_c='+after_gyoku+';expires='+limit);
}
function r_value(item){
	return text_value[item];
}
//マウスホイール
var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
var spot;
$('input').hover(function(e){
	this.spot=e.target.id;
})
.on(mousewheelevent,function(e){
	spot=this.spot;
	e.preventDefault();
	var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
	if (delta < 0){
		var x=parseInt($('#'+spot).val());
		x--;
		if(x<0) $('#'+spot).val(0);
		else $('#'+spot).val(x);
	} else {
		var x=parseInt($('#'+spot).val());
		x++;
		$('#'+spot).val(x);
	}
	if(spot=='#sumg') document.cookie=('sumg_c='+gyoku_value+';expires='+limit);
});
//記録するボタンのイベント
$('#btn').click(function(){
	if((r_value($('div#difliculty input:checked').val())==null)||(r_value($('div#result input:checked').val())==null)||(r_value($('div#music input:checked').val())==null)){
		alert("必要事項を入力してください");
	}
	else{
		var sumg_value=parseInt($('#sumg').val());
		var addg_value=parseInt($('#addg').val());
		sumg_value+=addg_value;
		$('#sumg').val(sumg_value);
		var memory=$('textarea[name=dropbox]').val();
		var dmemory=r_value($('div#difliculty input:checked').val())+"・"+r_value($('div#result input:checked').val())+"・"+$('#addg').val()+"・"+spc+r_value($('div#music input:checked').val())+"\r\n"+memory;
		if(memory.length<=4000){
		$('textarea[name=dropbox]').val(dmemory);
		jadgetext();
		dmemory=dmemory.replace(/\r?\n/g,'<br>');
		document.cookie=('sumg_c='+parseInt($('#sumg').val())+';expires='+limit);
		document.cookie=('dropbox_value='+encodeURIComponent(dmemory)+';expires='+limit);
	}
	else $('div#warning').text('容量が大きすぎます！このテキストが出なくなるまでテキストエリアを減らしてください');
	}
});
//テキストエリアの直接編集後cookie
$(document).on('paste','textarea[name=dropbox]',function(){setTimeout(jadgetext,10);})
.on('keydown','textarea[name=dropbox]',function(){jadgetext();})
.on('keyup','textarea[name=dropbox]',function(){jadgetext();}
	);
var jadgetext=function(){
	if(encodeURIComponent($('textarea[name=dropbox]').val()).length>4000) $('span#warning').text('容量が大きすぎます！このテキストが出なくなるまでテキストエリアを減らしてください');
	else　{
		$('span#warning').text('約4000バイト中'+encodeURIComponent($('textarea[name=dropbox]').val()).length+'バイト使用しています');
		var memory=encodeURIComponent($('textarea[name=dropbox]').val());
		memory=memory.replace(/\r?\n/g,'<br>');
		document.cookie=('dropbox_value='+memory+';expires='+limit);
	}
}
//玉数直接編集後、数字以外は消去
$('#addg,#sumg').change(function(e){var spot=e.target.id;
	jadgegyoku(spot);})
.keypress(function(e){var spot=e.target.id;
	jadgegyoku(spot);})
.keyup(function(e){var spot=e.target.id;
	jadgegyoku(spot);});
var jadgegyoku=function(spot){
	var a=$('#'+spot).val();
	var b=a.replace(/[^0-9]/g,'');
	$('#'+spot).val(b);
	console.log(b);
}
//りどみイベント
$('#btn_rdm').click(function(){
	$('#rdm').slideToggle(100);
});
$('#dck').click(function(){
	if(confirm('本当に削除しますか？')){
		document.cookie=('sumg_c=0;expires='+this.limit);
		document.cookie=('dropbox_value='+encodeURIComponent('ここに記録が書き込まれます')+';expires='+this.limit);
		alert('削除しました');
	}
	else{
		return false;
	}
}
);
