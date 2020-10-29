<template>

  <section class="src-components-tabla-tareas">
    <div class="jumbotron">
    
      <h1>Resumen de Gastos</h1>
      <br />
      <div v-if="gastos.length">
        <h5>Ingrese su presupuesto asignado: 
          <input type="number" v-model="presupuesto"/> 
          <div v-if="presupuesto && presupuesto < this.calcularImporteTotal.importe" class="alert alert-danger">
            Los gastos realizados superan el presupuesto asignado... 
          </div>
          <div v-else-if="presupuesto" class="alert alert-info">
            Su presupuesto de {{formatearImporte(presupuesto)}}, se encuentra {{formatearImporte(presupuesto - this.calcularImporteTotal.importe)}} por debajo del total de sus gastos.
          </div>
        </h5>
      </div>

      <br />
      <div class="table-responsive">
        <div v-if="gastos.length">
          <table class="table">
            <tr class="bg-success text-white">
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Importe</th>
              <th>Fecha de creacion</th>
            </tr>
              <tr
                class="bg-info text-white"
                v-for="(gasto, index) in gastos"
                :key="index"
              >
                <td>{{ gasto.nombre }}</td>
                <td>{{ gasto.descripcion }}</td>
                <td>{{ formatearImporte(gasto.importe) }}</td>
                <td>{{ formatearFecha(gasto.createdAt) }}</td>
              </tr>
              <tr class="bg-warning text-white">
                <th></th>
                <th></th>
                <th>Total:</th>
                <th :style="{ color: this.calcularImporteTotal.color }">
                        {{ formatearImporte(this.calcularImporteTotal.importe) }}
                </th>
              </tr>
          </table>
        </div>
        <div v-else class="alert alert-warning">
          No se registraron gastos... <br>
          Ingrese un gasto clickeando <a :href="'/ingresar'"> aquí </a>
        </div>

      </div>
    </div>
  </section>

</template>

<script>

  import filters from '../filters.js'

  export default  {
    name: 'src-components-tabla-de-gastos',
    mixins : [filters],
    props: [],
    mounted () {
      this.getGastosAxios()
    },
    data () {
      return {
          url : 'https://5f7e40030198da00168936dc.mockapi.io/gastos/',
          gastos : [],
          presupuesto : ''
      }
    },
    methods: {

      delay : ms => new Promise(resolve => setTimeout(resolve, ms)),

      async getGastosAxios() {
            try {
              let res = await this.axios(this.url)
              this.gastos = res.data
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
        }
    },
    computed: {
      calcularImporteTotal(){
        let total = 0;

        this.gastos.forEach(gasto => {
            total += parseInt(gasto.importe);
        });

        let col = (function() { 
          if(total < 1000)
              return "green"
          else if(total >= 1000 && total <= 5000)
              return "magenta"
          else
              return "orange"
        })();

        console.log("color: " + col)

        return {
          importe: total,
          color: col
        }
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-tabla-tareas {

  }
</style>
