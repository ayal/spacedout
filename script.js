var Spacedout = React.createClass({
    getInitialState:function() {
        return {val:this.props.val, style:this.props.style, cols:this.props.cols};
    },
    valChanged: function() {
        var val = event.target.value;
        this.setState({val: val});
    },
    changeHeight: function() {
        var val = event.target.value;
        var style = _.clone(this.state.style);
        style.height = val;
        this.setState({style: style});
    },
    changeWidth: function() {
        var val = event.target.value;
        var style = _.clone(this.state.style);
        style.width = val;
        this.setState({style: style});
    },
    changeCols: function() {
        var val = event.target.value;
        this.setState({cols: val});
    },
    render: function() {
        var spacedout = this;
        var val = this.state.val;

        grid = _.groupBy(val.split(''), function(l, i) {
            return Math.floor(i / spacedout.state.cols);
        });


        grid =
                _.map(
                    _.map(grid, function(x) {
                        return _.map(x, function(y) {
                            var h = spacedout.state.style.height / Math.ceil(val.length / spacedout.state.cols);
                            return <span className="col" style={{'font-size': h * 0.5, width: spacedout.state.style.width / spacedout.state.cols, height: h}}>{y}</span>;
                        });

                    }), function(z) {
                        return <div className="row">{z}</div>;
                    });


        return (
<div>
                <div className="editor">
                <textarea value={this.state.val} onChange={this.valChanged}></textarea>
                <input value={this.state.style.height} onChange={this.changeHeight} />
                <input value={this.state.style.width} onChange={this.changeWidth} />
                <input value={this.state.cols} onChange={this.changeCols} />
                </div>
<div>
                <pre className="spacedout" style={this.state.style}>
                {grid}
            </pre>

                </div>

                </div>
        );
    }
});


var spacedoutstyle = {width:200,height:200,border:'6px solid white', padding:30, 'font-family': "futura-pt",'font-weight':500,color:'white'};
React.render(
  <Spacedout cols={3} val="spacedout" style={spacedoutstyle} />,
  document.getElementById('container')
);
