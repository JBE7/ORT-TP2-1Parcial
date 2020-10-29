export default  {
    methods : {
      formatearFecha : function(fyh) {
        return new Date(fyh).toLocaleString()
      },
      formatearImporte : function(importe) {
        return '$ '.concat(Number(importe))
      }
    }
}