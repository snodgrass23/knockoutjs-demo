var itemViewModel = function(options) {
    this.item = ko.observable(options.item || '');
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
viewModel.itemToAdd = ko.observable("");
viewModel.addItem = function () {
   // add item code
}

viewModel.items.push(new itemViewModel({item: "Do this"}))
viewModel.items.push(new itemViewModel({item: "Do that"}))

ko.applyBindings(viewModel);

