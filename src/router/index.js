import { createWebHistory, createRouter } from 'vue-router'

import Inicio from '../components/Inicio.vue'
import FormularioGastos from '../components/FormularioGasto.vue'
import TablaDeGastos from '../components/TablaDeGastos.vue'
import Respuestas from '../components/Respuestas.vue'

const routes = [
    { path: '/', name: 'Inicio', component: Inicio },
    { path: '/ingresar', name: 'FormularioGastos', component: FormularioGastos },
    { path: '/gastos', name: 'TablaDeGastos', component: TablaDeGastos },
    { path: '/respuestas', name: 'Respuestas', component: Respuestas }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
