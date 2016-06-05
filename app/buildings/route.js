import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  // id: Ember.computed.alias('auth.credentials.id'),

  model() {
    return this.get('store').findAll('building');
  },

});
