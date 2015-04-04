/**
 * sidebarEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 var SidebarMenuEffects = (function() {

 	function hasParentClass( e, classname ) {
		if(e === document) return false;
		if( classie.has( e, classname ) ) {
			return true;
		}
		return e.parentNode && hasParentClass( e.parentNode, classname );
	}

	// http://coveroverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	window.initMenu = (function() {
		var container = document.getElementById( 'st-container' ),
			buttons = Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > button' ) ),

			// event type (if mobile use touch events)
			eventtype = mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function() {
				classie.remove( container, 'st-menu-open' );
			},
			bodyClickFn = function(evt) {
				if( !hasParentClass( evt.target, 'st-menu' ) ) {
					resetMenu();
					document.removeEventListener( eventtype, bodyClickFn );
				}
			};

		buttons.forEach( function( el, i ) {
			var effect = el.getAttribute( 'data-effect' );

			el.addEventListener( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();
				container.className = 'st-container'; // clear
				classie.add( container, effect );
				setTimeout( function() {
					classie.add( container, 'st-menu-open' );
				}, 25 );
				document.addEventListener( eventtype, bodyClickFn );
			});
		} );

	});
})();

// end menu code

var Spacedout = React.createClass({
    render: function() {
        var spacedout = this;
        var val = this.props.val;
        var colz = spacedout.props.cols || 1;
        grid = _.groupBy(val.split(''), function(l, i) {
            return Math.floor(i / colz);
        });


        grid =
                _.map(
                    _.map(grid, function(x) {
                        return _.map(x, function(y) {
                            var h = spacedout.props.height / Math.ceil(val.length / colz);
                            return <span className="col" style={{'font-size': h * 0.5, width: spacedout.props.width / colz, height: h}}>{y}</span>;
                        });

                    }), function(z) {
                        return <div className="row">{z}</div>;
                    });

        console.log(this.props.color);

        return (
                <div>
                <div>
                <div className="spacedout" style={this.props}>{grid}</div>
                </div>
                </div>
        );
    }
});


var App = React.createClass({
    getInitialState: function() {
        return {menustate: ''};
    },
    contextTypes: {
        router: React.PropTypes.func
    },
    componentWillMount: function() {
        var cquery = this.context.router.getCurrentQuery();
        var def = {val: 'SPACED OUT~', width:300, height:300, cols:3, color:'#ffffff', g1: "#28384d", g2: '#8e4a9f', padding:10, border:4};

        this.context.router.transitionTo('/spacedout', '', _.extend(def,cquery));
    },
    nav: function(name) {
        var that = this;
        return function(e) {
            console.log('value change',e.target.value);
            var val = event.target.value;
            var q = {};
            q[name] = val;
            that._nav(q);
        };
    },
    _nav: function(q) {
        var cquery = this.context.router.getCurrentQuery();
        this.context.router.transitionTo('/spacedout', '', _.extend(cquery,q));
    },
    componentDidMount: function() {

    },
    nomenu: function() {
        this.setState({menustate:''});
    },
    share: function() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    },
    edit: function(ev) {
        ev.stopPropagation();
	ev.preventDefault();
        this.setState({menustate: 'st-menu-open'});
    },
    render: function () {
        //    background: linear-gradient(to bottom,  );
        query = this.context.router.getCurrentQuery();


        var bgstyle = {background:'url("' + query.bgurl + '")', '-webkit-filter': query.filter,
                       'background-position-x': query.bgx, 'background-position-y': query.bgy,
                      opacity:query.opacity, transform: query.transform,
                      'background-size': query.bgsize + 'px'} ;

        makeinput = function(name,type,min,max,step) {
            return (<div style={{position:'relative'}}>
                    <label style={{color:query.color,transform:'translateY(-50%)',position:'absolute',top:'50%'}}>{name}</label>
                    <span>
                    <input type={type} min={min} max={max} step={step || 1} value={query[name]} onChange={this.nav(name)} />
                    </span>
                    </div>);
        }.bind(this);

        return (
            <div className={"wrap st-container st-effect-11 " + this.state.menustate} id="st-container" style={{background:"linear-gradient(to bottom, " + query.g1 + "," + query.g2 + ")"}}>

                <nav className="st-menu st-effect-11" id="menu-2" style={{background:query.g1}}>
		 <ul>
                <div className="editor">
                <div style={{position:'relative'}}><label style={{color:query.color,transform:'translateY(-50%)',position:'absolute',top:'50%'}} >Text</label><textarea value={query.val} onChange={this.nav('val')}></textarea></div>
                {makeinput('height','range',50,1000)}
                {makeinput('width','range',50,1000)}
                {makeinput('cols','range',1,10)}
                {makeinput('padding','range',10,100)}
                {makeinput('border','range',0,15)}
            {makeinput('color','color')}
            {makeinput('g1','color')}
            {makeinput('g2','color')}

            {makeinput('bgurl')}
            {makeinput('filter')}
            {makeinput('bgsize','range',100,1000)}
            {makeinput('transform')}

                {makeinput('bgx','range',-500,500)}
                {makeinput('bgy','range',-500,500)}
                {makeinput('opacity','range',0,1,0.1)}
                </div>

		 </ul>
		</nav>

                <div className="st-pusher" onClick={this.nomenu} >
                <div className="bgimage" style={bgstyle}></div>
                <div id="st-trigger-effects">
                <button id="menubutton" style={{background:query.g2}} onClick={this.edit}>EDIT</button>
                </div>
                <button id="sharebutton" style={{background:query.g2}} onClick={this.share}>SHARE</button>
                <a href="/spacedout?val=AYAL%20GELLES©&width=344&height=354&cols=4&color=%23ffffff&g1=%23f185ad&g2=%2344a0a6&padding=28&border=8" target="_blank" className="credit" style={{color:query.color,fontSize:'13px'}}>Who made this?</a>


                <Spacedout cols={query.cols} val={query.val} nav={this.nav} width={query.width} height={query.height} border={query.border + "px solid " + query.color} padding={query.padding} fontFamily="futura-pt" fontWeight={query.fontweight || 500} color={query.color} g1={query.g1} g2={query.g2} sobackground={"linear-gradient(to bottom, " + query.g1 + ", " + query.g2 + ");"} />
                </div>
                </div>
        );
  }
});


console.log('rendering app');

var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route handler={App} path="*">
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
