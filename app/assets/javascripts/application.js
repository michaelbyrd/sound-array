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

function readColumn(num) {
  var checked = $(".checkbox-"+num+":checked");
  var arr = [];
  $.each( checked, function(i, v) {
    arr.push( parseFloat( $(v).val() ) * 120 );
  });
  return arr;
}

function playColumn(num) {
  beat(readColumn(num));
}

function play() {
  playColumn(0);
  setTimeout(function(){playColumn(1)}, 1000);
  setTimeout(function(){playColumn(2)}, 3000);
  setTimeout(function(){playColumn(3)}, 4000);
  setTimeout(function(){playColumn(4)}, 5000);
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

