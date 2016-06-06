import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  address: attr('string'),
  city: attr('string'),
  state: attr('string'),
  zip: attr('string'),
  lat: attr('number'),
  long: attr('number'),
  sq_ft: attr('number'),
  year_const: attr('date'),
  num_floors: attr('number'),
  notes: attr('string'),
  user: belongsTo('user', {
    inverse: 'buildings'
  }),
  baseline: belongsTo('baseline'),
  measures: hasMany('measure'),
  sensors: hasMany('sensors')
});
