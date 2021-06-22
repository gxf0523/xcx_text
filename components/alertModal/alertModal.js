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
      this.triggerEvent('hideModal');
    }
   
  },
})