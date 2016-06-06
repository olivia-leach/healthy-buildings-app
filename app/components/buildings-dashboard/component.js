import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
  deleteBuilding() {
    this.get('building').destroyRecord();
  },
},
});
