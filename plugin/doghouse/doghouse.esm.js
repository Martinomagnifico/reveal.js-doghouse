
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Doghouse.js for Reveal.js 
 * Version 1.0.0
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 ******************************************************************/


var Plugin = function Plugin() {
  var render = function render(input, locals) {
    var options = {
      pretty: true,
      doctype: "5"
    };
    var compile = pug.compile(input, options);
    var html = compile(locals);
    return html;
  };

  var update = function update(dataBlock, pugBlock, htmlBlock) {
    var data = null;

    if (dataBlock) {
      dataBlock = dataBlock.value ? dataBlock.value : dataBlock.textContent;
      data = JSON.parse(dataBlock);
    }

    var pugContent = pugBlock.textContent;
    var html = render(pugContent, data);
    html = html.trim();
    htmlBlock.textContent = html;

    if (Reveal.hasPlugin('highlight')) {
      Reveal.getPlugin('highlight').highlightBlock(htmlBlock);
    }
  };

  var doghouse = function doghouse(deck) {
    setTimeout(function () {
      var doghouseAreas = deck.getRevealElement().querySelectorAll("[data-doghouse]");
      doghouseAreas.forEach(function (doghouseArea) {
        var dataBlock = doghouseArea.querySelector("[data-doghouse-data]") ? doghouseArea.querySelector("[data-doghouse-data]") : null;
        var pugBlock = doghouseArea.querySelector("[data-doghouse-pug]") ? doghouseArea.querySelector("[data-doghouse-pug]") : null;
        var htmlBlock = doghouseArea.querySelector("[data-doghouse-html]") ? doghouseArea.querySelector("[data-doghouse-html]") : null;
        update(dataBlock, pugBlock, htmlBlock);

        if (dataBlock) {
          dataBlock.addEventListener('input', function () {
            update(dataBlock, pugBlock, htmlBlock);
          });
        }

        if (pugBlock) {
          pugBlock.addEventListener('input', function () {
            update(dataBlock, pugBlock, htmlBlock);
          });
          pugBlock.addEventListener('blur', function () {
            update(dataBlock, pugBlock, htmlBlock);
          });
        }
      });
    }, 500);
  };

  var init = function init(deck) {
    deck.on('ready', function (event) {
      doghouse(deck);
    });
  };

  return {
    id: 'doghouse',
    init: init
  };
};

export default Plugin;
