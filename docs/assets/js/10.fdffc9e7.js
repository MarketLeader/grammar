(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{193:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),a("p",[t._v("Imagine the following grammar:")]),t._v(" "),t._m(3),a("p",[t._v('The first alternative is a prefix of the second alternative.\nNow lets consider the input ["A", "B"].\nFor this input the first alternative would be matched as expected.')]),t._v(" "),t._m(4),t._v(" "),a("p",[t._v("There are two ways to resolve this:")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),a("p",[t._v("Keeping this property in mind lets look at a few common causes of such an error\nThis parser")]),t._v(" "),a("ul",[t._m(8),t._v(" "),t._m(9),t._v(" "),a("li",[a("p",[t._v("This error may also occur due to source code transformations of the parser.\nSee: "),a("a",{attrs:{href:"http://sap.github.io/chevrotain/docs/FAQ.html#MINIFIED",target:"_blank",rel:"noopener noreferrer"}},[t._v("Minification"),a("OutboundLink")],1),t._v("\nand "),a("a",{attrs:{href:"http://sap.github.io/chevrotain/docs/FAQ.html#WEBPACK",target:"_blank",rel:"noopener noreferrer"}},[t._v("Webpack"),a("OutboundLink")],1),t._v(" FAQ sections.")]),t._v(" "),a("p",[t._v("Basically if a code snippet such as:")]),t._v(" "),t._m(10),a("p",[t._v("gets transformed to something like")]),t._v(" "),t._m(11),a("p",[t._v("Then the literal form no longer matches the name property...")])])])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"resolving-grammar-errors"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#resolving-grammar-errors","aria-hidden":"true"}},[this._v("#")]),this._v(" Resolving Grammar Errors")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("a",{attrs:{href:"#COMMON_PREFIX"}},[this._v("Common Prefix Ambiguities.")])]),this._v(" "),s("li",[s("a",{attrs:{href:"#TERMINAL_NAME_NOT_FOUND"}},[this._v("Terminal Token Name Not Found.")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"COMMON_PREFIX"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#COMMON_PREFIX","aria-hidden":"true"}},[this._v("#")]),this._v(" Common Prefix Ambiguities")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-antlr extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v('myRule:\n  "A" "B" |\n  "A" "B" "C"\n')])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v('However for the input ["A", "B", "C"] the first\nalternative would still be matched but this time '),s("strong",[this._v("incorrectly")]),this._v("\nas alternation matches are attempted "),s("strong",[this._v("in order")]),this._v(".")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("p",[this._v("Reorder the alternatives so that shorter common prefix lookahead\npaths appears after the longer ones.")]),this._v(" "),s("div",{staticClass:"language-antlr extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v('myRule:\n  "A" "B" "C" |\n  "A" "B"\n')])])])]),this._v(" "),s("li",[s("p",[this._v("Refactor the grammar to extract common prefixes.")]),this._v(" "),s("div",{staticClass:"language-antlr extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v('  myRule:\n    "A" "B" ("C")?\n')])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"TERMINAL_NAME_NOT_FOUND"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#TERMINAL_NAME_NOT_FOUND","aria-hidden":"true"}},[this._v("#")]),this._v(" Terminal Token Name Not Found")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("This error occurs when Chevrotain cannot find a TokenType used in a CONSUME call.\nNote that Chevrotain identifies the TokenType "),s("strong",[this._v("literally")]),this._v(" that is to say\nChevrotain "),s("strong",[this._v("reads")]),this._v(" the parser's source code (static analysis) not the value at runtime.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",[a("p",[t._v("The TokenType's name does not match its literal form.")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createToken"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Parser "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"chevrotain"')]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v('// note the name property "copyPastaMistake" is different that the variable name "Integer"')]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Integer "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("createToken")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"copyPastaMistake"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pattern"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/\\d+/")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" allTokens "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Integer"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("MyParser")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Parser")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("constructor")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("super")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" allTokens"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        $"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("RULE")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"MyRule"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{attrs:{class:"token comment"}},[t._v('// Will cause "Terminal Token Name Not Found"')]),t._v("\n            "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("CONSUME")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Integer"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",[a("p",[t._v("The TokenType's was not provided to the parser in the tokenDictionary argument.")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createToken"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Parser "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"chevrotain"')]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Integer "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("createToken")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"Integer"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pattern"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/\\d+/")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// Opps we forgot to add the Integer Token to the TokenDictionary")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" allTokens "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("MyParser")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Parser")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("constructor")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("super")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" allTokens"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" config"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        $"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("RULE")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"MyRule"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{attrs:{class:"token comment"}},[t._v('// Will cause "Terminal Token Name Not Found"')]),t._v("\n            "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("CONSUME")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Integer"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Integer "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("createToken")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"Integer"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pattern"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/\\d+/")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("CONSUME")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Integer"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" v14 "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("createToken")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"Integer"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pattern"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/\\d+/")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("CONSUME")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v14"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])}],!1,null,null,null);e.options.__file="resolving_grammar_errors.md";s.default=e.exports}}]);