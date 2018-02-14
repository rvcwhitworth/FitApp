import React from "react";
import {
	View,
	Text,
	Dimensions,
	AsyncStorage,
	Image,
	StyleSheet,
	Button,
	Alert,
	TouchableHighlight,
	TouchableOpacity
} from "react-native";
import NavFooter from "./FooterNav.js";
import Chat from "../utilities/chatIcon.js";
import { graphql, withApollo } from 'react-apollo';
var moment = require("moment");
import axios from 'axios';

const trash = require("../../images/trash.png");
const s3 = require('../../s3_utilities.js');
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import {updateUser} from '../utilities/mutations.js';
console.log('update user: ', updateUser);
const styles = StyleSheet.create({
	galleryContainer: {
		width: width,
		height: height-60,
		backgroundColor: "black",
		flexDirection: "column"
	},
	loadingMessageContainer: {
		alignSelf: 'center',
	},
	loadingMessage: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold"
	},
	imageContainer: {
		flex: 3,
		width: "100%",
		height: "100%"
	},
	image: {
		resizeMode: "contain",
		width: "100%",
		height: "100%"
	},
	prevContainer: {
		top: height * 0.45,
		width: 20,
		left: 0,
		flexDirection: "row",
		position: "absolute",
		// justifyContent: "space-between",
		zIndex: 2
	},
	nextContainer: {
		top: height * 0.45,
		width: 20,
		left: width-(width * 0.20),
		flexDirection: "row",
		position: "absolute",
		// justifyContent: "space-between",
		zIndex: 2
	},
	prev: {
		// alignSelf: "flex-start",
		width: width * 0.20,
		height: height * 0.20
	},
	next: {
		// alignSelf: "flex-end",
		width: width * 0.20,
		height: height * 0.20
	},
	prevButton: {
		resizeMode: 'contain',
		width: "100%",
		height: "100%"
	},
	nextButton: {
		resizeMode: 'contain',
		width: "100%",
		height: "100%"
	},
	buttonContainer: {
		flex: 2,
		zIndex: 2,
		flexDirection: "row",
		width: width
		// justifyContent: "space-between",
		// alignSelf: 'flex-end'
	},
	setProfPicButton: {
		alignSelf: 'center',
		marginTop: 5
	},
	trashContainer: {
		width: width * 0.05,
		height: height * 0.05,
		backgroundColor: 'black',
		borderRadius: (width * 0.05 / 2),
		alignSelf: 'flex-start',
		marginTop: 5,
		marginLeft: 5
	},
	trash: {
		width: '100%',
		height: '100%',
		tintColor: 'white',
		backgroundColor: 'black'
	},
	timestamp: {
		color: "white"
	}
});

class Photos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: null,
			photos: [], // [[URL1, timestamp1], [URL2, timestamp2], ...]
			index: 0,
			loading: false,
			showButtons: false
		};
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.setProfPic = this.setProfPic.bind(this);
		this.delete = this.delete.bind(this);
		this.toggleButtons = this.toggleButtons.bind(this);
	}

	componentDidMount() {
		AsyncStorage.getItem("@FitApp:UserInfo", (err, val) => {
			if (err) {
				console.log("async storage error: ", err);
			} else {
				this.setState({ userID: JSON.parse(val).id }, () => {
				AsyncStorage.getItem("@FitApp:UserPics", (err, val) => {
					if ( err ) {
						console.log("async storage error: ", err);
					} else {
						let tuples = JSON.parse(val);
						this.setState({photos: tuples}, () => {
							console.log('set state in photo gallery: ', this.state.photos);
						});
					}
				});
				});
			}
		});
	}

	setProfPic(e) {
		e.preventDefault();
		this.props.client.mutate({
			mutation: updateUser,
			variables: {
				user_id: this.state.userID, 
				profile_data: this.state.photos[this.state.index][0]
			}
		}).then((response) => {
			console.log('successfully set profile picture in SQL: ', response);
			// set in async storage as well
			AsyncStorage.setItem("@FitApp: profilePictureURL", this.state.photos[this.state.index][0]).then(() => {
				console.log('successfully set profile picture in async storage');
			})
		}).catch((err) => {
			console.log('error setting profile picture: ', err);
		})
	}

	toggleButtons(e) {
		e.preventDefault();
		this.setState({ showButtons: !this.state.showButtons });
	}



	delete(e) {
		e.preventDefault();

		// before sending the key to be deleted, you need to:
		let key = this.state.photos[0];
		let url = key[0].split('upload/')[1];
		let timestamp = key[1];
		// append timestamp to end
		url += "TIMESTAMP="+timestamp;
		url = url.split('/').join('\'');
		console.log('url to delete: ',url);

		s3.delete(this.state.userID, url);

		// remove key from state
		let p = this.state.photos;
		p.splice(this.state.index, 1);
		let i = this.state.index;
		if ( i > 0 ) {
			i--;
		}
		this.setState({index: i, photos: p}); 
		// remove key from asyncStorage
		AsyncStorage.setItem("@FitApp: UserPics", JSON.stringify(p))
		.then(() => {
			console.log('successfully spliced photo key from async storage')
		})
		.catch((err) => {
			console.log('error splicing photo key from async storage: ', err);
		});

	}

	next(e) {
		e.preventDefault();
		let i = this.state.index;
		if (this.state.index < this.state.photos.length - 1) {
			i++;
			this.setState({ index: i });
		}
	}

	prev(e) {
		e.preventDefault();
		let i = this.state.index;
		if (this.state.index > 0) {
			i--;
			this.setState({ index: i });
		}
	}

	render() {
		const { width, height } = Dimensions.get("window");
		const curr = this.state.photos[this.state.index]; // a tuple representing the [timestamp,image] currently being displayed
		return (
			<View style={{"backgroundColor":"black", flexDirection: 'column', width: width, height: height}}>
				<View style={styles.galleryContainer}>
					{this.state.photos.length === 0 ? (
						<View style={styles.galleryContainer}>
							<Text>No photos to display.</Text>
						</View>
					) : (
						<View>
							<View style={styles.prevContainer}>
								<TouchableOpacity style={styles.prev} onPress={this.prev}>
									<Image source={require("../../images/prev.png")} style={styles.prevButton}/>
								</TouchableOpacity>
							</View>
							<View style={styles.nextContainer}>
								<TouchableOpacity style={styles.next} onPress={this.next}>
									<Image source={require("../../images/next.png")} style={styles.nextButton} />
								</TouchableOpacity>
							</View>
							{this.state.showButtons ? (
								<View style={styles.buttonContainer}>
									<TouchableOpacity style={styles.trashContainer} onPress={this.delete}>
										<Image source={trash} style={styles.trash} />
									</TouchableOpacity>
									<Button
										style= {styles.setProfPicButton}
										onPress={this.setProfPic}
										title="set profile picture"
									/>
								</View>

							) : null}
							<View style={{ width: "100%", height: "100%" }}>
								<TouchableHighlight
									style={styles.imageContainer}
									onPress={this.toggleButtons}
								>
									<Image
										source={{uri: "https://res.cloudinary.com/dvhehr6k8/image/fetch/"+curr[0]}}
										style={styles.image}
									/>
								</TouchableHighlight>
								{this.state.showButtons ? <Text style={styles.timestamp}>{moment(parseInt(curr[1])).format('LLLL')}</Text> : null }
							</View>
						</View>
					)}
					<Chat nav={this.props.nav} TopNav={this.props.topNav} />
				</View>
				<NavFooter nav={this.props.nav} index={3} />
			</View>
		);
	}
}

export default withApollo(Photos);

1518540420