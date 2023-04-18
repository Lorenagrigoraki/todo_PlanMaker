import { allTOF, allTasks, renderAllTasks } from './asideBtnAllTasks.js'
import { formBtns, projectNameInput, projectsAsideContainer, formProjectcontainer, allTasksContainer, tasksHomeAside } from './index.js'
import { btnAddProject, titleAllTasks, formTaskContainer } from './index.js'
import { component } from './index.js'
import { newTask } from './index.js'
import { addTaskTask } from './newTasks.js'
import { renderTask } from './newTasks.js'
import { allImportantTasks, allImpArray, impTOF } from './asideBtnImportant.js'
import { allWeekTasks, weekTOF } from './asideBtnWeek.js'
import { todayTOF, todayTasks } from './asideBtnToday.js'

import { format } from 'date-fns'


var projectIndex
/*Creating a class project*/
let projects = []
export class projectCreator {
    constructor(projectName, tasks, delProject) {
        this.projectName = projectName
        this.tasks = []
        this.delProject = false
    }
    getName() {
        return this.projectName
    }
    // addTask(newTask) {
    //     this.tasks.push(newTask)
    // }
}

/*Proba for addTask function start*/
export function addTask(someKey, newTask) {
        someKey.tasks.push(newTask)
    }
/*Proba for addTask function end*/

function closeProjectForm() {
    formProjectcontainer.style.display = 'none'
    projectNameInput.value = ''
    addProjectBtnCheck = false
}
function render() {
    projectsAsideContainer.innerHTML = ''
    createProject()
}
/*creatin a project layout*/
function createProject() {
    projects.forEach((proj, i) => {
        const pushedProject = component('div', 'pushedProject', projectsAsideContainer)

        const projNameBtn = component('button', 'projNameBtn', pushedProject)
        projNameBtn.innerHTML = proj.projectName
        projNameBtn.addEventListener('click', () => {
            tasksHomeAside.forEach(el => el.style.background = '#028f76')
            titleAllTasks.innerHTML = projNameBtn.innerHTML
            console.log('The projName btn was clicked')
            renderTask(i)
        })
        const projectBtn1 = component('button', 'projectBtnsAdd', pushedProject)
        projectBtn1.addEventListener('click', () => {
            // this part of code displays the form, renders the task and also sets the value of the #date input
            const datePicker = document.querySelector('#date')
            datePicker.setAttribute('min', format(new Date(), 'yyyy-MM-dd').toString())
            datePicker.value = format(new Date(), 'yyyy-MM-dd').toString()
            projectIndex = i
            renderTask(i)
            formTaskContainer.style.display = 'block'
            // titleAllTasks.innerHTML = proj.getName()
            // console.log(`You are adding a task to ${proj.getName()} project`)
            titleAllTasks.innerHTML = proj.projectName
            console.log(`You are adding a task to ${proj.projectName} project`)
        })
        const projectBtn2 = component('button', 'projectBtnsDelete', pushedProject)
        projectBtn2.addEventListener('click', () => {
          
            proj.delProject = true
           proj.tasks.forEach(el => el.setDelProject)          
            console.log('this is the projects array')
            console.log(projects) 
        
            deleteTheDeletedProjectFromTasks(allImportantTasks, proj.projectName)
            deleteTheDeletedProjectFromTasks(todayTasks, proj.projectName)
            deleteTheDeletedProjectFromTasks(allWeekTasks, proj.projectName)
            deleteTheDeletedProjectFromTasks(allTasks, proj.projectName)
            
            deleteTheDeletedProject()
            
            allTasksContainer.innerHTML = ''
            titleAllTasks.innerHTML = ''
            allTasksContainer.innerHTML = 'You just deleted a project! Go and create a new one or look what task you can accomplish today'
            // renderTheButton()
            render() 
              

        })
      

        let btns = [projectBtn1, projectBtn2]
        btns[0].innerHTML = 'Add task'
        btns[1].innerHTML = 'Delete'
    })
}

function deleteTheDeletedProject(){
    projects = projects.filter(el => el.delProject !== true)
    // localStorage.removeItem(projectsArray)
    // localStorage.setItem('projectsArray', )
    localStorage.setItem('projectsArray',JSON.stringify(projects))
    localStorage.setItem('AllTasks',JSON.stringify(allTasks))
    localStorage.setItem('AllImpTasks',JSON.stringify(allImportantTasks))
    localStorage.setItem('AllWeekTasks',JSON.stringify(allWeekTasks))
    localStorage.setItem('AllTodayTasks',JSON.stringify(todayTasks))
    return projects
}

function deleteTheDeletedProjectFromTasks(a, delProj){
    
    for(let li = 0; li<a.length; li++){
        if(a[li].relProject === delProj){
                a.splice(li,1)
                li=li-1                         
        }
    }
    console.log('the array after deleting')
    console.log(a)
    return a
}
/*adding an event Listeners to the add btn (to add a project)*/
function addProject(array) {
    let namesOfProjects = []
    if (projectNameInput.value.length != 0 && !namesOfProjects.includes(projectNameInput.value)) {
        let project = new projectCreator(projectNameInput.value)
        array.push(project)
        array.forEach(el => {
            namesOfProjects.push(el.projectName)
        })
        console.log(namesOfProjects)
        console.log('A new project was added')
        console.log('this is the PROJECTS array')
        console.log(array)
        // localStorage.setItem('projectsArray', JSON.stringify(array))
        // localStorage.removeItem('projectsArray')
        // localStorage.setItem('projectsArray', JSON.stringify(array))

        projectNameInput.value = ''
        closeProjectForm()
    } else if (namesOfProjects.includes(projectNameInput.value)) {
        alert('You already have a project with that name')
    } else {
        alert('You have not fill the name of the project')
    }
}

formBtns[0].addEventListener('click', () => {
    addProject(projects)
    render()

    //start/ CHANGES AFTER MAKING CHANGE VERSION 1.3 (asideBtnAllTasks.js)
    //CHANGE VERSION 1.4
    localStorage.setItem('projectsArray', JSON.stringify(projects))
    localStorage.setItem('AllTasks',JSON.stringify(allTasks))
// let allTasksLocal = localStorage.getItem('AllTasks')
})

/*making the adding task visible*/

formProjectcontainer.style.display = 'none'
let addProjectBtnCheck = false
btnAddProject.addEventListener('click', () => {
    addProjectBtnCheck = true
    formProjectcontainer.style.display = 'grid'
})
/*listener for the cancel btn*/
formBtns[1].addEventListener('click', closeProjectForm)

export { projects, projectIndex }

// let localProjects = JSON.parse(localStorage.getItem('projectsArray'))

console.log('this is the projects from local starage')
// console.log(localProjects)

if(localStorage.getItem('projectsArray')){
    projects = JSON.parse(localStorage.getItem('projectsArray'))
    console.log(projects)
    render()
}

console.log('this is the projects array that equals to the array from local starage')
console.log(projects)
