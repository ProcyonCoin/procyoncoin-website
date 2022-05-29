import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
    classNames: ['header-index'],

    router: service(),

    actions: {
        onClick(section) {
          if (section == 'whitepaper') {
            this.router.transitionTo('whitepaper');
            return;
          }
          if (this.router.currentRouteName !== 'index') {
            this.router.transitionTo('index');
            setTimeout(() => {
              let position = $('#'+section).position();
              window.scrollTo(0, position.top);
            })
          } else {
            let position = $('#'+section).position();
            window.scrollTo(0, position.top);
          }
        }
      }

})
