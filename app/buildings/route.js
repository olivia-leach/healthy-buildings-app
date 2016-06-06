import Ember from 'ember';
const { $, get, set } = Ember;

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  // id: Ember.computed.alias('auth.credentials.id'),

  model() {
    return this.get('store').findAll('building');
  },

  actions: {
    editDashboard() {
      console.log('edit');
      if ($('#edit-link').text() === "Edit") {
        $('.delete-buttons').css("visibility", "visible");
        $('#edit-link').text('Done editing');
      } else {
        $('.delete-buttons').css("visibility", "hidden");
        $('#edit-link').text('Edit');
      }
    },
  }
});
