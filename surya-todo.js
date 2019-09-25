var collectionOfList = [];
var activeList;
var activeTask;

function loadLists() {
    var listContainer = document.getElementById("sideList");
    listContainer.innerHTML = "";
    var unDeletedList = collectionOfList.filter(list => list.status === true);
    for (listIndex in unDeletedList) {
        let list = unDeletedList[listIndex];
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
        let unFinishedTasksLength = list.tasks.filter(task => task.isFinished === false).length;
        if(unFinishedTasksLength > 0) {
            let spanElementForTaskCount = document.createElement("SPAN");
            spanElementForTaskCount.id = list.id;
            spanElementForTaskCount.className = "taskCount";
            let CountTextElement = document.createTextNode(unFinishedTasksLength);
            spanElementForTaskCount.appendChild(CountTextElement);
            innerDivElement.appendChild(spanElementForTaskCount);
        }
        divElement.appendChild(innerDivElement);
        listContainer.appendChild(divElement);
    }
}

document.getElementById("trashListIcon").addEventListener("click", function() {
    if(confirm("Are you want to delete" + activeList.name)){
        activeList.status = false;
        loadTasks();
    }
});

function getIndexOfList(list) {
    return list === activeList;
}

function loadTasks() {
    
    if(activeList.status === true) {
        document.getElementById("displayListTitle").innerHTML = activeList.name;
    } else {
        document.getElementById("displayListTitle").innerHTML = "Tasks";
        document.getElementById("tasksContainer").innerHTML = "";
        /*var previousListIndex = collectionOfList.findIndex(getIndexOfList) - 1;
        activeList = collectionOfList[previousListIndex];

        document.getElementById("displayListTitle").innerHTML = activeList.name;*/
    }
    var taskContainer = document.getElementById("tasksContainer");
    taskContainer.innerHTML = "";
    for (taskIndex in activeList.tasks) {
        let task = activeList.tasks[taskIndex];
        let divElement = document.createElement("DIV");
        addClickEventInTask(divElement);
        divElement.className = "tasks";
        divElement.id = task.id;
        let checkBoxDiv = document.createElement("DIV");
        checkBoxDiv.className = "checkBox";
        let checkBox = document.createElement("INPUT");
        checkBox.type = "checkbox";
        checkBox.id = "input" + task.id;
        checkBox.name = task.id;
        addEventListenerForCheckBox(checkBox);
        let label = document.createElement("LABEL");
        label.htmlFor = "input" + task.id;
        checkBoxDiv.appendChild(checkBox);
        checkBoxDiv.appendChild(label);
        divElement.appendChild(checkBoxDiv);
        let innerDivElement = document.createElement("DIV");
        innerDivElement.className = "taskTitle";
        innerDivElement.id = task.id;
        let spanElement = document.createElement("SPAN");
        if(task.isFinished) {
            checkBox.checked = true;
            spanElement.className = "finished";
        } else {
            checkBox.checked = false;
            spanElement.classList.remove("finished");
        }
        spanElement.id = task.id;
        let textElement = document.createTextNode(task.name);
        spanElement.appendChild(textElement);
        innerDivElement.appendChild(spanElement);
        let stepCount = task.steps.filter(step => step.status === true).length;
        console.log(stepCount);
        if(stepCount > 0) {
            let finishedStepCount = task.steps.filter(step => step.isFinished === true).length;
            let spanStepCount = document.createElement("SPAN");
            let textStepCount = document.createTextNode(finishedStepCount + " of " + stepCount);
            spanStepCount.appendChild(textStepCount);
            innerDivElement.appendChild(spanStepCount);
        }
        divElement.appendChild(innerDivElement);
        taskContainer.appendChild(divElement);
    }
    loadLists();
}

var rightPanelCheckBox = document.getElementById("checkbox");
rightPanelCheckBox.addEventListener("change", function(event) {
    if(this.checked) {
        rightPanelCheckBox.checked = true;
        activeTask.isFinished = true;
    } else {
        rightPanelCheckBox.checked = false;
        activeTask.isFinished = false;
    }
    loadSteps();
    loadTasks();
});


function addEventListenerForCheckBox(element) {
    element.addEventListener("change", function(event){
        var taskId = event.target.name;
        var task = activeList.tasks.find(task => task.id === taskId);
        if(this.checked) {
            var taskId = event.target.name;
            var task = activeList.tasks.find(task => task.id === taskId);
            task.isFinished = true;
        } else {
            task.isFinished = false;
        }
        loadTasks();
        loadSteps();
    });
}

function addEventListenerForStepCheckBox(element) {
    element.addEventListener("change", function(event){
        var stepId = event.target.name;
        var step = activeTask.steps.find(step => step.id === stepId);
        if(this.checked) {
            step.isFinished = true;
        } else {
            step.isFinished = false;
        }
        loadSteps();
        loadTasks();
    });
}

function loadSteps() {
    var taskTitle = document.getElementById("taskName");
    taskTitle.innerHTML = activeTask.name;
    if(activeTask.isFinished) {
        taskTitle.className = "finished";
        rightPanelCheckBox.checked = true;
    } else {
        taskTitle.classList.remove("finished");
        rightPanelCheckBox.checked = false;
    }
    var stepContainer = document.getElementById("stepsContainer");
    stepContainer.innerHTML = "";
    var undeletedSteps = activeTask.steps.filter(step => step.status === true);
    for (stepIndex in undeletedSteps) {
        let step = undeletedSteps[stepIndex];
        let divElement = document.createElement("DIV");
        divElement.className = "step";
        let checkBoxDiv = document.createElement("DIV");
        checkBoxDiv.className = "checkBox";
        let checkBox = document.createElement("INPUT");
        checkBox.type = "checkbox";
        checkBox.id = "input" + step.id;
        checkBox.name = step.id;
        addEventListenerForStepCheckBox(checkBox);
        let label = document.createElement("LABEL");
        label.htmlFor = "input" + step.id;
        checkBoxDiv.appendChild(checkBox);
        checkBoxDiv.appendChild(label);
        divElement.appendChild(checkBoxDiv);
        let innerDivElement = document.createElement("DIV");
        innerDivElement.className = "stepTitle";
        let spanElement = document.createElement("SPAN");
        let textElement = document.createTextNode(step.name);
        let spanElementForDeletion = document.createElement("SPAN");
        spanElementForDeletion.className = "deletion";
        spanElementForDeletion.id = step.id;
        addEventListenerForStepDeletion(spanElementForDeletion);
        let textElementForDeletion = document.createTextNode("x");
        if(step.isFinished) {
            checkBox.checked = true;
            spanElement.className = "finished";
        } else {
            checkBox.checked = false;
            spanElement.classList.remove("finished");
        }
        spanElementForDeletion.appendChild(textElementForDeletion);
        spanElement.appendChild(textElement);
        innerDivElement.appendChild(spanElement);
        innerDivElement.appendChild(spanElementForDeletion);
        divElement.appendChild(innerDivElement);
        stepContainer.appendChild(divElement);
    }
}

document.getElementById("sideBarButton").addEventListener("click", function() {
    if ("50px" == document.getElementById("sideMenu").style.width) {
        openLeftPanel();
    } else {
        closeLeftPanel();
    }
});

function addEventListenerForStepDeletion(element) {
    element.addEventListener("click", function(event) {
        if(confirm("Are you sure want to delete step")) {
            var stepId = event.target.id;
            var step = activeTask.steps.find(step => step.id === stepId);
            step.status = false;
            loadSteps();
            loadTasks();
        }
    });
}

function closeLeftPanel() {
    document.getElementById("sideMenu").style.width = "50";
    document.getElementById("listInput").style.display = "none";
    var leftPanelTitle = document.getElementsByClassName("leftPanelTitle");
    for (let i = 0; i < leftPanelTitle.length; i++) {
        leftPanelTitle[i].style.display = "none";
    }
}

function openLeftPanel() {
    document.getElementById("sideMenu").style.width = "290";
    document.getElementById("listInput").style.display = "inline-block";
    var leftPanelTitle = document.getElementsByClassName("leftPanelTitle");
    for (let i = 0; i < leftPanelTitle.length; i++) {
        leftPanelTitle[i].style.display = "inline-block";
    }
}

var listInput = document.getElementById("listInput");
listInput.addEventListener("keydown", function(event) {
    if (listInput.value != "") {
        if (event.keyCode == 13) {
            createList(listInput);
        }
    }
});

function createList(listInput) {
    var list = new Object();
    list.id = create_UUID();
    list.name = listInput.value;
    list.tasks = [];
    list.status = true;
    collectionOfList.push(list);
    activeList = list;
    document.getElementById("displayListTitle").innerHTML = listInput.value;
    listInput.value = "";
    loadLists();
    document.getElementById("tasksContainer").innerHTML = "";
}

var taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function(event) {
    if (taskInput.value != "") {
        if (event.keyCode == 13) {
            createTask(taskInput);
        }
    }
});

var stepInput = document.getElementById("stepInput");
stepInput.addEventListener("keydown", function(event) {
    if (stepInput.value != "") {
        if (event.keyCode == 13) {
            createStep(stepInput);
        }
    }
});

function createTask(taskInput) {
    var task = new Object();
    task.id = create_UUID();
    task.name = taskInput.value;
    task.steps = [];
    task.isFinished = false;
    activeList.tasks.push(task);
    taskInput.value = "";
    loadTasks();
}

function createStep(stepInput) {
    var step = new Object();
    step.id = create_UUID();
    step.name = stepInput.value;
    step.isFinished = false;
    step.status = true;
    activeTask.steps.push(step);
    stepInput.value = "";
    loadSteps();
    loadTasks();
}

function addClickEventInTask(element) {
    element.addEventListener("click", function(event) {
        if(event.target.tagName === 'INPUT') {
            var activeTaskId = event.target.name;
        } else {
            var activeTaskId = event.target.id;
        }
        activeTask = activeList.tasks.find(task=>task.id === activeTaskId);
        if(typeof activeTask !== 'undefined') {
            document.getElementById("taskDetails").style.display = "block";
            loadSteps();
        }
    });
}

function addClickEventInLeftListTitle(element) {
    element.addEventListener("click", function(event) {
        var activeListId = event.target.id;
        activeList = collectionOfList.find(list=>list.id === activeListId);
        document.getElementById("taskDetails").style.display = "none";
        loadTasks();
    });
}

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
