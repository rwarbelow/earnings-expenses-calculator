$(document).ready(function(){
	edSet = false
	$('.ed-choice').on('click', function(){
		$('.gone').remove()
		$('.after-start').removeClass('after-start')
		var salary = $(this).data('earnings')
		var starter = $(this).data('starter')
		var edLevel = $(this).find('#label').text()
		if(salary - calculateExpenses() > 0){
			$('.ed-choice').removeClass('earnings-selected')
			$(this).toggleClass('earnings-selected')
			edSet = true
			$('.outcome-salary').text(salary)
			calculate()
		}
	});
	$('.col-md-3').on('click', function(){
		if(edSet){
			$(this).toggleClass('selected')
			calculate(this)
		}else{
			$('.education-description').css('color', 'red').effect( "shake" );
		}
	});
});

function calculateExpenses(){
	var expenses = 0
	$('.selected').each(function() {
		var itemCost = parseInt($(this).find('.cost').text());
		expenses = expenses + itemCost
	});
	return expenses
}

function calculate(element) {
	$('.warning').empty();
	var expenses = calculateExpenses()
	$('.outcome-expenses').text(expenses)
	var earnings = $('.earnings-selected').data('earnings')
	var leftover = earnings - expenses
	if(leftover < 0) {
		$('.container').hide()
		$('body').append('<div class="lost">You can\'t afford that. <br> You need more education!<br><button class="btn btn-success btn-lg try-again">Try Again</button></div>')
		$('.navbar').append('<div class="sad"><img class="girl-no" src="images/girl-no.png"></div>')
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
