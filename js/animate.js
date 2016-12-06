/**
 * Created by Administrator on 2016/10/26.
 */
;(function () {
    function animate(ele, target, duration/*,animateEffect*/,callback) {

        var time = 0, begin = {}, change = {},interval = 10;
        duration = duration || 2000;
        var effect={
            Linear: function (t, b, c, d) {
                return b + t / d * c;
            }
        };
        for (var key in target) {
            begin[key] = utils.css(ele, key);
            change[key] = target[key] - begin[key];
        }
        if (ele.timer) {
            window.clearInterval(ele.timer);
        }
        ele.timer = window.setInterval(function () {
            time += interval;
            if (time > duration) {
                window.clearInterval(ele.timer);
                utils.css(ele, target);
                if(typeof callback =='function'){
                    /*//callback函数在这里执行函数中的this是window
                    * 把回调函数中的this修改成ele*/
                    callback.call(ele);
                }
                return;
            }
            for (var key in change) {
                if (change[key]) {
                    var val = effect.Linear(time, begin[key], change[key], duration);
                    utils.css(ele, key, val);
                }
            }

        }, interval);
    }

    /*把这个私有函数animate添加到window的animate属性上，属于主动暴露接口*/
    window.animate = animate;
})();
