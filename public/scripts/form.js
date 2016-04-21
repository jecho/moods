var FormComponent = React.createClass({
  handleMoodSubmit: function(mood) {
    var moodJson = JSON.stringify(mood);
    console.log(moodJson);
    $.ajax({
      type: 'POST',
      url: this.props.url,
      contentType: "application/json",
      data: moodJson,
      success: function(data) {
        alert(data);
        window.location = config.REDIRECT;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmit: function(e) {
    
    e.preventDefault();
    var color; var hex;
    var face = this.state.face.trim();
    var email = this.state.email.trim();
    var tag = this.state.tag.trim();

    if ( !face || !tag ) return;

    if (tag.toLowerCase() == 'sad') {
      hex = '#2F3E73';
      color = 'blue';
    } else if (tag.toLowerCase() == 'angry'){
      hex = '#A93838';
      color = 'red';
    } else if (tag.toLowerCase() == 'queasy') {
      hex = '#297A4A';
      color = 'green';
    }

    this.handleMoodSubmit({tag: tag, email: email, color: color, hex : hex});
    this.setState({face: '', email: '', tag: '', hex: ''});
  },

  getInitialState: function() {
    return {face: '', email: '', tag: '', color: '', hex : ''};
  },
  handleFaceChange: function(e) {
    this.setState({face: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handleTagChange: function(e) {
    this.setState({tag: e.target.value});
  },
  handleColorChange: function(e) {
    this.setState({color: e.target.value});
  },
  handleHexChange: function(e) {
    this.setState({hex: e.target.value});
  },

  render: function() {
    return (
      <form className="moodForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.face}
          onChange={this.handleFaceChange}
        />
        <br/>
        <input
          type="text"
          placeholder="Your email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <br/>
        <select value={this.state.tag} onChange={this.handleTagChange}>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="queasy">Queasy</option>
        </select>
        <br/>
        <input type="submit" value="I want to tell the world I greatly feel..." />
      </form>
    );
  }
});

ReactDOM.render(
  <FormComponent url={config.MOOD_URI + config.MOOD_SUBMIT} />,
  document.getElementById('app')
);
