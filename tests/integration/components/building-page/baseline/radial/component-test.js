import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('building-page/baseline/radial', 'Integration | Component | building page/baseline/radial', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{building-page/baseline/radial}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#building-page/baseline/radial}}
      template block text
    {{/building-page/baseline/radial}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
