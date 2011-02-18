var id = 0;
var itemViewModel = function(options) {
	options = options || {};
    this.item = ko.observable(options.item || '');
	  this.id = ko.observable(id++);
    this.hours = ko.observable(options.hours || '');
    this.enteredTime = ko.observable(options.enteredTime || 0);
    this.isDone = ko.observable(options.done || false);
    
    this.remove = function() {
  	  viewModel.tasks.remove(this)
  	};
    this.timeRemaining = ko.dependentObservable(function() {
    	var hours = this.hours() - this.enteredTime();
		return (hours < 0) ? 0 : hours;
	}, this);
}

var taskList = function() {
	this.tasks = ko.observableArray([]);
	this.first = ko.dependentObservable(function() {
		return this.tasks()[0] || new itemViewModel();
	}, this);
	this.time_remaining = ko.dependentObservable(function() {
		var total = 0;
		for(var i in this.tasks()) {
			total += this.tasks()[i].timeRemaining();
		}
		return total;
	}, this);
	
	this.tasks.subscribe(function() {
		window.setTimeout(function() {
			$('#todo-list').sortable({handle: '.handle'});
		}, 100);
	});
	
	this.itemToAdd = ko.observable("");
	this.addTime = ko.observable("");
};

taskList.prototype = {
	onSort: function(ui, e) {
		var order = [];
		$('li', ui).each(function() {
			if($(this).attr('id')) order.push(parseInt($(this).attr('id')));
		});
		var items = this.tasks();
		this.tasks( [] );
		for(var i in order) 
			for(var j in items)
				if(items[j].id() == order[i])
					this.tasks.push(items[j]);
		return true;
	},
	
	addItem: function() {
		this.tasks.push(new itemViewModel({
			name: this.itemToAdd(),
			totalTime: parseInt(this.addTime())
		}));
		this.itemToAdd("");
		this.addTime("");
	}
}

viewModel = new taskList();

viewModel.tasks.push(new itemViewModel({item: "Do this", hours: 3}))
viewModel.tasks.push(new itemViewModel({item: "Do that", hours: 4}))

ko.applyBindings(viewModel);



$('input').keyup(function(e) {
   if(e.keyCode == 13) $("#addItemButton").trigger("click")
});

$("input[placeholder]").placeholder();