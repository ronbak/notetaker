var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfiles');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('Firebase');

var Profile = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function() {
		return {
			notes: [1,2,3],
			bio: {
				'name':'Itai Noam'
			},
			repos: []	
		};
	},
	componentDidMount: function() {
		this.ref = new Firebase('https://react-tutorial123.firebaseio.com/');
		var childRef = this.ref.child(this.props.params.username);
		this.bindAsArray(childRef,'notes');
	},
	componentWillUnomount: function() {
		this.unbind('notes');
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-4">
					<UserProfile username={this.props.params.username} bio={this.state.bio}/>
				</div>
				<div className="col-md-4">
					<Repos username={this.props.params.username} repos={this.state.repos} />
				</div>
				<div className="col-md-4">
					<Notes username={this.props.params.username} notes = {this.state.notes}/>
				</div>
			</div>
		)
	}
})

module.exports = Profile;