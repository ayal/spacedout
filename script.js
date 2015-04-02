// Code goes here
$(function(){

var cols = 6;
sowidth = $('.spacedout').width();
soheight = $('.spacedout').height();

var val;

$('textarea').keypress(function() {
  val = $(this).val()
  doSpacedOut(val);
})

doSpacedOut = function(val) {
  grid = _.groupBy(val.split(''), function(l, i) {
    return Math.floor(i / cols)
  });

  var cc = 
  _.map(
  _.map(grid, function(x) {
    return _.map(x, function(y) {
      var h = soheight / (val.length / cols);
      return $('<span class="col" />').css({'font-size': h * 0.5, width: sowidth / cols, height: h }).text(y)[0].outerHTML;

    })

  }), function(z){
    return $('<div class="row" />').html(z.join(''))[0].outerHTML;
  })
  
  
  $('.spacedout').html(cc.join(''));
}
  
})
