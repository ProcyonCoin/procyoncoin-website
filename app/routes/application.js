import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from "jquery";

export default class ApplicationRoute extends Route {
    @service intl;

    beforeModel() {

        let browserLocale = navigator.language || navigator.userLanguage; 
        if (browserLocale) {
            let lang = browserLocale.split('-')[0];
            if (this.intl.locales.indexOf(lang) > 0) {
                return this.intl.setLocale([lang]);
            }
            return this.intl.setLocale(['en']);
        }
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