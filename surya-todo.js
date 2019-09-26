var collectionOfList = [];
var activeList;
var activeTask;

init();

function init() {
    addEventListener(getElementById("sideBarButton"), "click", sidePanelOperation);
    addEventListener(getElementById("trashListIcon"), "click", deleteOperationForList);
    addEventListener(getElementById("checkbox"), "change", checkOperationForSteps);
    addEventListener(getElementById("stepInput"), "keydown", stepInputBoxOperation);
    addEventListener(getElementById("taskInput"), "keydown", taskInputOperation);
    addEventListener(getElementById("listInput"), "keydown", listInputOperation);
}

/**
 * 
 * @param {*} element 
 * @param {*} event 
 * @param {*} functionName 
 */
function addEventListener(element, event, functionName) {
    element.addEventListener(event, functionName);
}

/**
 * 
 * @param {*} parentChild 
 * @param {*} childElement 
 */
function appendParentAndChild(parentChild, childElement) {
    parentChild.appendChild(childElement);
}

/**
 * 
 * @param {*} elementId 
 */
function getElementById(elementId) {
    return document.getElementById(elementId);
}

/**
 * 
 * @param {*} elementName 
 */
function createElementByString(elementName) {
    return document.createElement(elementName);
}

/**
 * 
 * @param {*} element 
 */
function setElementAsEmpty(element) {
    element.innerHTML = "";
}

/**
 * 
 * @param {*} array 
 */
function getUndeletedObjects(array) {
    return array.filter(object => object.status === true);
}

/**
 * 
 * @param {*} list 
 */
function getListDiv(list) {
    var divElement = createElementByString("DIV");
    addEventListener(divElement, "click", listOperation);
    divElement.id = list.id;
    divElement.className = "leftPanelContent";
    return divElement;
}

/**
 * 
 * @param {*} list 
 */
function getListIcon(list) {
    var iElement = document.createElement("I");
    iElement.className = "fa fa-list";
    iElement.id = list.id;
    return iElement;
}

/**
 * 
 * @param {*} list 
 */
function getListInnerDiv(list) {
    var divElement = createElementByString("DIV");
    divElement.className = "leftPanelTitle blue bold";
    divElement.id = list.id;
    return divElement;
}

/**
 * 
 * @param {*} object 
 */
function getSpanWithTextNode(object) {
    var spanElement = createElementByString("SPAN");
    spanElement.id = object.id;
    let textElement = document.createTextNode(object.name);
    spanElement.appendChild(textElement);
    return spanElement;
}

/**
 * 
 * @param {*} array 
 */
function getUnfinishedObjectFromArray(array) {
    return array.filter(object => object.isFinished === false);
}

/**
 * 
 * @param {*} list 
 * @param {*} div 
 */
function setUnfinishedTaskCountInDiv(list, div) {
    var unFinishedTasksLength = getUnfinishedObjectFromArray(list.tasks).length;
    if(unFinishedTasksLength > 0) {
        var spanElementForTaskCount = createElementByString("SPAN");
        spanElementForTaskCount.id = list.id;
        spanElementForTaskCount.className = "taskCount";
        var CountTextElement = document.createTextNode(unFinishedTasksLength);
        spanElementForTaskCount.appendChild(CountTextElement);
        div.appendChild(spanElementForTaskCount);
    }
}

/**
 * 
 */
function loadLists() {
    var listContainer = getElementById("sideList");
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
 * Soft Delete the Active List
 */
function deleteOperationForList() {
    if(confirm("Are you want to delete" + activeList.name)){
        activeList.status = false;
        loadTasks();
    }
}

/**
 * 
 * @param {*} list 
 */
function getIndexOfList(list) {
    return list === activeList;
}

/**
 * 
 */
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

/**
 * 
 * @param {*} task 
 */
function getTaskDiv(task) {
    var divElement = createElementByString("DIV");
    addEventListener(divElement, "click", taskClickOperation)
    divElement.className = "tasks";
    divElement.id = task.id;
    return divElement;
}

/**
 * 
 * @param {*} task 
 */
function getTaskCheckBox(task) {
    var checkBoxDiv = createElementByString("DIV");
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
    addEventListener(checkBox, "change", changeOperationForTaskCheckBox);
    var label = document.createElement("LABEL");
    label.htmlFor = "taskCheckBox" + task.id;
    checkBoxDiv.appendChild(checkBox);
    checkBoxDiv.appendChild(label);
    return checkBoxDiv;
}

/**
 * 
 * @param {*} task 
 */
function getTaskInnerDiv(task) {
    var divElement = createElementByString("DIV");
    divElement.className = "taskTitle";
    divElement.id = task.id;
    return divElement;
}

/**
 * 
 * @param {*} task 
 * @param {*} spanElement 
 */
function changeSpanClassNameByTask(task, spanElement) {
    if(task.isFinished) {
        spanElement.className = "finished";
    } else {
        spanElement.classList.remove("finished");
    }
}

/**
 * 
 * @param {*} task 
 * @param {*} div 
 */
function setStepsCountInDiv(task, div) {
    var stepCount = getUndeletedObjects(task.steps).length;
    if(stepCount > 0) {
        let finishedStepCount = task.steps.filter(step => step.isFinished === true).length;
        let spanStepCount = createElementByString("SPAN");
        let textStepCount = document.createTextNode(finishedStepCount + " of " + stepCount);
        spanStepCount.appendChild(textStepCount);
        div.appendChild(spanStepCount);
    }
}

/**
 * 
 */
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

/**
 * 
 */
function checkOperationForSteps() {
    if(this.checked) {
        this.checked = true;
        activeTask.isFinished = true;
    } else {
        this.checked = false;
        activeTask.isFinished = false;
    }
    loadSteps();
    loadTasks();
}

/**
 * 
 * @param {*} event 
 */
function changeOperationForTaskCheckBox(event) {
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
}

/**
 * 
 */
function changeOperationForStepCheckBox() {
    var stepId = event.target.name;
    var step = activeTask.steps.find(step => step.id === stepId);
    if(this.checked) {
        step.isFinished = true;
    } else {
        step.isFinished = false;
    }
    loadSteps();
    loadTasks();
}

/**
 * 
 */
function toggleTaskTitle(taskTitle) {
    if(activeTask.isFinished) {
        taskTitle.className = "finished";
        getElementById("checkbox").checked = true;
    } else {
        taskTitle.classList.remove("finished");
        getElementById("checkbox").checked = false;
    }
}

/**
 * 
 */
function getStepDiv() {
    var divElement = createElementByString("DIV");
    divElement.className = "step";
    return divElement;
}

/**
 * 
 * @param {*} step 
 */
function getCheckBoxDivWithCheckBox(step) {
    var checkBoxDiv = createElementByString("DIV");
    checkBoxDiv.className = "checkBox";
    var checkBox = document.createElement("INPUT");
    checkBox.type = "checkbox";
    checkBox.id = "stepId" + step.id;
    checkBox.name = step.id;
    addEventListener(checkBox, "change", changeOperationForStepCheckBox);
    var label = document.createElement("LABEL");
    label.htmlFor = "stepId" + step.id;
    checkBoxDiv.appendChild(checkBox);
    checkBoxDiv.appendChild(label);
    if(step.isFinished) {
        checkBox.checked = true;
    } else {
        checkBox.checked = false;
    }
    return checkBoxDiv;
}

/**
 * 
 */
function getStepInnerDiv() {
    var divElement = createElementByString("DIV");
    divElement.className = "stepTitle";
    return divElement;
}

/**
 * 
 * @param {*} step 
 */
function getStepSpanWithName(step) {
    let spanElement = createElementByString("SPAN");
    let textElement = document.createTextNode(step.name);
    spanElement.appendChild(textElement);
    if(step.isFinished) {
        spanElement.className = "finished";
    } else {
        spanElement.classList.remove("finished");
    }
    return spanElement;
}

/**
 * 
 * @param {*} step 
 */
function getSpanForDeletion(step) {
    let spanElementForDeletion = createElementByString("SPAN");
    spanElementForDeletion.className = "deletion";
    spanElementForDeletion.id = step.id;
    addEventListener(spanElementForDeletion, "click", stepDeletionOperation)
    let textElementForDeletion = document.createTextNode("x");
    spanElementForDeletion.appendChild(textElementForDeletion);
    return spanElementForDeletion;
}

/**
 * 
 */
function loadSteps() {
    var taskTitle = getElementById("taskName");
    taskTitle.innerHTML = activeTask.name;
    toggleTaskTitle(taskTitle);
    var stepContainer = getElementById("stepsContainer");
    setElementAsEmpty(stepContainer);
    var undeletedSteps = getUndeletedObjects(activeTask.steps);
    for (stepIndex in undeletedSteps) {
        let step = undeletedSteps[stepIndex];
        let divElement = getStepDiv();
        let checkBoxDiv = getCheckBoxDivWithCheckBox(step);
        divElement.appendChild(checkBoxDiv);
        let innerDivElement = getStepInnerDiv();
        let spanElement = getStepSpanWithName(step);
        let spanElementForDeletion = getSpanForDeletion(step);
        innerDivElement.appendChild(spanElement);
        innerDivElement.appendChild(spanElementForDeletion);
        divElement.appendChild(innerDivElement);
        stepContainer.appendChild(divElement);
    }
}

function sidePanelOperation() {
    if ("50px" == getElementById("sideMenu").style.width) {
        openLeftPanel();
    } else {
        closeLeftPanel();
    }
}

/**
 * 
 * @param {*} event 
 */
function stepDeletionOperation(event) {
    if(confirm("Are you sure want to delete step")) {
        var stepId = event.target.id;
        var step = activeTask.steps.find(step => step.id === stepId);
        step.status = false;
        loadSteps();
        loadTasks();
    }
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

/**
 * 
 * @param {*} event 
 */
function listInputOperation(event) {
    if (this.value != "") {
        if (event.keyCode == 13) {
            createList(listInput);
        }
    }
}

/**
 * 
 * @param {*} listInput 
 */
function createList(listInput) {
    var list = new Object();
    list.id = create_UUID();
    list.name = listInput.value;
    list.tasks = [];
    list.status = true;
    collectionOfList.push(list);
    activeList = list;
    getElementById("displayListTitle").innerHTML = listInput.value;
    listInput.value = "";
    setElementAsEmpty(getElementById("tasksContainer"));
    loadLists();
}

/**
 * 
 * @param {*} event 
 */
function taskInputOperation(event) {
    if (this.value != "") {
        if (event.keyCode == 13) {
            createTask(taskInput);
        }
    }
}

/**
 * 
 * @param {*} event 
 */
function stepInputBoxOperation(event) {
    if (this.value != "") {
        if (event.keyCode == 13) {
            createStep(stepInput);
        }
    }
}

/**
 * 
 * @param {*} taskInput 
 */
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

/**
 * 
 * @param {*} stepInput 
 */
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

/**
 * 
 * @param {*} event 
 */
function taskClickOperation(event) {
    if(event.target.tagName === 'INPUT') {
        var activeTaskId = event.target.name;
    } else {
        var activeTaskId = event.target.id;
    }
    activeTask = activeList.tasks.find(task=>task.id === activeTaskId);
    if(typeof activeTask !== 'undefined') {
        getElementById("taskDetails").style.display = "block";//TODO
        loadSteps();
    }
}

/**
 * 
 */
function listOperation() {
    activeList = collectionOfList.find(list=>list.id === event.target.id);
    getElementById("taskDetails").style.display = "none";//TODO
    loadTasks();
}

/**
 * Creates UUID()
 */
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
