import Ember from 'ember';
const { $, get, set } = Ember;

export default Ember.Component.extend({
  actions: {
  deleteBuilding() {
    this.get('building').destroyRecord();
  },
},
});
