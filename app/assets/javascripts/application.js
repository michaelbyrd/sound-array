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
  $("#play").on("click", play);
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
    arr.push( parseFloat( $(v).val() ));
  });
  return arr;
}

function playColumn(num) {
  beat(readColumn(num));
}

function superCollider() {
  sc.midicps([69, 71]);
}

function play() {
  timbre.rec(function(output) {
    var midis = [[69,72], 71, 72, 76, 69, 71, 72, 76].scramble();
    var msec  = timbre.timevalue("bpm120 l8");
    var synth = T("OscGen", {env:T("perc", {r:msec, ar:true})});

    T("interval", {interval:msec}, function(count) {
      if (count < midis.length) {
        synth.noteOn(midis[count], 100);
      } else {
        output.done();
      }
    }).start();

    output.send(synth);
  }).then(function(result) {
    var L = T("buffer", {buffer:result, loop:true});
    var R = T("buffer", {buffer:result, loop:true});

    var num = 400;
    var duration = L.duration;

    R.pitch = (duration * (num - 1)) / (duration * num);

    T("delay", {time:"bpm120 l16", fb:0.1, cross:true},
      T("pan", {pos:-0.6}, L), T("pan", {pos:+0.6}, R)
    ).play();
  });
}


function stopSounds() {
  T.pause();
}

function playSound(event) {
  var f = parseFloat($(event.target).val());
  console.log(f);
  T("sin", {freq:f, mul:0.5}).play();
}
