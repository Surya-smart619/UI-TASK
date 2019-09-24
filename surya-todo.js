var collectionOfList = [];
var activeList;
var activeTask;

var list = {
	id : "",
	name : "",
	tasks : []
};

var task = {
	id : "",
	name : "",
	steps : []
};

var step = {
	id : "",
	description : ""
};

function loadLists() {
	var listContainer = document.getElementById("sideList");
	listContainer.innerHTML = "";
	for(listIndex in collectionOfList){
		let list = collectionOfList[listIndex];
		let divElement = document.createElement("DIV");
		addClickEventInLeftListTitle(divElement);
		divElement.id = list.id;
		divElement.className = "leftPanelContent";
		let iElement = document.createElement("I");
		iElement.className = "fa fa-list";
		iElement.id = list.id;
		iElement.setAttribute("aria-hidden", "true");
		divElement.appendChild(iElement);
		let innerDivElement = document.createElement("DIV");
		innerDivElement.className = "leftPanelTitle blue bold";
		innerDivElement.id = list.id;
		let spanElement = document.createElement("SPAN");
		spanElement.id = list.id;
		let textElement = document.createTextNode(list.name);
		spanElement.appendChild(textElement);
		innerDivElement.appendChild(spanElement);
		divElement.appendChild(innerDivElement);
		listContainer.appendChild(divElement);
	}
}

function loadTasks() {
	var taskContainer = document.getElementById("tasksContainer");
	taskContainer.innerHTML = "";
	for(taskIndex in activeList.tasks) {
		let task = activeList.tasks[taskIndex];
		let divElement = document.createElement("DIV");
		addClickEventInTask(divElement);
		divElement.className = "tasks";
		divElement.id = task.id;
		let spanElementForCheckBox = document.createElement("SPAN");
		spanElementForCheckBox.className = "checkBox";
		spanElementForCheckBox.id = task.id;
		divElement.appendChild(spanElementForCheckBox);
		let innerDivElement = document.createElement("DIV");
		innerDivElement.className = "taskTitle";
		innerDivElement.id = task.id;
		let spanElement = document.createElement("SPAN");
		spanElement.id = task.id;
		let textElement = document.createTextNode(task.name);
		spanElement.appendChild(textElement);
		innerDivElement.appendChild(spanElement);
		divElement.appendChild(innerDivElement);
		taskContainer.appendChild(divElement);
	}
}

function loadSteps() {
	document.getElementById("taskName").innerHTML = activeTask.name;
	var stepContainer = document.getElementById("stepsContainer");
	stepContainer.innerHTML = "";
	for(stepIndex in activeTask.steps) {
		let step = activeTask.steps[stepIndex];
	}
}

document.getElementById("sideBarButton").addEventListener("click", function() {
	if("50px" == document.getElementById("sideMenu").style.width) {
		openLeftPanel();
	} else {
		closeLeftPanel();
	}
});

function closeLeftPanel() {
	document.getElementById("sideMenu").style.width = "50";
	var leftPanelTitle = document.getElementsByClassName("leftPanelTitle");
	for(let i=0; i < leftPanelTitle.length; i++) {
		leftPanelTitle[i].style.display = "none";
	}
}

function openLeftPanel() {
	document.getElementById("sideMenu").style.width = "290";
	var leftPanelTitle = document.getElementsByClassName("leftPanelTitle");
	for(let i=0; i < leftPanelTitle.length; i++) {
		leftPanelTitle[i].style.display = "inline-block";
	}
}

var listInput = document.getElementById("listInput");
listInput.addEventListener("keydown", function(event) {
	if(listInput.value != "") {
		if(event.keyCode == 13) {
			createListInLeftPanel(listInput);
		}
	}
});

function createListInLeftPanel(listInput) {
	var list = new Object();
	list.id = create_UUID();
	list.name = listInput.value;
	list.tasks = [];
	collectionOfList.push(list);
	activeList = list;
	document.getElementById("displayListTitle").innerHTML = listInput.value;
	listInput.value = "";
	loadLists();
	document.getElementById("tasksContainer").innerHTML = "";
}

var taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function(event) {
	if(taskInput.value != "") {
		if(event.keyCode == 13) {
			createTask(taskInput);
		}
	}
});
	
var stepInput = document.getElementById("stepInput");
stepInput.addEventListener("keydown", function(event) {
	if(taskInput.value != "") {
		if(event.keyCode == 13) {
			createStep(stepInput);
		}
	}
});

function createTask(taskInput) {
	var task = new Object();
	task.id = create_UUID();
	task.name = taskInput.value;
	task.steps =[];
	activeList.tasks.push(task);
	taskInput.value = "";
	loadTasks();
}

function createStep(stepInput) {
	var step = new Object();
	step.id = create_UUID();
	step.name = stepInput.value;
	activeTask.steps.push(step);
	loadSteps();
}

function addClickEventInTask(element) {
	element.addEventListener("click", function(event) {
		var activeTaskId = event.target.id;
		activeTask = activeList.tasks.find(task => task.id === activeTaskId);
		document.getElementById("taskDetails").style.display = "block";
		loadSteps();
	});
}

function addClickEventInLeftListTitle(element) {
	element.addEventListener("click", function(event) {
		var activeListId = event.target.id;
		activeList = collectionOfList.find(list => list.id === activeListId);
		document.getElementById("displayListTitle").innerHTML = activeList.name;
		document.getElementById("taskDetails").style.display = "none";
		loadTasks();
	});
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
