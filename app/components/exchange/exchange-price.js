import Component from '@ember/component';
import { set, get} from '@ember/object';
import { inject as service} from '@ember/service';


export default Component.extend({
  
    amount: '--',

    ajax: service(),

    init() {
        this._super(...arguments);
        this.refreshPrice();
        let interval = setInterval(() => {
            this.refreshPrice()
        }, 60*1000);
        set(this, 'interval', interval);
    },

    didDestroyElement() {
        this._super(...arguments);
        if (this.interval) {
          clearInterval(this.interval);
        }
    },

    refreshPrice() {
        switch(this.exchange) {
            case 'exbitron':
                this.refreshExbitron();
                break;
            case 'vindax':
                this.refreshVindax();
                break;
            case 'xeggex':
                this.refreshXeggex();
                break;

        }
    },

    refreshExbitron() {
        let path = 'https://www.exbitron.com/api/v2/peatio/public/markets/prcousdt/tickers'
        if (this.unit == 'LTC') {
            path = 'https://www.exbitron.com/api/v2/peatio/public/markets/prcoltc/tickers'
        }

        this.ajax.requestPromise(path).then(result => {
            set(this, 'amount', result.ticker.last);
        })
        
    },

    refreshVindax() {
        let path = 'https://api.vindax.com/api/v1/ticker/24hr?symbol=PRCOUSDT';
        this.ajax.requestPromise(path).then(result => {
            set(this, 'amount', result.lastPrice);
        })
    },

    refreshXeggex() {
        let path = 'https://api.xeggex.com/api/v2/market/getbysymbol/PRCO_USDT';
        if (this.unit == 'DOGE') {
            path = 'https://api.xeggex.com/api/v2/market/getbysymbol/PRCO_DOGE';
        }
        this.ajax.requestPromise(path).then(result => {
            set(this, 'amount', result.lastPrice);
        })
    }


});