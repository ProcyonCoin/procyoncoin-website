import Component from '@ember/component';

export default Component.extend({
  classNames: ['section', 'roadmap-section'],

  didInsertElement() {
    this._super(...arguments);
  }
});
