import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('building', params.id);
  },

  // actions: {
  //   createItem (data) {
  //     let building = this.get('store').createRecord('building', data);
  //     return building.save();
  //   }
  // }
});
