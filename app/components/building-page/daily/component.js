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

  group16: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group16 = {};
    group16.temp = ['x16'];
    group16.hum = ['data16'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 16) {
        group16.temp.push(tcData[i].get('temp'));
        group16.hum.push(tcData[i].get('hum'));
      }
    }
    return group16;
  }),

  group17: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group17 = {};
    group17.temp = ['x17'];
    group17.hum = ['data17'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 17) {
        group17.temp.push(tcData[i].get('temp'));
        group17.hum.push(tcData[i].get('hum'));
      }
    }
    return group17;
  }),

  group18: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group18 = {};
    group18.temp = ['x18'];
    group18.hum = ['data18'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 18) {
        group18.temp.push(tcData[i].get('temp'));
        group18.hum.push(tcData[i].get('hum'));
      }
    }
    return group18;
  }),

  group19: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group19 = {};
    group19.temp = ['x19'];
    group19.hum = ['data19'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 19) {
        group19.temp.push(tcData[i].get('temp'));
        group19.hum.push(tcData[i].get('hum'));
      }
    }
    return group19;
  }),

  group20: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group20 = {};
    group20.temp = ['x20'];
    group20.hum = ['data20'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 20) {
        group20.temp.push(tcData[i].get('temp'));
        group20.hum.push(tcData[i].get('hum'));
      }
    }
    return group20;
  }),

  group21: Ember.computed(function() {
    let tcData = this.get('building.thermals').toArray();
    let group21 = {};
    group21.temp = ['x21'];
    group21.hum = ['data21'];
    for (let i = 0; i < tcData.length; i++) {
      if (tcData[i].get('group') === 21) {
        group21.temp.push(tcData[i].get('temp'));
        group21.hum.push(tcData[i].get('hum'));
      }
    }
    return group21;
  }),

  data: Ember.computed(function () {
    let lightgrey = '#c8c8c8';
    return ({
      types: {
        // 'data1': 'scatter'
      },
      colors: {
        'data1': lightgrey,
        'data2': lightgrey,
        'data3': lightgrey,
        'data4': lightgrey,
        'data5': lightgrey,
        'data6': lightgrey,
        'data7': lightgrey,
        'data15': lightgrey,
        'data16': lightgrey,
        'data17': lightgrey,
        'data18': lightgrey,
        'data19': lightgrey,
        'data20': lightgrey,
        'data21': lightgrey
      },
      xs: {
            'data1': 'x1',
            'data2': 'x2',
            'data3': 'x3',
            'data4': 'x4',
            'data5': 'x5',
            'data6': 'x6',
            'data7': 'x7',
            'data15': 'x15',
            'data16': 'x16',
            'data17': 'x17',
            'data18': 'x18',
            'data19': 'x19',
            'data20': 'x20',
            'data21': 'x21'
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
            this.get('group15.hum'),
            this.get('group16.temp'),
            this.get('group16.hum'),
            this.get('group17.temp'),
            this.get('group17.hum'),
            this.get('group18.temp'),
            this.get('group18.hum'),
            this.get('group19.temp'),
            this.get('group19.hum'),
            this.get('group20.temp'),
            this.get('group20.hum'),
            this.get('group21.temp'),
            this.get('group21.hum')
        ]
    });
  }),

  legend: {
    show: false
  },

  padding: {
    left: 50,
    right: 50
  },

  point: {
    show: false
  },

  size: {
    height: 400
  },

  axis: {
    x: {
      min: 0,
      max: 35,
      label: 'Dry Bulb Temperature (°C)',
      tick: {
        fit: false
      },
      padding: {
        left: 0,
        right: 0
      }
    },
    y: {
      min: 0,
      max: 20,
      label: 'Specific Humidity (gm vap/kg dry air)',
      tick: {
        fit: false
      },
      padding: {
        top: 0,
        bottom: 0
      }
    }
  }

});
