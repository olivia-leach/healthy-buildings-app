import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sensor-page/chart', 'Integration | Component | sensor page/chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sensor-page/chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sensor-page/chart}}
      template block text
    {{/sensor-page/chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
