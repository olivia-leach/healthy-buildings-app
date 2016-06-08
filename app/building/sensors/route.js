import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log('test');
    const building = this.modelFor('building');
    // return this.store.query('sensor', { param: building });
    // return this.store.query('sensor', { filter: { building_id: building.get('id') }});
  }
});
