import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('building', params.id);
  },

  actions: {
    updateBuilding (data) {
      console.log('updating building...');
      console.log(data.id);
      this.get('store').findRecord('building', data.id).then(function(building) {
        // console.log(building.name);
        building.name = data.name;
        return building.save();
      });
    }
  }
});
