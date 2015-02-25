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

function readColumn(num) {
  var checked = $(".checkbox-"+num+":checked");
  var arr = [];
  $.each( checked, function(i, v) {
    arr.push( parseFloat( $(v).val() ));
  });
  return arr;
}

function superCollider() {
  sc.midicps([69, 72]);
}

function buildArray() {
  return [readColumn(0), readColumn(1), readColumn(2), readColumn(3),
          readColumn(4), readColumn(5), readColumn(6), readColumn(7),
          readColumn(8), readColumn(9), readColumn(10), readColumn(11),
          readColumn(12), readColumn(13), readColumn(14), readColumn(15)]
}

function play() {
  timbre.rec(function(output) {
    var midis = buildArray();

    var msec  = timbre.timevalue("bpm120 l8");
    var synth = T("OscGen", {env:T("perc", {r:msec, ar:true})});

    T("interval", {interval:msec}, function(count) {
      if (count < midis.length) {
        $.each( midis[count], function (i, v){
          synth.noteOn( v, 100);
        })
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
