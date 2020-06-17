// 文件流转base64位手机号
export function getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/**
 *往输入域中插入字符串(光标所在位置)
 *@param $t document.getElementById('fieldId')
 *@param myValue 要插入的值
 **/
export function addSplitToField($t,myValue){
	if (document.selection) {
		$t.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		$t.focus();
	}else if($t.selectionStart || $t.selectionStart == '0') {
		var startPos = $t.selectionStart;
		var endPos = $t.selectionEnd;
		var scrollTop = $t.scrollTop;
		$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
		this.focus();
		$t.selectionStart = startPos + myValue.length;
		$t.selectionEnd = startPos + myValue.length;
		$t.scrollTop = scrollTop;
	}else{
		$t.value += myValue;
		$t.focus();
	}
}
