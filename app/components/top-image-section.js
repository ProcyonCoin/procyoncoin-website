import Component from '@ember/component';
import { set, get} from '@ember/object';


export default Component.extend({
  
  didInsertElement() {
    this._super(...arguments);
  },

  actions: {
    slideTo2ndFrame() {
      $('html, body').animate({
        scrollTop: $('.top-image-section').height()
      }, 500);
      /*
      let music = this.get('music');
      if (music) {
        music.pause();
        set(this, 'music', undefined);
      }
      
      music = new Audio('/audio/welcome-audio.mp3');
      music.play();
      music.loop =false;;
      set(this, 'music', music)
      */
    }
  }
});
