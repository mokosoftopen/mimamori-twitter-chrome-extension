
var bo_rt_view = false;

var now_time = 0;

var timeclose = 86400;

var timer1;

var stg_key;
var save_timing = 0;

$(function () {
    
    stg_key = "now_time_"+moment().format('YYYYMMDD');
    
    var vv = {selected_timeclose: 3600};
    vv[stg_key] = 0;
    
    chrome.storage.sync.get(vv, function (value) {
        timeclose = value.selected_timeclose;
        now_time = value[stg_key];
        if(now_time==null){
            now_time=0;
        }
        
        timer1 = setInterval(timer_count, 1000);
  
  if ( now_time>timeclose ) {
    timer_close();
  }
    });
        
    $('body').append('<div style="position:fixed;top:0;right:0;margin:10;width:auto;background-color:#eeeeee;color:black;z-index:99999;" id="mimamori_twitter">'+' '+'</div>');
    
});


function timer_close() {
    
    clearInterval(timer1);
    
    $('body').html('<div style="position:fixed;top:0;right:0;left:0;bottom:0;margin:0;width:100%;height:100%;background-color:#000000;color:white;z-index:999999;display:table;" id="mimamori_twitter_close">'+'<div style="display:table-cell;font-size:50px;text-align:center;vertical-align:middle;">１日の利用時間を過ぎました。</div>'+'</div>');
    
}


function timer_count() {
    
    now_time++;
    
    var fun = String(Math.floor(now_time / 60));
    var byo = String(now_time % 60);
    
    
    if ( fun.length <= 1 ) {
        fun = "0"+fun;
    }
    if ( byo.length <= 1 ) {
        byo = "0"+byo;
    }
    
    
    var tim = fun + ":" +byo;
    if ( now_time < 60 ) {
        tim = "00:"+byo;
    }
    
    var nokori_time = timeclose - now_time;
    var nokori_fun = Math.floor(nokori_time/60);
    var nokori = "<br>あと "+nokori_fun+"分";
    if(nokori_fun>=60){
        var nokori_jikan = Math.floor(nokori_fun/60);
        var nokori_funz = nokori_fun % 60;
        nokori = "<br>あと "+nokori_jikan+"時間"+nokori_funz+"分";
    }
    
    
    
    $('#mimamori_twitter').html(tim+nokori);
      //console.log(now_time);
      
      var value = {};
      value[stg_key] = now_time;
      
      if ( save_timing == 0 ) {
       	chrome.storage.sync.set(value, function() {
    
  		});
  	  }
  	  save_timing++;
  	  if(save_timing>=2){
  	  	save_timing = 0;
  	  }	
      //localStorage.setItem(stg_key, now_time);
      
      
      if ( now_time > timeclose ) {
        
        timer_close();
        
    }
    
}

