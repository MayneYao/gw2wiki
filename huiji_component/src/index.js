import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Gw2Item from './components/ItemLine';
import axios from 'axios';

const apiBaseUrl = 'https://gw2.huijiwiki.com/api/rest_v1/namespace/data';

let all_item_div = document.querySelectorAll('div[data-item-id]');

let all_item_id = [];

for (let item of all_item_div) {
	all_item_id.push(parseInt(item.dataset.itemId))
}
console.log(all_item_id);
axios.get(apiBaseUrl, {
	params: {
		filter: JSON.stringify({id: {"$in": all_item_id}})
	}
}).then(res => {
	const {_embedded} = res.data;
	for (let item of all_item_div) {
		let itemData = _embedded.find(dItem => dItem.id == item.dataset.itemId);
		ReactDOM.render(<Gw2Item data={itemData}/>, item);
	}
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
