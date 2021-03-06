(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.praise_button = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var PraiseButton = exports.PraiseButton = function () {
        function PraiseButton() {
            _classCallCheck(this, PraiseButton);

            this.count = 0;
            this.praiseBtn = document.createElement("button");
            this.renderBtn();
        }

        _createClass(PraiseButton, [{
            key: "getPraise",
            value: function getPraise() {
                return this.count;
            }
        }, {
            key: "getBtn",
            value: function getBtn() {
                return this.praiseBtn;
            }
        }, {
            key: "renderBtn",
            value: function renderBtn() {
                var ctx = this;
                ctx.praiseBtn.innerHTML = "点赞" + ctx.count;
                document.body.appendChild(ctx.praiseBtn);
                ctx.praiseBtn.addEventListener('click', function () {
                    ctx.praise();
                });
            }
        }, {
            key: "praise",
            value: function praise() {
                var ctx = this;
                ctx.praiseBtn.innerHTML = "点赞" + ++ctx.count;
                return ctx.count;
            }
        }]);

        return PraiseButton;
    }();

    var Thumb = exports.Thumb = function (_PraiseButton) {
        _inherits(Thumb, _PraiseButton);

        function Thumb() {
            _classCallCheck(this, Thumb);

            var _this = _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this));

            _this.praiseType = "大拇指";

            return _this;
        }

        _createClass(Thumb, [{
            key: "renderBtn",
            value: function renderBtn() {
                var ctx = this;
                ctx.praiseBtn.innerHTML = "大拇指" + ctx.count;
                document.body.appendChild(ctx.praiseBtn);
                ctx.praiseBtn.addEventListener('click', function () {
                    ctx.praise();
                });
            }
        }, {
            key: "praise",
            value: function praise() {
                var ctx = this;
                ctx.praiseBtn.innerHTML = this.praiseType + ++ctx.count;
                return ctx.count;
            }
        }, {
            key: "getPraiseType",
            value: function getPraiseType() {
                return this.praiseType;
            }
        }]);

        return Thumb;
    }(PraiseButton);
});
