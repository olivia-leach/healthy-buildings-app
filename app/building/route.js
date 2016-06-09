import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('building', params.id);
  },

  actions: {
    updateBuilding (data) {
      console.log('updating building...');
      this.get('store').findRecord('building', data.id).then(function(building) {
        building.name = data.name;
        return building.save();
      });
    }
  }
});
