import { resolve as resolvePaths } from 'path';

export default class Plugin {
  /**
  * @static
  * @property defaultOptions
  */
  static defaultOptions = {};

  /**
  * @constructor
  * @param {AsyncEmitter} parent - the abigail instance
  * @param {string|number} value - a plugin command line argument value(ignore the boolean)
  * @param {object} [options={}] - passed from package.json `abigail>plugins` field
  */
  constructor(parent, value = true, options = {}) {
    if (typeof parent !== 'object' || typeof parent.on !== 'function') {
      throw new TypeError('parent is not a defined');
    }

    this.name = this.constructor.pluginName || require(resolvePaths(module.parent.id, '..', '..', 'package.json')).name;
    this.parent = parent;
    this.opts = Object.assign(
      {},
      { process },
      this.constructor.defaultOptions,
      options,
      typeof value !== 'boolean' ? { value } : {},
    );

    this.parent.once('attach-plugins', (...args) => this.pluginWillAttach(...args));
    this.parent.once('detach-plugins', (...args) => this.pluginWillDetach(...args));
  }

  /**
  * @method pluginWillAttach
  * @returns {undefined}
  */
  pluginWillAttach() {}

  /**
  * @method pluginWillDetach
  * @param {number} [exitCode=null] - process exit code
  * @returns {undefined}
  */
  pluginWillDetach() {}
}
