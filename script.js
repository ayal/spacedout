var Spacedout = React.createClass({
    nav: function(name) {
        var that = this;
        return function(e) {
            var val = event.target.value;
            var q = {};
            q[name] = val;
            that.props.nav(q);
        };
    },
    render: function() {
        var spacedout = this;
        var val = this.props.val;

        grid = _.groupBy(val.split(''), function(l, i) {
            return Math.floor(i / spacedout.props.cols);
        });


        grid =
                _.map(
                    _.map(grid, function(x) {
                        return _.map(x, function(y) {
                            var h = spacedout.props.height / Math.ceil(val.length / spacedout.props.cols);
                            return <span className="col" style={{'font-size': h * 0.5, width: spacedout.props.width / spacedout.props.cols, height: h}}>{y}</span>;
                        });

                    }), function(z) {
                        return <div className="row">{z}</div>;
                    });


        return (
                <div>
                <div className="editor">
                <textarea value={this.props.val} onChange={this.nav('val')}></textarea>
                <input value={this.props.height} onChange={this.nav('height')} />
                <input value={this.props.width} onChange={this.nav('width')} />
                <input value={this.props.cols} onChange={this.nav('cols')} />
                </div>
                <div>
                <pre className="spacedout" style={this.props}>{grid}</pre>
                </div>
                </div>
        );
    }
});


var App = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    nav: function(q) {
        var cquery = this.context.router.getCurrentQuery();
        this.context.router.transitionTo('/', '', _.extend(cquery,q));
        this.forceUpdate();
    },
    render: function () {
        query = this.context.router.getCurrentQuery();

        var spacedoutstyle = {};
        return (
                <Spacedout cols={parseInt(query.cols) || 3} val={query.val || "spacedout"} style={spacedoutstyle} nav={this.nav} width={query.width || 200} height={query.height || 200} border="6px solid white" padding={query.padding || 30} fontFamily="futura-pt" fontWeight={query.fontweight || 500} color={query.color || "white"} />
        );
  }
});




var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route handler={App} path="/">
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
