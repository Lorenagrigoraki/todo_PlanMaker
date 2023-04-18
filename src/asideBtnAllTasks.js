import { tasksHomeAside, allTasksContainer, titleAllTasks } from './index.js'
import { component } from './index.js'
import { projects } from './newProject.js'
import { allTodayPage, todayTOF, todayTasks } from './asideBtnToday.js'
import { impTOF } from './asideBtnImportant.js'
import { weekTOF } from './asideBtnWeek.js'
import { allWeekTasks } from './asideBtnWeek.js'
import { allImportantTasks } from './asideBtnImportant.js'

export let allTasks = []
// localStorage.setItem('AllTasks',JSON.stringify(allTasks))
// let allTasksLocal = localStorage.getItem('AllTasks')
// console.log(allTasksLocal) allTOF
export let TOF = [true, false, false, false] /*[allTasks, todayTOF,allWeekTasks, allImportantTasks]*/

let deletedTaskName, deletedTaskProjectName /*changes*/
// export let allTasksPage = true /*changes*/

const allTasksBtn = tasksHomeAside[0]
allTasksBtn.addEventListener('click', () => {
    for (let i = 0; i < 4; i++) {
        TOF[i] = false
        if (i == 0) {
            TOF[i] = true
        }
    }
    console.log('TOF all Tasks')
    console.log(TOF)
    allTasksBtn.style.background = '#d14334'

    tasksHomeAside.forEach((el, i) => {
        if (i != 0) {
            el.style.background = '#028f76'
        }
    })
    console.log(allTasks)

    titleAllTasks.innerHTML = allTasksBtn.innerHTML
    console.log('The All Tasks btn was clicked')

    console.log(allTasks)
    if (allTasks.length == 0) {
        console.log('No tasks yet')
        allTasksContainer.innerHTML = ''
    } else {
        renderAllTasks(allTasks)
    }
    // //CHANGES!!
    // allTasks = JSON.parse(localStorage.getItem('AllTasks'))
})
console.log(todayTasks)
export function renderAllTasks(array) {
    allTasksContainer.innerHTML = ''
    array.forEach((obj, ii, array) => {
        let task = component('div', 'task', allTasksContainer)

        let pName = component('div', 'pName', task)
        pName.innerText = `Project: ${obj.relProject}`
        let taskName = component('div', 'taskName', task)
        taskName.innerText = `Task:${obj.task}` /*Task name*/
        let taskDes = component('button', 'taskDescr', task)
        taskDes.innerHTML = 'Description'
//changes 2.1 18/04 START
        let taskDescrDescription = component('div', 'taskDescrDescription', task)
        taskDescrDescription.style.display = 'none'
        let taskDescrContainer = component('div', 'taskDescrContainer', taskDescrDescription)
        let taskDescrDescriptionText = component('div', 'taskDescrDescriptionText', taskDescrContainer)
        taskDescrDescriptionText.innerHTML = obj.description
        let closeDescription = component('button', 'closeDescription', taskDescrContainer)
        closeDescription.innerHTML = 'Close Description'
        closeDescription.addEventListener('click', ()=>taskDescrDescription.style.display = 'none')


        taskDes.addEventListener('click', ()=>{
            taskDescrDescription.style.display = 'flex'
            if(obj.description.length == 0){
                taskDescrDescriptionText.innerHTML = 'No description'
                console.log('no description')
            }else{
                taskDescrDescriptionText.innerHTML = obj.description
                console.log(obj.description)
            }
        })
//changes 2.1 18/04 end
        let taskDueDate = component('div', 'taskDueDate', task)
        taskDueDate.innerText = obj.date
        let taskPriority = component('div', 'taskPriority', task)
        taskPriority.innerText = obj.priority

        let deleteTask = component('button', 'deleteTask', task)
        deleteTask.innerText = 'Delete'

        deleteTask.addEventListener('click', () => {
            deletedTaskName = obj.task
            console.log(deletedTaskName)
            deletedTaskProjectName = obj.relProject
            console.log(deletedTaskProjectName)
            // deleteBtntClicked = true

            deleteTheTask(array, ii)
            delFromArray(deletedTaskName, deletedTaskProjectName)
            renderAllTasks(array)

            //start/ CHANGES AFTER MAKING CHANGE VERSION 1.2 (newTasks.js)
            //CHANGE VERSION 1.3
            localStorage.setItem('AllTasks',JSON.stringify(allTasks))
            localStorage.setItem('AllImpTasks',JSON.stringify(allImportantTasks))
            localStorage.setItem('AllWeekTasks',JSON.stringify(allWeekTasks))
            localStorage.setItem('AllTodayTasks',JSON.stringify(todayTasks))
            //end/ CHANGES AFTER MAKING CHANGE VERSION 1.1 (asideBtnAllTasks.js)
        })
    })
}
// let tasksNames = []
function deleteTheTask(array, ind) {
    let deletedTask = array.splice(ind, 1)[0]

    let projectsNames = []
    projects.forEach(pr => projectsNames.push(pr.projectName))
    let deletedTaskProjectIndex = projectsNames.indexOf(deletedTask.relProject)


    let tasksNames = []
    projects[deletedTaskProjectIndex].tasks.forEach(el => tasksNames.push(el.task))
    console.log(tasksNames)
    let deletedTaskIndex
    tasksNames.forEach((el, i) => {
        if (el == deletedTask.task) {
            deletedTaskIndex = i
        }
    })
    projects[deletedTaskProjectIndex].tasks.splice(deletedTaskIndex, 1)
}
/*Start of changes 17/04 15:18 
(a function that will delete the task from other arrays) 
IT IS WORKING!!!!
CHANGE VERSION 1.1*/
function delFromArray(taskName, projName) {
    /*[allTasks, todayTOF,allWeekTasks, allImportantTasks]*/

    allTasks.forEach((el, i, a) => {
        if (el.task == taskName && el.relProject == projName) {
            a.splice(i, 1)
        }
    })
    todayTasks.forEach((el, i, a) => {
        if (el.task == taskName && el.relProject == projName) {
            a.splice(i, 1)
        }
    })
    allWeekTasks.forEach((el, i, a) => {
        if (el.task == taskName && el.relProject == projName) {
            a.splice(i, 1)
        }
    })
    allImportantTasks.forEach((el, i, a) => {
        if (el.task == taskName && el.relProject == projName) {
            a.splice(i, 1)
        }
    })
}


if (localStorage.getItem('AllTasks')) {
    // allTasks = JSON.parse(allTasksLocal)
    // renderAllTasks(allTasks)
    allTasks = JSON.parse(localStorage.getItem('AllTasks'))
    renderAllTasks(allTasks)
}

