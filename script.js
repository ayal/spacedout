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
        var val = this.props.val || '';
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


        return (
                <div>
                <div className="editor">
                <textarea value={this.props.val} onChange={this.nav('val')}></textarea>
                <input value={this.props.height} onChange={this.nav('height')} />
                <input value={this.props.width} onChange={this.nav('width')} />
                <input value={this.props.cols || ''} onChange={this.nav('cols')} />
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
        this.context.router.transitionTo('/spacedout', '', _.extend(cquery,q));
    },
    render: function () {
        query = this.context.router.getCurrentQuery();

        var spacedoutstyle = {};
        return (
                <Spacedout cols={query.cols} val={query.val} style={spacedoutstyle} nav={this.nav} width={query.width} height={query.height} border="6px solid white" padding={query.padding || 30} fontFamily="futura-pt" fontWeight={query.fontweight || 500} color={query.color || "white"} />
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
