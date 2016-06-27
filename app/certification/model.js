import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  leedversion: DS.attr('string'),
  rating: DS.attr('string'),
  category: DS.attr('string'),
  credits: DS.attr('string'),
  obtained: DS.attr('string'),
  building: belongsTo('building')
});
