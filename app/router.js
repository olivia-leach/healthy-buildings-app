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
  this.route('building', { path: '/buildings/:id' });
  this.route('sensor', { path: '/sensors/:id' });
  this.route('sensors');
});

export default Router;
