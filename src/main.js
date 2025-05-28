import { createApp } from 'vue'
import App from './App.vue'

//setting up the icon library
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faBoxesStacked, faBox, faSort, faAngleDown, faMagnifyingGlass, faAdd } from '@fortawesome/free-solid-svg-icons'

library.add([faChartSimple,
    faBoxesStacked,
    faBox,,
    faAngleDown,
    faSort,
    faMagnifyingGlass,
    faAdd
]);


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
