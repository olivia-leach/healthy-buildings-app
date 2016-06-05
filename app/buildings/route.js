import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  // id: Ember.computed.alias('auth.credentials.id'),

  model() {
    // return this.get('store').findAll('building');
    // return this.get('store').query('building', {filter: {state: 'FL'}});
    // return this.get('store').findRecord('building', 2);
    // GET to /persons?filter[name]=Peter
    this.store.query('building', { filter: { state: 'FL' } }).then(function(buildings) {
      return buildings;
    });
  },

});
