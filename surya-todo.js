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
	if(event.keyCode == 13) {
		createNewListInLeftPanel(listInput);
	}
});

//assign id for created list
var listId = 1;
function createNewListInLeftPanel(listName) {
	var listContainer = document.getElementById("sideList");
	var divElement = document.createElement("DIV");
	divElement.id = "list" + listId++;
	divElement.className = "leftPanelContent";
	var iElement = document.createElement("I");
	iElement.className = "fa fa-list";
	divElement.appendChild(iElement);
	var innerDivElement = document.createElement("DIV");
	innerDivElement.className = "leftPanelTitle blue bold";
	var spanElement = document.createElement("SPAN");
	var textElement = document.createTextNode(listName.value);
	spanElement.appendChild(textElement);
	innerDivElement.appendChild(spanElement);
	divElement.appendChild(innerDivElement);
	listContainer.appendChild(divElement);
	listName.value = "";
}


