/**
 * Config
 */
( function ( root, factory ) {

	if ( typeof define === 'function' && define.amd ) {

		define( [
			'jquery',
			'./Util'
		], factory );

	} else if ( typeof exports === 'object' ) {

		module.exports = factory(
			require( 'jquery' ),
			require( './Util' )
		);

	} else {

		root.AdManager = root.AdManager || {};

		root.AdManager.Config = factory(
			root.jQuery,
			root.AdManager.Util
		);

	}

} ( this, function ( $, Util ) {

	var name = 'Config',
		debugEnabled = true,
		debug = debugEnabled ? Util.debug : function () {},
		config = {};

	//////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Initialize the config module.
	 *
	 * @param  {Object} newConfig The AdManager config object.
	 */
	function init( newConfig ) {

		debug( name + ': initialized' );

		config = $.extend( {
			account: 0,
			clientType: false,
			context: 'body',
			enabled: true,
			insertExclusion: [],
			insertionEnabled: false,
			inventory: [],
			pageConfigAttr: false,
			targeting: []
		}, newConfig );

	}

	/**
	 * Set
	 *
	 * @param {String} key
	 * @param {Mixed}  value
	 */
	function set( key, value ) {

		config[ key ] = value;

	}

	/**
	 * Get
	 *
	 * @param  {String|Null} key Optional.
	 * @return {Mixed}
	 */
	function get( key ) {

		key = key || false;

		if ( ! key ) {
			return config;
		}

		return key in config ? config[ key ] : null;

	}

	/**
	 * Import JSON page config data from DOM
	 *
	 * This imports inline JSON via data attribute
	 * and extends an existing config with it.
	 *
	 * @param object options.$context
	 * @param string options.attrName
	 * @return object
	 */
	function importConfig( options ) {

		var $context = options.$context,
			attrName = options.attrName,
			existConfig = options.existConfig,
			selector,
			newConfig,
			data = {};

		selector = '*[data-' + attrName + ']';
		newConfig = $.extend( {}, existConfig );
		data = $context.find( selector ).data( attrName );

		if ( typeof newConfig === 'object' ) {
			newConfig = $.extend( newConfig, data );
		}

		return newConfig;

	}

	//////////////////////////////////////////////////////////////////////////////////////

	return {
		init: init,
		set:  set,
		get:  get
	};

} ) );