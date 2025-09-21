import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Password from 'primevue/password'
import Image from 'primevue/image'
import Toolbar from 'primevue/toolbar'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import ToggleButton from 'primevue/togglebutton'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import MeterGroup from 'primevue/metergroup'
import ProgressSpinner from 'primevue/progressspinner'
import Chart from 'primevue/chart'
import Carousel from 'primevue/carousel'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import 'primeicons/primeicons.css'

import 'primeflex/primeflex.css'

import Material from '@primeuix/themes/material';

import router from './router'
import { createPinia } from "pinia";
import {DatePicker} from "primevue";

const app = createApp(App)

app.use(PrimeVue, {theme: {preset: Material}, ripple: true})
app.use(router)
app.use(createPinia())

app.component('pv-card', Card)
    .component('pv-inputtext', InputText)
    .component('pv-password', Password)
    .component('pv-button', Button)
    .component('pv-image', Image)
    .component('pv-toolbar', Toolbar)
    .component('pv-togglebutton', ToggleButton)
    .component('pv-iconfield', IconField)
    .component('pv-calendar', Calendar)
    .component('pv-dialog', Dialog)
    .component('pv-inputicon', InputIcon)
    .component('pv-metergroup', MeterGroup)
    .component('pv-progress-spinner', ProgressSpinner)
    .component('pv-carousel', Carousel)
    .component('pv-radiobutton', RadioButton)
    .component('Chart', Chart)
    .component('pv-dropdown', Dropdown)
    .component('pv-card',Card)
    .component('pv-dialog', Dialog)
    .component('pv-input-text', InputText)
    .component('pv-date-picker', DatePicker)
app.mount('#app')