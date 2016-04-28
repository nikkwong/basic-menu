;( function( $, window, document, undefined ) {

	"use strict";
		var pluginName = "qzMenu",
			defaults = {
				transparentOnTop: true,
				transparencyThreshold: 200,
				delta: 5,
				mobileMenuSize: 768,
				animate: true,
				enableDimmer: true,
				qzNav: 'qzNav',
				qzBtn: 'qzBtn',
				qzHeader: 'qzHeader'
			};

		function qzMenu ( element, options ) {
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
			this.navbarHeight = this.$qzNav.outerHeight();
			this.init();
		}

		$.extend( qzMenu.prototype, {
			init: function() {
				this.initListeners();
			},

			initListeners: function () {
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
			},

			//

			toggleMenu: function (e) {
				if (!this.$qzNav.hasClass('show') && !this.$qzNav.hasClass('hide')) {
					this.$qzNav.addClass('show');
					return;
				}
				this.$qzNav.toggleClass('show');
				this.$qzNav.toggleClass('hide');
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
            	if (st > _this._defaults.transparencyThreshold) {
            		_this.hideHeaderTransparency();
            	} else {
            		_this.showHeaderTransparency();
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

			showHeaderTransparency: function () {
				if (!this.$qzHeader.hasClass('transparent'))
					this.$qzHeader.addClass('transparent');
			}
		});

		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new qzMenu( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );