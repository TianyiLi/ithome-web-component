## Day2 Custom Input

### 為什麼需要？

在處理表單的時候，input算是最常處理到的輸入欄位了，如果又有特殊的需求的話，自己做一個客製化input的component，將自己最常用到的部分進行包裝，以後使用上就會很方便了

這次的範例就是當遇到一些比較特殊的格式要顯示給人看，這時候就可以當輸入完畢觸發`onChange`的時候將 value 做一次處理，再將他傳回到上層

另外，可能也會有些提示相關的 icon、文字 等放在input的尾端，這時候也可以另外提供個`suffix`欄位出來，讓後續使用上可以更方便

### 處理spec的function

`spec`是專門提供給使用者輸入的，在這邊是以`_`代表數字應該在的位置，以美國的電話號碼為例子

> (___) ___ - ____

在輸入的時候就可以被代換

> (123) 456 - 7890

```js
function format(spec = '', input = '', isDelete = false) {
  // getAvailable length;
  if (isDelete) return input;
  const fillinInput = input.replace(/[^\d]/g, '').split('');
  const finalString = spec.replace(/(_)/g, () => fillinInput.shift() || '');
  if (/_/.test(finalString[input.length])) {
    return finalString.substr(0, Math.min(spec.length, input.length));
  }
  return finalString.substr(0, spec.length);
}
```
