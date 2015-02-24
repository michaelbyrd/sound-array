// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {
  $("#play").on("click", beat);
  $("#stop").on("click", stopSounds);
  $("#noteA").val(440);
  $("#noteA").on("click", playSound);
});

function beat(freqs) {
  var arr = [];
  $.each(freqs, function(index, value) {
    arr.push(T("sin", {freq:value, mul:0.5}));
  });

  T("perc", {r:500}, arr).on("ended", function() {
    this.pause();
  }).bang().play();
}

function stopSounds() {
  T.pause();
}

function playSound(event) {
  var f = parseFloat($(event.target).val());
  console.log(f);
  T("sin", {freq:f, mul:0.5}).play();
}

