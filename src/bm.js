;( function( $, window, document, undefined ) {

	"use strict";
		var pluginName = "bm",
			defaults = {
				transparentOnTop: true,
				transparencyThreshold: 200,
				delta: 5,
				enableDimmer: true,
				bmDimmer: 'bmDimmer',
				bmNav: 'bmNav',
				bmBtn: 'bmBtn',
				bmHeader: 'bmHeader'
			};

		function bm ( element, options ) {
			this.scrollTimeout = null;
			this.lastScrollTop = 0;
			this.navActivated = false;
			this.element = element;
			this.$el = $(this.element);
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.$bmHeader = this.$el.find($('#' + this._defaults.bmHeader));
			this.$bmBtn = this.$el.find($('#' + this._defaults.bmBtn));
			this.$bmNav = this.$el.find($('#' + this._defaults.bmNav));
			this.$bmDimmer = this.$el.find($('#' + this._defaults.bmDimmer));
			this.navbarHeight = this.$bmNav.outerHeight();
			this.init();
		}

		$.extend( bm.prototype, {
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

				this.$bmBtn.click(function(e) {
					this.toggleMenu();
				}.bind(this));

				this.$bmNav.on('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', 
				    	function() {
				    		// navBox is hidden?
				    		if (!$(this).hasClass('show'))
								$(this).removeClass('transitionDisplay');
						}
				    );

				// Wait for transition end to hide dimmer.
				if (this._defaults.enableDimmer) {
					this.$bmDimmer.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', 
				    	function() {
				    		// navBox is hidden?
				    		if (!$(this).hasClass('show')) {
								$(this).addClass('hide');
								$(this).removeClass('transitionDisplay');
				    		}
						}
				    );

				    this.$bmDimmer.on('click', function () {
				    	_this.hideNav();
				    })
				}
			},

			//

			toggleMenu: function (e) {

				var _this = this;

				if (!_this.$bmNav.hasClass('show') && !_this.$bmNav.hasClass('hide')) {
					_this.showNav();
					return;
				}

				_this.$bmNav.hasClass('show') ? _this.hideNav() : _this.showNav();

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
			    this.$bmHeader.removeClass('show');
			    this.$bmHeader.addClass('hide');
			},

			showHeader: function () {
			    this.$bmHeader.removeClass('hide');
			    this.$bmHeader.addClass('show');
			},

			hideHeaderTransparency: function () {
				if (this.$bmHeader.hasClass('transparent'))
					this.$bmHeader.removeClass('transparent');
			},

			hideNav: function () {
				this.$bmNav.removeClass('show');
				this.$bmNav.addClass('hide');
				this.hideDimmer();
				this.navActivated = false;
			},

			showNav: function () {
				this.$bmNav.removeClass('hide');
				this.$bmNav.addClass('show');
				this.$bmNav.addClass('transitionDisplay');
				this.showDimmer();
				this.navActivated = true;
			},

			showHeaderTransparency: function () {
				if (!this.$bmHeader.hasClass('transparent'))
					this.$bmHeader.addClass('transparent');
			},

			hideDimmer: function () {
				if(this._defaults.enableDimmer)
					this.$bmDimmer.removeClass('show');
			},

			showDimmer: function () {
				if(this._defaults.enableDimmer)
					this.$bmDimmer.removeClass('hide');
					this.$bmDimmer.addClass('show');
					this.$bmDimmer.addClass('transitionDisplay');
			}
		});

		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new bm( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );