var itemViewModel = function(options) {
    this.item = ko.observable(options.item || '');
    this.hours = ko.observable(options.hours || '');
    this.isDone = function() { 
      //check if item is done  
      return false
    };
}
itemViewModel.prototype = {
    setActive: function() {
      this.container.activePage(this);
    },
    setHome: function() {
      this.container.homePage(this);
    }
}

var viewModel = {};
viewModel.items = ko.observableArray([]);
viewModel.addItem = function () {
   // add item code
   viewModel.items.push(new itemViewModel({item: $("#new-todo").val(), hours: $("#new-todo-hours").val()}))
}

viewModel.items.push(new itemViewModel({item: "Do this", hours: 3}))
viewModel.items.push(new itemViewModel({item: "Do that", hours: 4}))

ko.applyBindings(viewModel);



$('input').keyup(function(e) {
   if(e.keyCode == 13) $("#addItemButton").trigger("click")
});

$("input[placeholder]").placeholder();