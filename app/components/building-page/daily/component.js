import Ember from 'ember';

let day;

export default Ember.Component.extend({
  score: Ember.computed(function() {
    return (
      this.get('days.date')
    );
  }),

  keyDown(event) {
    if (Ember.$('#tcModal').is(':visible')) {
      if (event.keyCode === 37 || event.keyCode === 40) {
        Ember.$('#leftArrowTC').trigger('click');
      } else if (event.keyCode === 39 || event.keyCode === 38) {
        Ember.$('#rightArrowTC').trigger('click');
      } else if (event.keyCode === 27) {
        Ember.$('#modalContent').modal('hide');
      }
    }
  },

  actions: {
    changed() {
      let details = this.get('details');

      Ember.$('#leftArrowTC').removeClass('end-of-line');
      Ember.$('#rightArrowTC').removeClass('end-of-line');

      let timeline = Ember.$('#tcSlider .slider-value');
      let value = timeline.slider('getValue');

      this.set('chosenDate', value);
      Ember.$('.week li:nth-child(' + value + ')').trigger('click');

      let timelineDay = this.get('chosenDate');
      day = parseInt(timelineDay, 10);
      Ember.$('.timeline-labels li').removeClass('selected-date');

      if (day === 1) {
        Ember.$('.firstDate').toggleClass('selected-date');
        Ember.$('#leftArrowTC').addClass('end-of-line');
      } else if (day === 2) {
        Ember.$('.secondDate').toggleClass('selected-date');
      } else if (day === 3) {
        Ember.$('.thirdDate').toggleClass('selected-date');
      } else if (day === 4) {
        Ember.$('.fourthDate').toggleClass('selected-date');
      } else if (day === 5) {
        Ember.$('.fifthDate').toggleClass('selected-date');
        Ember.$('#rightArrowTC').addClass('end-of-line');
      }

    },

    leftArrow() {
      let details = this.get('details');

      let timeline = Ember.$('.slider-value');
      let value = timeline.slider('getValue');
      timeline.slider('setValue', value-1, true, true);
      value = timeline.slider('getValue');

      Ember.$('.week li:nth-child(' + value + ')').trigger('click');
      let date = Ember.$('.week li:nth-child(' + value + ')').children('.circle').text();
      Ember.$('#TCmodalDate').text(date);

      Ember.$('#leftArrowTC').removeClass('end-of-line');
      Ember.$('#rightArrowTC').removeClass('end-of-line');

      if (value === 1) {
        Ember.$('#leftArrowTC').addClass('end-of-line');
      }

      // this.drawModalChart(chosenColor, value, details);
    },

    rightArrow() {
      let details = this.get('details');

      let timeline = Ember.$('.slider-value');
      let value = timeline.slider('getValue');
      timeline.slider('setValue', value+1, true, true);
      value = timeline.slider('getValue');

      Ember.$('.week li:nth-child(' + value + ')').trigger('click');
      let date = Ember.$('.week li:nth-child(' + value + ')').children('.circle').text();
      Ember.$('#TCmodalDate').text(date);

      // Ember.$('.slider-track div:nth-child(' + (value + 3) + ')').trigger('click');

      Ember.$('#leftArrowTC').removeClass('end-of-line');
      Ember.$('#rightArrowTC').removeClass('end-of-line');

      if (value === 5) {
        Ember.$('#rightArrowTC').addClass('end-of-line');
      }

      // this.drawModalChart(chosenColor, value, details);
    },

  },

  details: Ember.computed(function() {
    let details = this.get('building.details').toArray();
    let results = [];
    for (let i = 0; i < details.get('length'); i++) {
      results.push(details[i]);
    }
    return results;
  }),

  group1: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group1 = {};
    group1.temp = ['x1'];
    group1.hum = ['data1'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 1) {
        group1.temp.push(tcData[i].get('temp'));
        group1.hum.push(tcData[i].get('hum'));
      }
    }
    return group1;
  }),

  group2: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group2 = {};
    group2.temp = ['x2'];
    group2.hum = ['data2'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 2) {
        group2.temp.push(tcData[i].get('temp'));
        group2.hum.push(tcData[i].get('hum'));
      }
    }
    return group2;
  }),

  group3: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group3 = {};
    group3.temp = ['x3'];
    group3.hum = ['data3'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 3) {
        group3.temp.push(tcData[i].get('temp'));
        group3.hum.push(tcData[i].get('hum'));
      }
    }
    return group3;
  }),

  group4: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group4 = {};
    group4.temp = ['x4'];
    group4.hum = ['data4'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 4) {
        group4.temp.push(tcData[i].get('temp'));
        group4.hum.push(tcData[i].get('hum'));
      }
    }
    return group4;
  }),

  group5: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group5 = {};
    group5.temp = ['x5'];
    group5.hum = ['data5'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 5) {
        group5.temp.push(tcData[i].get('temp'));
        group5.hum.push(tcData[i].get('hum'));
      }
    }
    return group5;
  }),

  group6: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group6 = {};
    group6.temp = ['x6'];
    group6.hum = ['data6'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 6) {
        group6.temp.push(tcData[i].get('temp'));
        group6.hum.push(tcData[i].get('hum'));
      }
    }
    return group6;
  }),

  group7: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group7 = {};
    group7.temp = ['x7'];
    group7.hum = ['data7'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 7) {
        group7.temp.push(tcData[i].get('temp'));
        group7.hum.push(tcData[i].get('hum'));
      }
    }
    return group7;
  }),

  group15: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group15 = {};
    group15.temp = ['x15'];
    group15.hum = ['data15'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 15) {
        group15.temp.push(tcData[i].get('temp'));
        group15.hum.push(tcData[i].get('hum'));
      }
    }
    return group15;
  }),

  data: Ember.computed(function () {
    return ({
      xs: {
            'data1': 'x1',
            'data2': 'x2',
            'data3': 'x3',
            'data4': 'x4',
            'data5': 'x5',
            'data6': 'x6',
            'data7': 'x7',
            'data15': 'x15'
        },
        columns: [
            this.get('group1.temp'),
            this.get('group1.hum'),
            this.get('group2.temp'),
            this.get('group2.hum'),
            this.get('group3.temp'),
            this.get('group3.hum'),
            this.get('group4.temp'),
            this.get('group4.hum'),
            this.get('group5.temp'),
            this.get('group5.hum'),
            this.get('group6.temp'),
            this.get('group6.hum'),
            this.get('group7.temp'),
            this.get('group7.hum'),
            this.get('group15.temp'),
            this.get('group15.hum')
        ]
    });


    // return (
    //   { x: 'x',
    //     columns: [
    //       this.get('group1.temp'),
    //       this.get('group1.hum')
    //     ],
    //     // color: this.get('color'),
    //     type: 'spline'
    //   });
    }),

});
