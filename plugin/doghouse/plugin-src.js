
const Plugin = () => {

	let render = function(input, locals) {
		const options = {pretty: true, doctype: "5"};
		const compile = pug.compile(input, options);
		let html = compile(locals);
		return html
	};

	let update = function(dataBlock, pugBlock, htmlBlock) {

		let data = null;
		if (dataBlock) {
			dataBlock = dataBlock.value ? dataBlock.value : dataBlock.textContent;
			data = JSON.parse(dataBlock);
		}
		let pugContent = pugBlock.textContent;

		let html = render(pugContent, data);
		html = html.trim();
		htmlBlock.textContent = html;

		if (Reveal.hasPlugin( 'highlight' )) {
			Reveal.getPlugin( 'highlight' ).highlightBlock(htmlBlock)
		}
	};



	const doghouse = function (deck) {

		setTimeout(function(){ 

			let doghouseAreas = deck.getRevealElement().querySelectorAll("[data-doghouse]");

			doghouseAreas.forEach(doghouseArea => {

				let dataBlock = doghouseArea.querySelector("[data-doghouse-data]") ? doghouseArea.querySelector("[data-doghouse-data]") : null;
				let pugBlock = doghouseArea.querySelector("[data-doghouse-pug]") ? doghouseArea.querySelector("[data-doghouse-pug]") : null;
				let htmlBlock = doghouseArea.querySelector("[data-doghouse-html]") ? doghouseArea.querySelector("[data-doghouse-html]") : null;

				update(dataBlock, pugBlock, htmlBlock);

				if (dataBlock) {
					dataBlock.addEventListener('input', () => {
						update(dataBlock, pugBlock, htmlBlock);
					});
				}
				if (pugBlock) {
					pugBlock.addEventListener('input', () => {
						update(dataBlock, pugBlock, htmlBlock);
					});
					pugBlock.addEventListener('blur', () => {
						update(dataBlock, pugBlock, htmlBlock);
					});
				}

			});
		 }, 500);
	}


	const init = function (deck) {
		deck.on( 'ready', event => { doghouse(deck) } );
	};

	return {
		id: 'doghouse',
		init: init
	};
};

export default Plugin;