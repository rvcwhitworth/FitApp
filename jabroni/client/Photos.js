import React from "react";
import {
	View,
	Text,
	Dimensions,
	AsyncStorage,
	Image,
	StyleSheet,
	Button,
	Alert
} from "react-native";
import NavFooter from "./FooterNav.js";
import Chat from "../utilities/chatIcon.js";
import firebase from "../utilities/firebase.js";

const imageStore = firebase.storage();
const database = firebase.database();

class Photos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: null,
			photos: [],
			index: 0
		};
		this.downloadPic = this.downloadPic.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.setProfPic = this.setProfPic.bind(this);
		this.delete = this.delete.bind(this);
	}

	async componentWillMount() {
		AsyncStorage.getItem("@FitApp:UserInfo", (err, val) => {
			if (err) {
				console.log("async storage error: ", err);
			} else {
				this.setState({ userID: JSON.parse(val).id }, () => {
					// use ID look up references to photo names in database
					database
						.ref("imgURLs/" + this.state.userID.toString())
						.once("value", snapshot => {
							// snapshot.val() is an object. iterate throgh object to get all the names of img files in imageStore:
							let obj = snapshot.val();
							let fileNames = [];
							for (var key in obj) {
								fileNames.push(key);
							}
							// download files from the imageStore and store them in state.
							fileNames.forEach(name => {
								let url = imageStore
									.ref("images/" + this.state.userID.toString() + "/" + name)
									.getDownloadURL()
									.then(url => {
										this.downloadPic(url, name);
									});
							});
						});
				});
			}
		});
	}

	downloadPic(url, name) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = "text";
		xhr.onload = event => {
			let photos = this.state.photos;
			photos.push([name, xhr.response]);
			this.setState({ photos: photos });
		};
		xhr.open("GET", url);
		xhr.send();
	}

	setProfPic(e) {
		e.preventDefault();
		let pic = this.state.photos[this.state.index]; // a tuple - idx 1 is the base64 string
		imageStore.ref('images/'+this.state.userID.toString()).child('profilePicture').putString(pic[1]).then(() => {
			console.log('saved profile picture to firebase storage.');
			// save pic to async storage as well to improve load time later:
			// AsyncStorage.setItem('@FitApp:profilePicture', pic[1]); // there were problems reading from asyncStorage, so scrapping for now.
		});
	}

	delete(e) {
		e.preventDefault();
		// remove photo from firebase storage:
		let fileName = this.state.photos[this.state.index][0];
		imageStore.ref('images/'+this.state.userID.toString()+'/'+fileName).delete().then(() => {
			// remove reference to photo from imgURLs:
			database.ref('imgURLs/'+this.state.userID.toString()+'/'+fileName).remove().then(() => {
				Alert.alert('photo deleted.');
				// remove the photo from component state:
				let p = this.state.photos;
				p.splice(this.state.index, 1);
				let i = this.state.index === 0 ? 0 : -1;
				this.setState({photos: p, index: i});
			}).catch((err) => {
				console.error('firebase database delete error: ', err);
			})
		}).catch((err) => {
			console.error('firebase storage delete error: ', err);
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
			<View
				style={{
					width: width,
					height: height,
					backgroundColor: "white",
					flexDirection: "column"
				}}
			>
				<View style={{ flexDirection: "row", flex: 1 }}>
					<Button onPress={this.prev} title="prev" />
					{this.state.photos.length === 0 ? (
						<View>
							<Text>No photos to display.</Text>
						</View>
					) : (
						<View style={{width: "50%", height: "50%", justifyContent: 'center'}}>
							<Button onPress={this.setProfPic} title="set as profile picture" />
							<Image
								source={{ uri: `data:image/jpg;base64,${curr[1]}` }}
								style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}
							/>
							<Text>Timestamp: {curr[0]}</Text>
						</View>
					)}
					<Button onPress={this.next} title="next" />
					<Button onPress={this.delete} title="delete" />
				</View>
				<Chat nav={this.props.nav} />
				<NavFooter nav={this.props.nav} index={3} />
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Photos;
