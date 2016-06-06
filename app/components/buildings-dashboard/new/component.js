import Ember from 'ember';

export default Ember.Component.extend({
  form: {},
  actions: {
    createItem (item) {
      console.log(item);
      // this.sendAction('createItem', item);
    }
  }
});
