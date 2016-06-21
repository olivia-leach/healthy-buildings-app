import { ActiveModelSerializer } from 'active-model-adapter';
import DS from 'ember-data';

export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin,{
  attrs: {
    baseline: {embedded: 'always'},
    measures: {embedded: 'always'},
    sensors: {embedded: 'always'},
    days: {embedded: 'always'},
    details: {embedded: 'always'}
  }
});
