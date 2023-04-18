import { format } from "date-fns";

export const component = (tag, classN, parent) => {

  const element = document.createElement(tag);
  element.classList.add(classN)
  parent.appendChild(element)

  return element;
};

function elInnerHtml(el, inner) {
  el.innerHTML = inner
}

const container = document.querySelector('.container')
/*1. Header section*/
const header = component('header', 'header', container)
const h1Header = component('h1', 'h1Header', header)
h1Header.innerHTML = 'Plan-Maker'
// header.style.border = '1px solid #d14334'
/*2. Aside section*/
const aside = component('div', 'aside', container)
// aside.style.border = '2px solid #d14334'
// /*2.1. Home Aside section*/
// const homeAside = component('div', 'homeAside', header)/*Changed*/
// // const pHomeAside = component('p', 'pHomeAside', homeAside)/*Changed*/
// // elInnerHtml(pHomeAside, 'Home')/*Changed*/
// for (let i = 0; i < 4; i++) {
//   const taskHomeAside = component('button', 'taskHomeAside', homeAside)/*Changed*/
// }
// export const tasksHomeAside = [...document.querySelectorAll('.taskHomeAside')]
// tasksHomeAside.forEach(el => el.style.border = '1px solid black')
// elInnerHtml(tasksHomeAside[0], 'All tasks')
// elInnerHtml(tasksHomeAside[1], 'Todays tasks')
// elInnerHtml(tasksHomeAside[2], 'Week tasks')
// elInnerHtml(tasksHomeAside[3], 'Important')

/*2.2. Projects Aside section*/
const projectsAside = component('div', 'projectsAside', aside)
const pProjectsAside = component('p', 'pProjectsAside', projectsAside)
elInnerHtml(pProjectsAside, 'Projects')
const projectsAsideContainer = component('div', 'projectsAsideContainer', projectsAside) //this is a container where all the project will be pushed
const formProjectcontainer = component('div', 'formProjectcontainer', projectsAside)
const projectNameInput = component('input', 'projectNameInput', formProjectcontainer)
projectNameInput.placeholder = 'Name of the project'
const formBtnContainer = component('div', 'formBtnContainer', formProjectcontainer)
for (let i = 0; i < 2; i++) {
  const btns = component('button', 'formBtn', formBtnContainer)
}
const formBtns = [...document.querySelectorAll('.formBtn')]
elInnerHtml(formBtns[0], 'Add')
elInnerHtml(formBtns[1], 'Cancel')

export const btnAddProject = component('button', 'btnAddProject', projectsAside)
elInnerHtml(btnAddProject, 'Add Project')

/*3. All tasks section*/
const allTasks = component('div', 'allTasks', container)

/*3.1. Home Aside section*/
const homeAside = component('div', 'homeAside', allTasks)/*Changed*/
// const pHomeAside = component('p', 'pHomeAside', homeAside)/*Changed*/
// elInnerHtml(pHomeAside, 'Home')/*Changed*/
for (let i = 0; i < 4; i++) {
  const taskHomeAside = component('button', 'taskHomeAside', homeAside)/*Changed*/
}
export const tasksHomeAside = [...document.querySelectorAll('.taskHomeAside')]
// tasksHomeAside.forEach(el => el.style.border = '1px solid black')
elInnerHtml(tasksHomeAside[0], 'All tasks')
elInnerHtml(tasksHomeAside[1], 'Todays tasks')
elInnerHtml(tasksHomeAside[2], 'Week tasks')
elInnerHtml(tasksHomeAside[3], 'Important')

const allTasksTasks = component('div', 'allTasksTasks', allTasks) /*Added */


export let titleAllTasks = component('div', 'titleAllTasks', allTasksTasks)/*allTasks -> allTasksTasks*/
elInnerHtml(titleAllTasks, 'All Tasks')
const allTasksContainer = component('div', 'allTasksContainer', allTasksTasks)/*allTasks -> allTasksTasks*/

/*3.1. The form for adding a task*/
export const formTaskContainer = component('div', 'formTaskContainer', allTasks)
formTaskContainer.style.display = 'none'
export const theForm = component('form', 'theForm', formTaskContainer)
for (let i = 0; i < 4; i++) {
  const formInpContainer = component('div', 'formTasksInputContainer', theForm)
}
const formTasksInputContainer = [...document.querySelectorAll('.formTasksInputContainer')]
formTasksInputContainer.forEach(el => {  
  const label = component('label', 'formTaskLabel', el)
  // const input = component('input', 'formTaskInput', el)
  const input = component('div', 'formTaskInputContainer', el)
})
const labels = [...document.querySelectorAll('.formTaskLabel')]
elInnerHtml(labels[0], 'Title:')
elInnerHtml(labels[1], 'Description:')
elInnerHtml(labels[2], 'Date:')
elInnerHtml(labels[3], 'Priority:')
const inputs = [...document.querySelectorAll('.formTaskInputContainer')]
inputs.forEach((input, inputI) => {
  let compInput = component('input', 'formInput', input)
  if(inputI == 2){
    compInput.type = 'date'
    compInput.setAttribute('id','date')
    // compInput.value =format(new Date(), 'yyyy-MM-dd').toString() 
    // compInput.setAttribute('min',format(new Date(), 'yyyy-MM-dd').toString())

  }
})
inputs[3].innerHTML = ''

let radios = []
let radioLabels = []
for (let l = 0; l < 2; l++) {

  let radio = component('input', 'inputRadio', inputs[3])
  let radioLabel = component('label', 'inputRadioLabel', inputs[3])
  radioLabel.htmlFor = `${l}`
  radioLabels.push(radioLabel)
  radio.setAttribute('id', `${l}`)
  radio.name = 'priority'
  radios.push(radio)
}
radios.forEach(r => r.type = 'radio')
radios[0].value = 'low'
radios[1].value = 'high'
radioLabels[0].innerHTML = 'Low'
radioLabels[1].innerHTML = 'High'



const formTasksBtnContainer = component('div', 'formTasksBtnContainer', theForm)/*formTaskContainer ->theForm */
for (let i = 0; i < 2; i++) {
  const formTasksBtn = component('button', 'formTasksBtn', formTasksBtnContainer)
}
export const formTasksBtns = [...document.querySelectorAll('.formTasksBtn')]
elInnerHtml(formTasksBtns[0], 'Add')
elInnerHtml(formTasksBtns[1], 'Cancel')

// allTasks.style.border = '1px solid #d14334'

export {
  formBtns,
  projectNameInput,
  projectsAsideContainer,
  formProjectcontainer,
  allTasksContainer
}
