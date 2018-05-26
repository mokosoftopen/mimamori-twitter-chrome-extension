// 設定画面で保存ボタンを押されたら
function save_options() {
    
  // 設定値を変数に格納  
  var timeclose = document.getElementById('timeclose').value;
  
  chrome.storage.sync.set({
    selected_timeclose: timeclose,
  }, function() {
    // 保存できたら、画面にメッセージを表示(0.75秒だけ)
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  
   }
 
// 設定画面で設定を表示する
function restore_options() {
    
    chrome.storage.sync.get({selected_timeclose: 3600}, function (value) {
        var timeclose = value.selected_timeclose;
        document.getElementById('timeclose').value = timeclose;
    });
      
}
 
// 画面表示と保存ボタンのイベントを設定
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
