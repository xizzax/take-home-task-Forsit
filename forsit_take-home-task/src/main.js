import { createApp } from 'vue'
import App from './App.vue'

//setting up the icon library
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'
import { faBox } from '@fortawesome/free-solid-svg-icons'

library.add([faChartSimple,
    faBoxesStacked,
    faBox,
]);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
