/**
 * Pattern class
 * @class Pattern
 * @memberOf fabric
 */
fabric.Pattern = fabric.util.createClass(/** @scope fabric.Pattern.prototype */ {

  /**
   * Repeat property of a pattern (one of repeat, repeat-x, repeat-y)
   * @property
   * @type String
   */
  repeat: 'repeat',

  /**
   * Pattern horizontal offset from object's left/top corner
   * @property
   * @type Number
   */
  offsetX: 0,

  /**
   * Pattern vertical offset from object's left/top corner
   * @property
   * @type String
   */
  offsetY: 0,

  /**
   * Constructor
   * @method initialize
   * @param {Object} [options]
   * @return {fabric.Pattern} thisArg
   */
  initialize: function(options) {
    options || (options = { });

    if (options.source) {
      this.source = typeof options.source === 'string'
        ? new Function(options.source)
        : options.source;
    }
    if (options.repeat) {
      this.repeat = options.repeat;
    }
    if (options.offsetX) {
      this.offsetX = options.offsetX;
    }
    if (options.offsetY) {
      this.offsetY = options.offsetY;
    }
  },

  /**
   * Returns object representation of a pattern
   * @method toObject
   * @return {Object}
   */
  toObject: function() {

    var source;

    // callback
    if (typeof this.source === 'function') {
      source = String(this.source)
                .match(/function\s+\w*\s*\(.*\)\s+\{([\s\S]*)\}/)[1];
    }
    // <img> element
    else if (typeof this.source.src === 'string') {
      source = this.source.src;
    }

    return {
      source: source,
      repeat: this.repeat,
      offsetX: this.offsetX,
      offsetY: this.offsetY
    };
  },

  /**
   * Returns an instance of CanvasPattern
   * @method toLive
   * @param ctx
   * @return {CanvasPattern}
   */
  toLive: function(ctx) {
    var source = typeof this.source === 'function' ? this.source() : this.source;
    return ctx.createPattern(source, this.repeat);
  }
});
