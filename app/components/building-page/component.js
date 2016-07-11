import Ember from 'ember';

export default Ember.Component.extend({

  day: Ember.computed(function() {
    // console.log('in main Component');
    // console.log('day is on default set to 5');
    return 5;
    // for (let i = 1; i < 5; i++) {
    //   if (Ember.$('.week li:nth-child(' + i + ')').children('.circle').hasClass('active')) {
    //     console.log('day is ' + i);
    //     return i;
    //   }
    // }
  }),

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
