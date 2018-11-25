const cjk = require("cjk-regex");

const cjk_charset = cjk();
cjk_charset.toRegExp().test("a"); //=> false
cjk_charset.toRegExp().test("。"); //=> true
cjk_charset.toRegExp().test("中"); //=> true
