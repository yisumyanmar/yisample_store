
import axios from "axios";
import qs from "qs";
/**
 * 订单状态
 */



class OrderStatus 
{
    constructor(store) {
        this.store = store;
    }

    set(store) {
        this.store = store;
    }

    static getInstance(store) {
        if (!(OrderStatus.instance instanceof OrderStatus)) {
            OrderStatus.instance = new OrderStatus(store);
        } else {
            OrderStatus.instance.set(store);
        }

        return OrderStatus.instance;
    }

    orderState(url) {
        axios.post(url, qs.stringify({
            token: sessionStorage.getItem('data_token')
        })).then((res) => {
            console.log(this);
            this.store.state.orderStatus = res.data.data;
        }).catch((err) => {
            console.log(err);
        })
    }
}

OrderStatus.instance = null;

export {OrderStatus}

