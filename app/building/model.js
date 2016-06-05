import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { hasMany } from 'ember-data/relationships';
import { belongsTo } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  BID: DS.attr('number'),
  name: DS.attr('string'),
  address: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zip: DS.attr('string'),
  lat: DS.attr('number'),
  long: DS.attr('number'),
  sq_ft: DS.attr('number'),
  year_const: DS.attr('date'),
  num_floors: DS.attr('number'),
  notes: DS.attr('string'),
  user_id: DS.attr('number'),
  user: DS.belongsTo('user')
});
