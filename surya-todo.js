var collectionOfList = [];
var activeList;

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
			createNewListInLeftPanel(listInput);
		}
	}
});

function createNewListInLeftPanel(listInput) {
	var list = new Object();
	list.id = create_UUID();
	list.name = listInput.value;
	collectionOfList.push(list);
	activeList = list;
	var listContainer = document.getElementById("sideList");
	var divElement = document.createElement("DIV");
	addClickEventInLeftListTitle(divElement);
	divElement.id = list.id;
	divElement.className = "leftPanelContent";
	var iElement = document.createElement("I");
	iElement.className = "fa fa-list";
	iElement.id = list.id;
	iElement.setAttribute("aria-hidden", "true");
	divElement.appendChild(iElement);
	var innerDivElement = document.createElement("DIV");
	innerDivElement.className = "leftPanelTitle blue bold";
	innerDivElement.id = list.id;
	var spanElement = document.createElement("SPAN");
	spanElement.id = list.id;
	var textElement = document.createTextNode(listInput.value);
	spanElement.appendChild(textElement);
	innerDivElement.appendChild(spanElement);
	divElement.appendChild(innerDivElement);
	listContainer.appendChild(divElement);
	document.getElementById("displayListTitle").innerHTML = listInput.value;
	listInput.value = "";
}

var taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function(event) {
	if(taskInput.value != "") {
		if(event.keyCode == 13) {
			createTask(taskInput);
		}
	}
});

/*<div class = "tasks">
<span class = "checkBox"></span>
<div class = "taskTitle">
<span>Tasks</span>
</div>
</div>*/
    
function createTask(taskInput) {
	var task = new Object();
	task.id = create_UUID();
	task.name = taskInput.value;
	if(typeof activeList.tasks === "undefined") {
		activeList.tasks = [];
	}
	activeList.tasks.push(task);
	var divElement = document.createElement("DIV");
	divElement.className = "tasks";
	var spanElementForCheckBox = document.createElement("SPAN");
	spanElementForCheckBox.className = "checkBox";
	divElement.appendChild(spanElementForCheckBox);
	var innerDivElement = document.createElement("DIV");
	innerDivElement.className = "taskTitle";
	var spanElement = document.createElement("SPAN");
	var textElement = document.createTextNode(taskInput.value);
	spanElement.appendChild(textElement);
	innerDivElement.appendChild(spanElement);
	divElement.appendChild(innerDivElement);
	document.getElementById("tasksContainer").appendChild(divElement);
	taskInput.value = "";
}

function addClickEventInLeftListTitle(element) {
	element.addEventListener("click", function(event) {
		var activeListId = event.target.id;
		activeList = collectionOfList.find(list => list.id === activeListId);
		document.getElementById("displayListTitle").innerHTML = activeList.name;
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
