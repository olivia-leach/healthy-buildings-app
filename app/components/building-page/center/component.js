import Ember from 'ember';

export default Ember.Component.extend({
  numsensors: Ember.computed(function() {
      return (this.get('building.sensors.length'));
  }),
  sensors: Ember.computed(function() {
    // let measures = this.get('building.measures').toArray();

    let sensors = this.get('building.sensors').toArray();
    let latest_sensors = [];
    for (let i = 0; i < sensors.length; i++) {
      let first_data = sensors[i].get('points').toArray();
      console.log(first_data);
      // console.log(sensors[i]);
    }
    // return this.get('building', 'sensors');
  }),

});
