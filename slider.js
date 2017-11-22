$(document).ready(function(){
	var model=[0,1,2,3,4];
	var code=setInterval(slideRight,3000);
	$('#right').click(function(){
		if(code){
			clearInterval(code)
			code=0;
		}
		slideRight();
	})
	$('#left').click(function(){
		if(code){
			clearInterval(code)
			code=0;
		}
		slideLeft();
	})
	$('.dot>li').click(function(){
		if(code){
			clearInterval(code)
			code=0;
		}
		var id=$(this).data('id');
		var index=model.indexOf(id);
		var cl=index-0;
		var cr=model.length-index;
		if(cl<=cr){
			slide(cl,1);
			for(var i=0;i<cl;i++)
			{
				var temp=model.shift();
				model.push(temp);
			}
		}
		else{
			slide(cr,-1);
			for(var i=0;i<cr;i++){
				var temp=model.pop();
				model.unshift(temp);
			}
		}
		$('.dot>li').removeClass('active');
		$(this).addClass('active')

	})
	function slide(step, dire){
		if(step==0)
			return;
		if(dire>0){
			$('#list').animate({'left':-1366*step+'px'},500,function(){
				for(var i=0;i<step;i++)
					$('#list>li:first-child').appendTo($('#list'));
				$('#list')[0].style.left="0px";
				if(!code)
					code=setInterval(slideRight,3000);
			});
		}
		else{
			$('#list')[0].style.left=-1366*step+'px';
			for(var i=0;i<step;i++)
				$('#list>li:last-child').prependTo($('#list'));
			$('#list').animate({'left':'0px'},500,function(){
				if(!code)
					code=setInterval(slideRight,3000);
			});
		}
	}
	function slideRight(){
		slide(1,1);
		var temp=model.shift();
		model.push(temp);
		$('.dot>li').removeClass('active');
		$('.dot>li')[model[0]].classList.add('active');	
	}
	function slideLeft(){
		slide(1,-1);
		var temp=model.pop();
		model.unshift(temp);
		$('.dot>li').removeClass('active');
		$('.dot>li')[model[0]].classList.add('active');
	}
})