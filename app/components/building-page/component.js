import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  label: Ember.computed(function() {
    // $('[data-toggle="tooltip"]').tooltip();
    // $('.glyphicon-small').tooltip();
    return this.get('building.name');
  }),
  building: {},
  cancel: function() {
    this.set('isEditing', false);
  },
  save: function() {
    this.set('isEditing', false);
    console.log('saved');
    this.set('building.name', this.get('label'));
    this.set('building.id', this.get('building.id'));
    this.sendAction('updateBuilding', this.get('building'));
  },
  edit: function() {
    this.set('isEditing', true);
  },

  baselineScore: Ember.computed(function() {
    let measures = this.get('building.measures');
    let baseline = 0;
    let measure;
    let weight;
    let score;
    for (let i = 0; i < measures.get('length'); i++) {
      measure = measures.objectAt(i);
      score = measure.get('score');
      measure.get('framework')
        .then((result) => {
          weight = result.get('weight');
          baseline += score*weight;
        })
        .then(() => {
          return baseline;
        });
    }
  }),
});
