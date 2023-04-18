import { allTasks } from './asideBtnAllTasks.js'
import { allImportantTasks } from './asideBtnImportant.js'
import { component, allTasksContainer, formTasksBtns, formTaskContainer } from './index.js'
import { addTask, projects } from './newProject.js'
import { projectIndex } from './newProject.js'
import { differenceInCalendarDays, format } from 'date-fns'
import { todayTasks, todayTasksNames } from './asideBtnToday.js'
import { allWeekTasks, allWeekTasksNames } from './asideBtnWeek.js'



class newTask {
    constructor(task, description, date, priority, relProject) {
        this.task = task,
            this.description = description,
            this.date = date,
            this.priority = priority
        this.relProject = relProject
    }
    getTaskProject() {
        return this.relProject
    }
}

export function addTaskTask() {
    let formTaskInputs = [...document.querySelectorAll('.formInput')]
    let title = formTaskInputs[0].value
    let descr = formTaskInputs[1].value
    let dateValue = formTaskInputs[2].value


    let datedate = new Date(dateValue)
    console.log(datedate)
    let dif = differenceInCalendarDays(datedate, new Date())
    console.log(dif)
    datedate = format(datedate, 'yyyy/MM/dd')

    let prior
    function displayRadioValue() {
        var ele = [...document.querySelectorAll('.inputRadio')];
        console.log(ele)
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                prior = ele[i].value
                console.log(`${ele[i].value} is checked`)
            }
        }
    }
    displayRadioValue()

    let relproject = projects[projectIndex].projectName
    let newTask1 = new newTask(title, descr, datedate, prior, relproject)
    /*Proba for addTask function start*/
    addTask(projects[projectIndex], newTask1)
    /*Proba for addTask function end*/

    //start/ CHANGES AFTER MAKING CHANGE VERSION 1.4 (newProject.js)
    //CHANGE VERSION 1.5
    localStorage.removeItem('projectsArray')
    localStorage.setItem('projectsArray', JSON.stringify(projects))

    /*Original start*/
    // projects[projectIndex].addTask(newTask1)
    /*Original end*/

    console.log(`Prior = ${prior}`)

    // localStorage.removeItem('projectsArray')
    // localStorage.setItem('projectsArray', JSON.stringify(projects))
    // console.log(JSON.parse(localStorage.getItem('projectsArray')))

    if (prior === 'high' && dif == 0) {
        allImportantTasks.push(newTask1)
        todayTasks.push(newTask1)
        addToAllTasks(newTask1)
    } else if (prior === 'high' && (dif > 0 && dif <= 7)) {
        allImportantTasks.push(newTask1)
        allWeekTasks.push(newTask1)
        allTasks.push(newTask1)
    } else if (dif > 0 && dif <= 7) {
        allWeekTasks.push(newTask1)
        allTasks.push(newTask1)
    } else if (dif == 0) {
        todayTasks.push(newTask1)
        allTasks.push(newTask1)
    } else if (dif > 7 && prior === 'high') {
        allImportantTasks.push(newTask1)
        allTasks.push(newTask1)
    } else if (dif > 7 && prior === 'low') {
        allTasks.push(newTask1)
    } else return

    // allTasks.push(newTask1)
    renderTask(projectIndex)
    clearInputs()
    //start/ CHANGES AFTER MAKING CHANGE VERSION 1.1 (asideBtnAllTasks.js)
    //CHANGE VERSION 1.2
    localStorage.setItem('AllTasks', JSON.stringify(allTasks))
    localStorage.setItem('AllImpTasks', JSON.stringify(allImportantTasks))
    localStorage.setItem('AllWeekTasks', JSON.stringify(allWeekTasks))
    localStorage.setItem('AllTodayTasks', JSON.stringify(todayTasks))
    //end/ CHANGES AFTER MAKING CHANGE VERSION 1.1 (asideBtnAllTasks.js)

}
function addToAllTasks(t) {
    allTasks.push(t)
    console.log('added to all tasks')
}
function clearInputs() {
    const form = document.querySelector('.theForm')
    form.reset()
}

export function renderTask(index) {
    let projectTasks = projects[index].tasks

    if (projectTasks.length == 0) {
        console.log('No tasks')
        allTasksContainer.innerHTML = ''
    } else {
        console.log('New task is added')
        allTasksContainer.innerHTML = ''
        for (let i = 0; i < projectTasks.length; i++) {
            let taskN = component('div', 'taskN', allTasksContainer)
            let taskName = component('div', 'taskName', taskN)
            taskName.innerText = projectTasks[i].task
            let taskDescr = component('button', 'taskDescr', taskN)
            // taskDescr.innerText = projectTasks[i].description
            taskDescr.innerText = 'Description'

            //changes 2.2 18/04 START
            let taskDescrDescriptionProj = component('div', 'taskDescrDescription', taskN)
            taskDescrDescriptionProj.style.display = 'none'
            let taskDescrContainerProj = component('div', 'taskDescrContainer', taskDescrDescriptionProj)
            let taskDescrDescriptionTextProj = component('div', 'taskDescrDescriptionText', taskDescrContainerProj)
            taskDescrDescriptionTextProj.innerHTML = projectTasks[i].description
            let closeDescription = component('button', 'closeDescription', taskDescrContainerProj)
            closeDescription.innerHTML = 'Close Description'
            closeDescription.addEventListener('click', () => taskDescrDescriptionProj.style.display = 'none')


            taskDescr.addEventListener('click', () => {
                taskDescrDescriptionProj.style.display = 'flex'
                if (projectTasks[i].description.length == 0) {
                    taskDescrDescriptionTextProj.innerHTML = 'No description'
                    console.log('no description')
                } else {
                    taskDescrDescriptionTextProj.innerHTML = projectTasks[i].description
                    console.log(obj.description)
                }
            })
            //changes 2.2 18/04 end

            let taskDate = component('div', 'taskDate', taskN)
            taskDate.innerText = projectTasks[i].date
            let taskPriority = component('div', 'taskPriority', taskN)
            taskPriority.innerText = projectTasks[i].priority

            // console.log(nameOfTask)
            let deleteTask = component('button', 'deleteTask', taskN)
            deleteTask.innerText = 'Delete'
            deleteTask.addEventListener('click', () => {
                let nameOfTask = projectTasks[i].task
                console.log(nameOfTask)
                deleteTaskB(projectTasks, i, index)
                deleteFromAllTasks(allTasks, i)
                deleteTheDeletedTasks(allImportantTasks, nameOfTask)
                deleteTheDeletedTasks(allWeekTasks, nameOfTask)
                deleteTheDeletedTasks(todayTasks, nameOfTask)
            })

            formTaskContainer.style.display = 'none'
        }
    }
}
formTasksBtns[0].addEventListener('click', (evt) => {
    evt.preventDefault();
    // console.log('hi')
    addTaskTask()
    clearInputs()
})
formTasksBtns[1].addEventListener('click', () => {
    clearInputs()
    formTaskContainer.style.display = 'none'
})

function deleteTaskB(array, indexx, projectIndex) {
    array.splice(indexx, 1)
    renderTask(projectIndex)
}
function deleteFromAllTasks(array, ind) {
    array.splice(ind, 1)
    console.log('the clicked task was deleted from All Tasks')
    console.log(array)
}
function deleteTheDeletedTasks(arr, delTask) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].task === delTask) {
            arr.splice(i, 1)
            i = i - 1
        }
        console.log(arr[i])
    }
    console.log('this is the deleteTheDeletedTasks function')
    console.log(arr)
    return arr
}
