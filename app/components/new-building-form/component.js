import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],
  auth: Ember.inject.service(),

  building: {},

  actions: {
    submit () {
      this.sendAction('createBuilding', this.get('building'));
    },

    reset () {
      this.set('building', {});
      this.sendAction('goHome');
    },
  },
});
