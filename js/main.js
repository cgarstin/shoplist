var ShoppingList=ShoppingList||{};

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

ShoppingList.RemoveItem = function() {
	$('.items').on('click', 'li', function() {
		console.info($(this).text(), ShoppingList.GetList().split(','));
		var array = ShoppingList.GetList().split(',');
		var listItemIndex = array.indexOf($(this).text());
		if( listItemIndex !== -1) {
			ShoppingList.SetList(array.splice(listItemIndex, 1))
		}
	});
}

ShoppingList.UpdateList = function(list) {

}

ShoppingList.SubmitValue = function() {
	$('.shopping-list').on('submit', function(){
		var currentList = JSON.parse(ShoppingList.GetList()),
				newItem = $('.new-item').val();

		ShoppingList.SetList(currentList, newItem);
		return false;
	});
}

ShoppingList.GetList = function() {
	var oldList = localStorage.getItem('Shopping List');
	return oldList;
}

ShoppingList.SetList = function(shoppingList, newItem) {
	if(shoppingList) {
		var newList = JSON.stringify(shoppingList + ',' + newItem);
		localStorage.setItem('Shopping List', newList)
		ShoppingList.BuildList(newList);
	}
}

ShoppingList.BuildList = function(shoppingList) {;
	if(shoppingList) { 	
		var listArray = shoppingList.split(',');
		$('.items').empty()
		$.each(listArray, function(index, value){
			$('.items').prepend('<li>' + value)
		});
	}
}

$(function(){
	ShoppingList.submitValue = new ShoppingList.SubmitValue();
	ShoppingList.getList = new ShoppingList.GetList();
	ShoppingList.setList = new ShoppingList.SetList();
	ShoppingList.buildList = new ShoppingList.BuildList();
	ShoppingList.updateList = new ShoppingList.UpdateList();
	ShoppingList.removeItem = new ShoppingList.RemoveItem();
});
