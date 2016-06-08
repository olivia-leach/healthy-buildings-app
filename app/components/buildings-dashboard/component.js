import Ember from 'ember';
const { $, get, set } = Ember;

// $("#delete-button").click(function(e) {
//   console.log('test');
//    //do something
//    e.stopPropagation();
// });

export default Ember.Component.extend({
  actions: {
  deleteBuilding() {
    this.get('building').destroyRecord();
  },
},
});
