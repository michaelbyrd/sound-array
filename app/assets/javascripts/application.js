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
  $("#play").on("click", fourBeats);
  $("#stop").on("click", stopSounds);
  $("#noteA").val(440);
  $("#noteA").on("click", playSound);
});

function beat(freqs) {
  var arr = [];
  $.each(freqs, function(index, value) {
    arr.push(T("sin", {freq:value, mul:0.5}));
  });

  T("perc", {r:1000}, arr).on("ended", function() {
    this.pause();
  }).bang().play();
}

function majorChord(number) {
  return [number, number*4/6, number*5/6];
}

function minorChord(number) {
  return [number, number*10/15, number*12/15]
}

function fourBeats() {
  var c = majorChord(400);
  var d = minorChord(333.33);
  playMajorChord(400);
  setTimeout(function(){playMajorChord(333.333)}, 1000);
  setTimeout(function(){playMajorChord(666.666)}, 2000);
}

function playMajorChord(number) {
  var c = majorChord(number);
  beat(c);
}

function playMinorChord(number) {
  var c = minorChord(number);
  beat(c);
}

function stopSounds() {
  T.pause();
}

function playSound(event) {
  var f = parseFloat($(event.target).val());
  console.log(f);
  T("sin", {freq:f, mul:0.5}).play();
}

