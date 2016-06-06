import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('building-sqft-input', 'Integration | Component | building sqft input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{building-sqft-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#building-sqft-input}}
      template block text
    {{/building-sqft-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
