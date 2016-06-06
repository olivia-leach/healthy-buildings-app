import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import DS from 'ember-data';

export default Model.extend({
  score: DS.attr('number'),
  value: DS.attr('number'),
  building: DS.belongsTo('building'),
});
