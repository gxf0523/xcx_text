/* components/alertModal/alertModal.js */
Component({
  properties: {
    modalData:{
      type: Object
    },
  },

  data: { 
    
  },
  methods: {
    hideModal:function(){
      console.log('111')
      this.triggerEvent('hideModal');
    }
   
  },
})