<template>

  <section class="src-components-respuestas">
    <div class="jumbotron">
    
      <h1>Respuestas</h1>
     
      <div class="table-responsive">
          <table class="table">
            <tr class="bg-success text-white">
              <th>Número de pregunta</th>
              <th>Respuesta</th>
            </tr>
            <tr
              class="bg-info text-white"
              v-for="(preg, index) in preguntas"
              :key="index"
            >
              <td>{{ preg.pregunta }}</td>
              <td><a v-for="(res, index) in preg.respuestas"
              :key="index"> {{ res }}</a></td>
            </tr>
          </table>
      </div>
    </div>


  </section>

</template>

<script>

  export default  {
    name: 'src-components-respuestas',
    props: [],
    mounted () {

    },
    data () {
      return {
        preguntas : [
          { pregunta: 1, respuestas: ["b, ", "d"] },
          { pregunta: 2, respuestas: ["b"] },
          { pregunta: 3, respuestas: ["c"] },
          { pregunta: 4, respuestas: ["d"] },
          { pregunta: 5, respuestas: ["b"] },
        ]
      }
    },
    methods: {

    },
    computed: {
      
    }
}


</script>

<style scoped lang="css">
  .src-components-respuestas {

  }
</style>
