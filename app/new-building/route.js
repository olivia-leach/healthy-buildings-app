import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    createBuilding (data) {
      console.log(data);
      let building = this.get('store').createRecord('building', data);
      return building.save()
      .then(() => this.transitionTo('buildings'))
      .then(() => this.get('flashMessages').success('New building added'))
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },

    goHome () {
      this.transitionTo('buildings');
    }
  }
});
