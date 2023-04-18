import { tasksHomeAside, allTasksContainer, titleAllTasks } from './index.js'
import { TOF, renderAllTasks } from './asideBtnAllTasks.js'
import { todayTOF } from './asideBtnToday.js'
import { allTOF } from './asideBtnAllTasks.js'
// import { weekTOF } from './asideBtnWeek.js'
import { impTOF } from './asideBtnImportant.js'

export let allWeekTasks = []
let allWeekTasksLocal = localStorage.getItem('AllWeekTasks')

export let weekTOF = [false]

const weekTasks = tasksHomeAside[2]
weekTasks.addEventListener('click', () => {
    for (let i = 0; i < 4; i++) {
        TOF[i] = false
        if (i == 2) {
            TOF[i] = true
        }
    }
    console.log('TOF week')
    console.log(TOF)
    weekTasks.style.background = '#d14334'
    tasksHomeAside.forEach((el, i) => {
        if (i != 2) {
            el.style.background = '#028f76'
        }
    })
    titleAllTasks.innerHTML = weekTasks.innerHTML
    console.log('The Important btn was clicked')
    if (allWeekTasks.length == 0) {
        console.log('No tasks yet')
        allTasksContainer.innerHTML = ''
    } else {
        weekTOF = true

        renderAllTasks(allWeekTasks)
    }
})

if (allWeekTasksLocal) {
    allWeekTasks = JSON.parse(allWeekTasksLocal)
}
