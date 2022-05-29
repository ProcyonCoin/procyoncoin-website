import Component from '@ember/component';

export default Component.extend({
  classNames: ['section', 'presentation-section'],

  didInsertElement() {
    this._super(...arguments);
  }
});
