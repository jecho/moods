
var moment = require('moment');

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

  handleMoodSubmit: function(newUri) {
    $.ajax({
      url: newUri.uri,
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
    setInterval(this.loadMoodDataFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="moodSlider">
        <MoodList onMoodSubmit={this.handleMoodSubmit} data={this.state.data} url={this.props.url} />
      </div>
    );
  }
});

var MoodList = React.createClass({
  getInitialState: function() {
    return {date: ''};
  },

  handleDateChange: function(e) {
    this.setState({date: e.target.value});
  },
  
  handleSubmit: function(e) {  
    e.preventDefault(); 

    var date = this.state.date.trim();
    var uriDate;

    if (date == 'default') 
      uriDate = this.props.url;
    else
      uriDate = this.props.url + date;
    
    this.props.onMoodSubmit({ uri: uriDate });
  },

  render: function() {
    var moodArray = []; 
    moodArray.push(
      <div itemStyle={{ backgroundColor: '#a2d7c7' }}>
        <div className="content">Hello, world.</div>
      </div>)
    moodArray.push(<div className="testScroller" itemStyle={{ backgroundColor: '#D49A6A' }}>
        <div className="content">
          How distant shall you go?
          <div className="dropdown_menu">
            <form className="moodSelectorForm" onSubmit={this.handleSubmit}>
              <select value={this.state.date} onChange={this.handleDateChange}>
                <option value={moment().format('YYYY-MM-DD')}>Today</option>
                <option value={moment().add(-1, 'days').format('YYYY-MM-DD')}>Yesterday</option>
                <option value={moment().add(-5, 'days').format('YYYY-MM-DD')}>5 Seasons Ago</option>
                <option value="default">DEFAULT</option>
              </select>
              <input type="submit" value="Tell us" />
            </form>
       </div></div></div>)
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
  <Controller url={config.MOOD_URI + config.MOOD_FREQUENCY} pollInterval={10000} />, // pollInterval={2000}
  document.getElementById('app')
);
