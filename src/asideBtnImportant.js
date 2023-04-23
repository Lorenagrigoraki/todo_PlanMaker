import { TOF, allTasks, renderAllTasks } from './asideBtnAllTasks.js'
import { todayTOF } from './asideBtnToday.js'
import { allTOF } from './asideBtnAllTasks.js'
import { weekTOF } from './asideBtnWeek.js'
import { tasksHomeAside, allTasksContainer, titleAllTasks } from './index.js'

export var allImportantTasks = []
/*The next line checks if the Important btn is pressed*/
let allImpTasksLocal = localStorage.getItem('AllImpTasks')

export let impTOF = [false]

const importantTasks = tasksHomeAside[3]
importantTasks.addEventListener('click', () => {
    for(let i = 0; i< 4; i++){
        TOF[i] = false
        if(i == 3){
            TOF[i] = true
        }
       }
       console.log('TOF imp')
    console.log(TOF)
    //changes
    importantTasks.style.background = '#d14334'
    tasksHomeAside.forEach((el,i)=>{
        if(i!=3){
           el.style.background = '#028f76'
        }
    })
    titleAllTasks.innerHTML = importantTasks.innerHTML
    console.log(allImportantTasks)
    if (allImportantTasks.length == 0) {
        console.log('No tasks yet')
        allTasksContainer.innerHTML = ''
    } else {
        impTOF = true
        
        renderAllTasks(allImportantTasks) 
    }
})

if(allImpTasksLocal){
    allImportantTasks = JSON.parse(allImpTasksLocal)
}
