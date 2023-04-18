import { TOF, allTasks, allTasksPage, renderAllTasks } from './asideBtnAllTasks.js'
import { tasksHomeAside, allTasksContainer, titleAllTasks } from './index.js'
// import { todayTOF } from './asideBtnToday.js'
import { allTOF } from './asideBtnAllTasks.js'
import { weekTOF } from './asideBtnWeek.js'
import { impTOF } from './asideBtnImportant.js'

export let todayTasks = []
export let allTodayPage = false
let allTodayTasksLocal = localStorage.getItem('AllTodayTasks')

/*The next line checks if the Important btn is pressed p.s. TOF = true or false*/
export let todayTOF = [false]

const todayTasksBtn = tasksHomeAside[1]
todayTasksBtn.addEventListener('click', () => {

    for (let i = 0; i < 4; i++) {
        TOF[i] = false
        if (i == 1) {
            TOF[i] = true
        }
    }
    console.log('TOF all today')
    console.log(TOF)

    // console.log(todayTOF)

    console.log(todayTasks)
    todayTasksBtn.style.background = '#d14334'
    tasksHomeAside.forEach((el, i) => {
        if (i != 1) {
            el.style.background = '#028f76'
        }
    })
    titleAllTasks.innerHTML = todayTasksBtn.innerHTML
    console.log('The Today Tasks btn was clicked')
    console.log(todayTasks)
    if (todayTasks.length == 0) {
        console.log('No tasks yet')
        allTasksContainer.innerHTML = ''
    } else {
        todayTOF = true
        renderAllTasks(todayTasks)
    }
})

// if(allTodayTasksLocal){
//     todayTasks = JSON.parse(allTodayTasksLocal)
// }
if (allTodayTasksLocal) {
    // allTasks = JSON.parse(allTasksLocal)
    // renderAllTasks(allTasks)
    todayTasks = JSON.parse(allTodayTasksLocal)
    // renderAllTasks(allTasks)
}
