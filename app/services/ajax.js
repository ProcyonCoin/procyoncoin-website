import Service from '@ember/service';
import RSVP from 'rsvp';
import jQuery from 'jquery';


export default Service.extend({

    request(url, type, success_callback, error_callback) {
        let params = {url, type};
        this.requestParams(params, success_callback, error_callback);
    },

    requestPromise(url, type) {
        let params = {url, type};
        return this.requestParamsPromise(params);
    },

    requestWithUrlParam(url, type, data, success_callback, error_callback) {
        let params = {url, type, data};
        this.requestParams(params, success_callback, error_callback);
    },

    requestWithUrlParamPromise(url, type, data) {
        let params = {url, type, data};
        return this.requestParamsPromise(params);
    },

    requestWithBody(url, type, contentType, data, success_callback, error_callback) {
        let params = {url, type, contentType, data};
        this.requestParams(params, success_callback, error_callback);
    },

    requestWithBodyPromise(url, type, contentType, data) {
        let params = {url, type, contentType, data};
        return this.requestParamsPromise(params);
    },

    requestParams(params, success_callback, error_callback) {

      jQuery.ajax(params).then((data, status, xhr) => {
          success_callback(data);
      }, (data, status, xhr) => {

          if (data.status === 201 || data.status === 200) {
            success_callback(data);
          } else {
            error_callback(data);
            this.treatError(data);
          }
      }, (data) => {
        if (data.status === 401) {
          this.get("session").invalidate();
        }
        error_callback(data);
        this.treatError(data);
      });
    },

    requestParamsPromise(params) {

      return new RSVP.Promise((resolve, reject) => {

        jQuery.ajax(params).then((data, status, xhr) => {
            resolve(data, xhr);
        }, (data) => {

            if (data.status === 201 || data.status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
        });
      });
    },


});
