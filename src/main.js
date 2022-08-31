//fetch the item from the JSON file
function loadItems() {
	return fetch('data/data.json')
		.then((response) => response.json())
		.then((json) => json.items);
}

//update the list with given items
function displayItems(items) {
	const container = document.querySelector('.items');
	// const html = items.map((item) => createHTMLString(item)).join();
	// console.log(html);
	container.innerHTML = items.map((item) => createHTMLString(item)).join();
}

//Create HTML list item from the given data item
function createHTMLString(item) {
	return `
	<li class="item">
		<img src="${item.image}" alt="${item.type}" class="item__thumbnail">
		<span class="item__description">${item.gender}, ${item.size} size</span>
	</li>
	`;
}

function onButtonClick(event, items) {
	const dataset = event.target.dataset;
	const key = dataset.key;
	const value = dataset.value;

	if (key === null || value === null) {
		return;
	}

	const filtered = items.filter((item) => item[key] === value);
	console.log(filtered);
	displayItems(filtered);
}

function setEventListeners(items) {
	const logo = document.querySelector('.logo');
	const buttons = document.querySelector('.buttons');
	logo.addEventListener('click', () => displayItems(items));
	buttons.addEventListener('click', (event) => {
		onButtonClick(event, items);
	});
}

//main
loadItems()
	.then((items) => {
		// console.log(items);
		displayItems(items);
		setEventListeners(items);
	})
	.catch(console.log);
