<template>

  <section class="src-components-formulario-vue">
    <div class="jumbotron">
      <br />
      <h1>Ingreso de gasto</h1>
      
      <form novalidate autocomplete="off" @submit.prevent="enviar()">
          <div class="form-group">
                <label for="nombre">Nombre de quién lo realizó</label>
                <input 
                    type="text"
                    id="nombre"
                    class="form-control"
                    v-model="$v.f.nombre.$model"
                >
                <!-- CARTELES DE VALIDACIÓN -->
                <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.nombre.minLength.$invalid">Este campo debe tener al menos {{$v.f.nombre.minLength.$params.min}} caracteres</div>
                    <div v-if="$v.f.nombre.maxLength.$invalid">Este campo debe tener máximo {{$v.f.nombre.maxLength.$params.max}} caracteres</div>
                </div>
          </div>
          <div class="form-group">
                <label for="descripcion">Descripcion del gasto</label>
                <input 
                    type="text"
                    id="descripcion"
                    class="form-control"
                    v-model="$v.f.descripcion.$model"
                >
                <!-- CARTELES DE VALIDACIÓN -->
                <div v-if="$v.f.descripcion.$error && $v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.descripcion.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.descripcion.maxLength.$invalid">Este campo debe tener máximo {{$v.f.descripcion.maxLength.$params.max}} caracteres</div>
                </div>
          </div>
          <div class="form-group">
                <label for="importe">Importe</label>
                <input 
                    type="number"
                    id="importe"
                    class="form-control"
                    v-model="$v.f.importe.$model"
                >
                <!-- CARTELES DE VALIDACIÓN -->
                <div v-if="$v.f.importe.$error && $v.f.importe.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.importe.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.importe.between.$invalid"> 
                      <p v-if="$v.f.importe.$model < $v.f.importe.between.$params.min"> 
                        El valor debe ser mayor a {{$v.f.importe.between.$params.min}}
                      </p>
                      <p v-else>
                        El valor debe ser menor a {{$v.f.importe.between.$params.max}}
                      </p>
                    </div>
                </div>
          </div>
          <div class="form-group">
                <input 
                    type="submit"
                    :disabled="$v.$invalid"
                    class="btn btn-success mt-4"
                    value="Enviar"
                >
          </div>
      </form>

    </div>


  </section>

</template>

<script>
  import { required, minLength, maxLength, between} from '@vuelidate/validators'

  export default  {
    name: 'src-components-formulario-gastos',
    props: [],
    mounted () {
      
    },
    data () {
       return {
          f: this.resetForm(),
          url: 'https://5f7e40030198da00168936dc.mockapi.io/gastos/'
      }
    },
     validations: {
      f: {
        nombre: { 
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        },
        descripcion: { 
          required,
          maxLength: maxLength(50)
        },
        importe: { 
          required,
          between: between(1, 999999999)
        }
      }
    },
    methods: {
      delay : ms => new Promise(resolve => setTimeout(resolve, ms)),

      async sendDatosFormAxios(datos) {
            try {
              let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
              await this.delay(500)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP POST ERROR', error)
            }
        },

      async enviar() {
            this.$v.$touch()
            if(!this.$v.$invalid) {
              let form = this.f
              console.log(form)
              await this.sendDatosFormAxios(form)
              this.f = this.resetForm()
              this.$v.$reset()
              this.f = this.resetForm()

            }
        },
        
        resetForm() {
            return {
               nombre: '',
               descripcion : '',
               importe : 0
            }
        }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario-vue {

  }
</style>
