var collectionOfList = [];
var activeList;
var activeTask;

function getDiv() {
    return document.createElement("DIV");
}

function getSpan() {
    return document.createElement("SPAN");
}

function setElementAsEmpty(element) {
    element.innerHTML = "";
}

function getUndeletedObjects(array) {
    return array.filter(object => object.status === true);
}

function getListDiv(list) {
    var divElement = getDiv();
    addClickEventInLeftListTitle(divElement);
    divElement.id = list.id;
    divElement.className = "leftPanelContent";
    return divElement;
}

function getListIcon(list) {
    var iElement = document.createElement("I");
    iElement.className = "fa fa-list";
    iElement.id = list.id;
    return iElement;
}

function getListInnerDiv(list) {
    var divElement = getDiv();
    divElement.className = "leftPanelTitle blue bold";
    divElement.id = list.id;
    return divElement;
}

function getSpanWithTextNode(object) {
    var spanElement = getSpan();
    spanElement.id = object.id;
    let textElement = document.createTextNode(object.name);
    spanElement.appendChild(textElement);
    return spanElement;
}

function getUnfinishedObjectFromArray(array) {
    return array.filter(object => object.isFinished === false);
}

function setUnfinishedTaskCountInDiv(list, div) {
    var unFinishedTasksLength = getUnfinishedObjectFromArray(list.tasks).length;
    if(unFinishedTasksLength > 0) {
        var spanElementForTaskCount = getSpan();
        spanElementForTaskCount.id = list.id;
        spanElementForTaskCount.className = "taskCount";
        var CountTextElement = document.createTextNode(unFinishedTasksLength);
        spanElementForTaskCount.appendChild(CountTextElement);
        div.appendChild(spanElementForTaskCount);
    }
}

function loadLists() {
    var listContainer = document.getElementById("sideList");
    setElementAsEmpty(listContainer);
    var unDeletedList = getUndeletedObjects(collectionOfList);
    for (listIndex in unDeletedList) {
        let list = unDeletedList[listIndex];
        let divElement = getListDiv(list);
        let iElement = getListIcon(list);
        divElement.appendChild(iElement);
        let innerDivElement = getListInnerDiv(list);
        let spanElement = getSpanWithTextNode(list);
        innerDivElement.appendChild(spanElement);
        setUnfinishedTaskCountInDiv(list, innerDivElement);
        divElement.appendChild(innerDivElement);
        listContainer.appendChild(divElement);
    }
}

/**
 * Adds Event Listner for Trash Icon 
 */
document.getElementById("trashListIcon").addEventListener("click", function() {
    if(confirm("Are you want to delete" + activeList.name)){
        activeList.status = false;
        loadTasks();
    }
});

function getIndexOfList(list) {
    return list === activeList;
}

function setActiveListName() {
    if(activeList.status === true) {
        document.getElementById("displayListTitle").innerHTML = activeList.name;
    } else { //TODO change default list as "Task"
        document.getElementById("displayListTitle").innerHTML = "Tasks";
        activeList = "";
        document.getElementById("taskDetails").style.display = "none";
        /*var previousListIndex = collectionOfList.findIndex(getIndexOfList) - 1;
        activeList = collectionOfList[previousListIndex];
        document.getElementById("displayListTitle").innerHTML = activeList.name;*/
    }
}

function getTaskDiv(task) {
    var divElement = getDiv();
    addClickEventInTask(divElement);
    divElement.className = "tasks";
    divElement.id = task.id;
    return divElement;
}

function getTaskCheckBox(task) {
    var checkBoxDiv = getDiv();
    checkBoxDiv.className = "checkBox";
    var checkBox = document.createElement("INPUT");
    checkBox.type = "checkbox";
    checkBox.id = "taskCheckBox" + task.id;
    checkBox.name = task.id;
    if(task.isFinished) {
        checkBox.checked = true;
    } else {
        checkBox.checked = false;
    }
    addEventListenerForCheckBox(checkBox);
    var label = document.createElement("LABEL");
    label.htmlFor = "taskCheckBox" + task.id;
    checkBoxDiv.appendChild(checkBox);
    checkBoxDiv.appendChild(label);
    return checkBoxDiv;
}

function getTaskInnerDiv(task) {
    var divElement = getDiv();
    divElement.className = "taskTitle";
    divElement.id = task.id;
    return divElement;
}

function changeSpanClassNameByTask(task, spanElement) {
    if(task.isFinished) {
        spanElement.className = "finished";
    } else {
        spanElement.classList.remove("finished");
    }
}

function setStepsCountInDiv(task, div) {
    var stepCount = getUndeletedObjects(task.steps).length;
    if(stepCount > 0) {
        let finishedStepCount = task.steps.filter(step => step.isFinished === true).length;
        let spanStepCount = getSpan();
        let textStepCount = document.createTextNode(finishedStepCount + " of " + stepCount);
        spanStepCount.appendChild(textStepCount);
        div.appendChild(spanStepCount);
    }
}

function loadTasks() {
    setActiveListName();
    var taskContainer = document.getElementById("tasksContainer");
    setElementAsEmpty(taskContainer);
    for (taskIndex in activeList.tasks) {
        let task = activeList.tasks[taskIndex];
        let divElement = getTaskDiv(task);
        let checkBoxDiv = getTaskCheckBox(task);
        divElement.appendChild(checkBoxDiv);
        let innerDivElement = getTaskInnerDiv(task);
        let spanElement = getSpanWithTextNode(task);
        changeSpanClassNameByTask(task, spanElement);
        innerDivElement.appendChild(spanElement);
        setStepsCountInDiv(task, innerDivElement);
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
    var undeletedSteps = getUndeletedObjects(activeTask.steps);
    for (stepIndex in undeletedSteps) {
        let step = undeletedSteps[stepIndex];
        let divElement = getDiv();
        divElement.className = "step";
        let checkBoxDiv = getDiv();
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
        let innerDivElement = getDiv();
        innerDivElement.className = "stepTitle";
        let spanElement = getSpan();
        let textElement = document.createTextNode(step.name);
        let spanElementForDeletion = getSpan();
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
