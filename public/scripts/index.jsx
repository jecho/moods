
var Controller = React.createClass({
  loadMoodDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadMoodDataFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="moodSlider">
        <MoodList data={this.state.data} />
      </div>
    );
  }
});

var MoodList = React.createClass({
  render: function() {
    var moodArray = []; 
    moodArray.push(
      <div itemStyle={{ backgroundColor: '#a2d7c7' }}>
        <div className="content">Hello, world.</div>
      </div>)
    this.props.data.map(function(mood, i) {
      return (
        moodArray.push(
          <div key={i} itemStyle={{ backgroundColor: mood._id }}>
            <div className="content">Most are typically <i>{mood.tag}</i> today, right?</div>
            <br/>
            <div className="content">{mood.freq}!</div>
          </div>)
        );
    });

    return (
      <ViewportSlider>
        {moodArray}
      </ViewportSlider>
    );
  }
});

var Mood = React.createClass({
  render: function() {
    return (
      <div key={this.props.data._id} itemStyle={{ backgroundColor: this.props.data }}>
        <div className="content">Hello, world. {this.props.data}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <Controller url={config.MOOD_URI + config.MOOD_FREQUENCY} pollInterval={15000} />,
  document.getElementById('app')
);
