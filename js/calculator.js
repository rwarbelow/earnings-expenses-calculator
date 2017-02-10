$(document).ready(function(){
	$('#myModal').on('shown.bs.modal', function () {
	})
	
	edSet = false
	$('.ed-choice').on('click', function(){
		$('.gone').remove()
		$('.after-start').removeClass('after-start')
		$('.ed-choice').removeClass('earnings-selected')
		$(this).toggleClass('earnings-selected')
		edSet = true
		var salary = $(this).data('earnings')
		var starter = $(this).data('starter')
		var edLevel = $(this).find('#label').text()
		$('.outcome-salary').text(salary)
		calculate()
	});

	// $('body').on('click', '.try-again', function(){
	// 	window.location.reload(true);
	// });
	$('.col-md-3').on('click', function(){
		if(edSet){
			$(this).toggleClass('selected')
			calculate(this)
		}else{
			$('.education-description').css('color', 'red').effect( "shake" );
		}
	});
});


function calculate(element) {
	var expenses = 0
	$('.warning').empty();
	$('.selected').each(function() {
		var itemCost = parseInt($(this).find('.cost').text());
		expenses = expenses + itemCost
	});
	$('.outcome-expenses').text(expenses)
	var earnings = $('.earnings-selected').data('earnings')
	var leftover = earnings - expenses
	if(leftover < 0) {
		$('.container').hide()
		$('body').append('<div class="lost">You can\'t afford that. <br> (Hint: Get more education!)<br><button class="btn btn-success btn-lg try-again">Try Again</button></div>')
		$('.navbar').append('<div class="sad"><span class="glyphicon glyphicon-remove"></span></div>')
		$('body').on('click', '.try-again', function(){
			$('.lost').remove();
			$('.container').show();
			$('.sad').remove();
			$(element).removeClass('selected')
			calculate(element)
		});
	}else if(leftover > 0 && leftover < 500){
		$('.outcome-leftover').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	}
	$('.outcome-leftover').text(leftover)
}
