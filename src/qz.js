;( function( $, window, document, undefined ) {

	"use strict";
		var pluginName = "qz",
			defaults = {
				transparentOnTop: true,
				transparencyThreshold: 200,
				delta: 5,
				enableDimmer: true,
				qzDimmer: 'qzDimmer',
				qzNav: 'qzNav',
				qzBtn: 'qzBtn',
				qzHeader: 'qzHeader'
			};

		function qz ( element, options ) {
			this.scrollTimeout = null;
			this.lastScrollTop = 0;
			this.navActivated = false;
			this.element = element;
			this.$el = $(this.element);
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.$qzHeader = this.$el.find($('#' + this._defaults.qzHeader));
			this.$qzBtn = this.$el.find($('#' + this._defaults.qzBtn));
			this.$qzNav = this.$el.find($('#' + this._defaults.qzNav));
			this.$qzDimmer = this.$el.find($('#' + this._defaults.qzDimmer));
			this.navbarHeight = this.$qzNav.outerHeight();
			this.init();
		}

		$.extend( qz.prototype, {
			init: function() {
				this.initListeners();
			},

			initListeners: function () {

				var _this = this; 

				$(window).scroll(function () {
				    if (this.scrollTimeout) {
				        clearTimeout(this.scrollTimeout);
				        this.scrollTimeout = null;
				    }
				    this.scrollTimeout = setTimeout(this.scrollHandler.apply(this), 250);
				}.bind(this));

				this.$qzBtn.click(function(e) {
					this.toggleMenu();
				}.bind(this));

				this.$qzNav.on('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', 
				    	function() {
				    		// navBox is hidden?
				    		if (!$(this).hasClass('show'))
								$(this).removeClass('transitionDisplay');
						}
				    );

				// Wait for transition end to hide dimmer.
				if (this._defaults.enableDimmer) {
					this.$qzDimmer.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', 
				    	function() {
				    		// navBox is hidden?
				    		if (!$(this).hasClass('show')) {
								$(this).addClass('hide');
								$(this).removeClass('transitionDisplay');
				    		}
						}
				    );

				    this.$qzDimmer.on('click', function () {
				    	_this.hideNav();
				    })
				}
			},

			//

			toggleMenu: function (e) {

				var _this = this;

				if (!_this.$qzNav.hasClass('show') && !_this.$qzNav.hasClass('hide')) {
					_this.showNav();
					return;
				}

				_this.$qzNav.hasClass('show') ? _this.hideNav() : _this.showNav();

			},

			// Respond to events!!

			scrollHandler: function () {
				var _this = this;
				var st = $(window).scrollTop();

				// Scroll pos
            	if(Math.abs(_this.lastScrollTop - st) <= _this._defaults.delta)
            		return;

            	if (st > _this.lastScrollTop && st > _this.navbarHeight) {
            		_this.hideHeader();
            	} else {
            		_this.showHeader();
            	}

            	// Transparency
            	if (_this._defaults.transparentOnTop) {
	            	if (st > _this._defaults.transparencyThreshold) {
	            		_this.hideHeaderTransparency();
	            	} else {
	            		_this.showHeaderTransparency();
	            	}
	            }

            	if (_this.navActivated) {
            		_this.hideNav();
            	}


			    _this.lastScrollTop = st;
			},

			// Convenience methods;

			hideHeader: function () {
			    this.$qzHeader.removeClass('show');
			    this.$qzHeader.addClass('hide');
			},

			showHeader: function () {
			    this.$qzHeader.removeClass('hide');
			    this.$qzHeader.addClass('show');
			},

			hideHeaderTransparency: function () {
				if (this.$qzHeader.hasClass('transparent'))
					this.$qzHeader.removeClass('transparent');
			},

			hideNav: function () {
				this.$qzNav.removeClass('show');
				this.$qzNav.addClass('hide');
				this.hideDimmer();
				this.navActivated = false;
			},

			showNav: function () {
				this.$qzNav.removeClass('hide');
				this.$qzNav.addClass('show');
				this.$qzNav.addClass('transitionDisplay');
				this.showDimmer();
				this.navActivated = true;
			},

			showHeaderTransparency: function () {
				if (!this.$qzHeader.hasClass('transparent'))
					this.$qzHeader.addClass('transparent');
			},

			hideDimmer: function () {
				if(this._defaults.enableDimmer)
					this.$qzDimmer.removeClass('show');
			},

			showDimmer: function () {
				if(this._defaults.enableDimmer)
					this.$qzDimmer.removeClass('hide');
					this.$qzDimmer.addClass('show');
					this.$qzDimmer.addClass('transitionDisplay');
			}
		});

		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new qz( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );