import Ember from 'ember';
const { $, get, set } = Ember;

export default Ember.Component.extend({
  colors: d3.scale.category10(),
  measures: [
    { name: 'temp',
      label: 'Temperature (C)',
      color: "#1f77b4"},
    { name: 'humidity',
      label: 'Humidity (%)',
      color: "#ff7f0e"},
    { name: 'noise',
      label: 'Noise (db)',
      color: "#ff7f0e"},
      { name: 'pressure',
        label: 'Pressure (bars)',
        color: "#ff7f0e"},
    { name: 'co2',
      label: 'Carbon Dioxide',
      color: d3.scale.category10(0)},
    ],
  query: 'temp',
  actions: {
    selectVehicle(query) {
      console.log(query);
      this.set('query', query);
    }
  }
});
