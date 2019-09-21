var collectionOfList = [];

var list = {
	name : "",
	tasks : []
};

var task = {
	name : "",
	steps : []
};

var step = {
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

//assign id for created list
var listId = 1;
function createNewListInLeftPanel(listInput) {
	var list = new Object();
	list.name = listInput.value;
	collectionOfList.push(list);
	var listContainer = document.getElementById("sideList");
	var divElement = document.createElement("DIV");
	addClickEventInLeftListTitle(divElement);
	divElement.id = "list" + listId++;
	divElement.className = "leftPanelContent";
	var iElement = document.createElement("I");
	iElement.className = "fa fa-list";
	divElement.appendChild(iElement);
	var innerDivElement = document.createElement("DIV");
	innerDivElement.className = "leftPanelTitle blue bold";
	var spanElement = document.createElement("SPAN");
	var textElement = document.createTextNode(listInput.value);
	spanElement.appendChild(textElement);
	innerDivElement.appendChild(spanElement);
	divElement.appendChild(innerDivElement);
	listContainer.appendChild(divElement);
	listInput.value = "";
}

function addClickEventInLeftListTitle(element) {
	element.addEventListener("click", function(event) {
		document.getElementById("displayListTitle").innerHTML = event.target.textContent;
	});
}

