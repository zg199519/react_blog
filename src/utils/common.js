// 文件流转base64位手机号
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function pasteHtmlAtCaret(html) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      var el = document.createElement('div');
      el.innerHTML = html;
      var frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != 'Control') {
    // IE9以下
    document.selection.createRange().pasteHTML(html);
  }
}

// 时间转换
export function getTimer(stringTime) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30;
  var time1 = new Date().getTime(); //当前的时间戳
  console.log(time1);
  var time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
  console.log(time2);
  var time = time1 - time2;

  var result = null;
  if (time < 0) {
    alert('设置的时间不能早于当前时间！');
  } else if (time / month >= 1) {
    result = parseInt(time / month) + '月前';
  } else if (time / week >= 1) {
    result = parseInt(time / week) + '周前';
  } else if (time / day >= 1) {
    result = parseInt(time / day) + '天前';
  } else if (time / hour >= 1) {
    result = parseInt(time / hour) + '小时前';
  } else if (time / minute >= 1) {
    result = parseInt(time / minute) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}

export function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

export function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
  } else {
    clientHeight = Math.max(
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
  }
  return clientHeight;
}

export function getScrollHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
}
