
var FILTER_VALS = {};
var el = document.getElementById("pic");

function go(me, className) {
  var activeButton = document.querySelector('button.active');
  if (activeButton) {
    activeButton.classList.remove('active');
    el.classList.remove(activeButton.textContent);
  }

  me.classList.add('active');
  el.classList.toggle(className);
}

function stop() {
  var activeButton = document.querySelector('button.active');
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  el.className = '';
}

function reset() {
  FILTER_VALS = {};
  render();
  document.querySelector('output').textContent = '-webkit-filter: none;';
  el.className = '';

  var ranges = document.querySelectorAll('input[type="range"]');
  for (var i = 0, r; r = ranges[i]; i++) {
    r.value = r.min;
  }
}

function set(filter, value) {
  FILTER_VALS[filter] = typeof value == 'number' ? Math.round(value * 10) / 10 : value;
  if (value == 0 || (typeof value == 'string' && value.indexOf('0') == 0)) {
    delete FILTER_VALS[filter];
  }
  render();
}

function render() {
  var vals = [];
  Object.keys(FILTER_VALS).sort().forEach(function(key, i) {
    vals.push(key + '(' + FILTER_VALS[key] + ')');
  });
  var val = vals.join(' ');
  el.style.webkitFilter = val;
  document.querySelector('output').textContent = '-webkit-filter: ' + (val ? val : 'none') + ';';
}

function jsonFlickrFeed(feed) {
  var items = feed.items;
  el.src = items[Math.floor(Math.random() * items.length)].media.m;
  el.onload = function(e) {
    this.parentElement.classList.add('drop-shadow');
  }
}

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 27) { // ESC
    document.querySelector('details').open = false;
  }
}, false);


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-22014378-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();