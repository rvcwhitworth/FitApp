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
import firebase from "../utilities/firebase.js";
var moment = require("moment");
import axios from 'axios';

const trash = require("../../images/trash.png");

const imageStore = firebase.storage();
const database = firebase.database();

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
	}
});

class Photos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: null,
			photos: [],
			index: 0,
			loading: true,
			showButtons: false
		};
		this.downloadPic = this.downloadPic.bind(this);
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
					// get photo keys from async storage
					AsyncStorage.getItem("@FitApp:UserPics")
					.then((picsString) => {
						let photos = JSON.parse(picsString);
						this.setState({photos}, () => this.downloadPic());
					})
				});
			}
		});
	}

	downloadPic () {
		axios.get("https://fitpics.s3.amazonaws.com/public/" + this.state.photos[this.state.index])
		.then((response) => {
			//slice user id and '/' from key
			let timestamp = this.state.photos[this.state.index].split('/')[1];
			this.setState({
				currentPic: [timestamp, {uri: `data:image/jpg;base64,${response.data}`}],
				loading: false
			});
		}).catch(err => console.log('axios error: ', err));
	}

	setProfPic(e) {
		e.preventDefault();
		let pic = this.state.photos[this.state.index]; // a tuple - idx 1 is the base64 string
		imageStore
			.ref("images/" + this.state.userID.toString())
			.child("profilePicture")
			.putString(pic[1])
			.then(() => {
				console.log("saved profile picture to firebase storage.");
				// save pic to async storage as well to improve load time later:
				// AsyncStorage.setItem('@FitApp:profilePicture', pic[1]); // there were problems reading from asyncStorage, so scrapping for now.
			});
	}

	toggleButtons(e) {
		e.preventDefault();
		this.setState({ showButtons: !this.state.showButtons });
	}

	delete(e) {
		e.preventDefault();
		// remove photo from firebase storage:
		let fileName = this.state.photos[this.state.index][0];
		imageStore
			.ref("images/" + this.state.userID.toString() + "/" + fileName)
			.delete()
			.then(() => {
				// remove reference to photo from imgURLs:
				database
					.ref("imgURLs/" + this.state.userID.toString() + "/" + fileName)
					.remove()
					.then(() => {
						Alert.alert("photo deleted.");
						// remove the photo from component state:
						let p = this.state.photos;
						p.splice(this.state.index, 1);
						let i = this.state.index === 0 ? 0 : -1;
						this.setState({ photos: p, index: i });
					})
					.catch(err => {
						console.error("firebase database delete error: ", err);
					});
			})
			.catch(err => {
				console.error("firebase storage delete error: ", err);
			});
	}

	next(e) {
		e.preventDefault();
		let i = this.state.index;
		if (this.state.index < this.state.photos.length - 1) {
			i++;
			this.setState({ loading: true, index: i }, () => {
				this.downloadPic();
			});
		}
	}

	prev(e) {
		e.preventDefault();
		let i = this.state.index;
		if (this.state.index > 0) {
			i--;
			this.setState({ loading: true, index: i }, () => {
				this.downloadPic();
			});
		}
	}

	render() {
		const { width, height } = Dimensions.get("window");
		const curr = this.state.currentPic; // a tuple representing the [timestamp,image] currently being displayed
		return (
			<View style={{"backgroundColor":"black", flexDirection: 'column', width: width, height: height}}>
				<View style={styles.galleryContainer}>
					{this.state.loading ? (
						<View style={styles.loadingMessageContainer}>
							<Text style={styles.loadingMessage}>Loading!</Text>
						</View>
					) : this.state.photos.length === 0 ? (
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
										source={curr[1]}
										style={styles.image}
									/>
								</TouchableHighlight>
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

export default Photos;
