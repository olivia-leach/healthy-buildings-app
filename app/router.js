import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('buildings');
  this.route('building', { path: '/buildings/:id' }, function() {
    this.route('sensors');
  });
  this.route('sensor', { path: '/sensors/:id' });
  this.route('sensors');
  this.route('new-building');
  this.route('day', { path: '/days/:id' });
  this.route('about');
});

export default Router;
