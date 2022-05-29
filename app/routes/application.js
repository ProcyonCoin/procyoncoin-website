import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from "jquery";

export default class ApplicationRoute extends Route {
    @service intl;

    beforeModel() {
        this.intl.setLocale(['en', 'fr']);
    }

    afterModel() {
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            if (scroll > 20) {
              $('.header-index').addClass('header-background');
            }
            else {
              $('.header-index').removeClass('header-background');
            }
          });
    }

}