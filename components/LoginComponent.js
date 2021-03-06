import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import { SecureStore, Permissions, ImagePicker, Asset, ImageManipulator } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({
                        username: userinfo.username,
                        password: userinfo.password,
                        remember: true
                    })
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo',
                JSON.stringify({ 
                    username: this.state.username,
                    password: this.state.password
                })
            )
            .catch((error) => console.log('Could Not Save User Infoi:', error));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could Not Delete User Infoi:', error));

        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(pwd) => this.setState({password: pwd})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={<Icon name='sign-in' type='font-awesome' color='white' />}
                        ButtonStyle={{ backgroundColor: "#512DA8" }}
                        size={24}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={<Icon name='user-plus' type='font-awesome' color='blue' />}
                        size={24}
                        titleStyle={{ color: 'blue' }}
                    />

                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(
            imageUri, 
            [
                { resize: { width: 400 }}
            ],
            { format: 'png' }
        );
        this.setState({ imageUrl: processedImage.uri });
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo',
                JSON.stringify({ 
                    username: this.state.username,
                    password: this.state.password
                })
            )
            .catch((error) => console.log('Could Not Save User Infoi:', error));
        }
    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: this.state.imageUrl }}
                        loadingIndicatorSource={require('./images/logo.png') }
                        style={styles.image}
                    />
                    <Button
                        title='Camera'
                        onPress={this.getImageFromCamera}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(pwd) => this.setState({password: pwd})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname: firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname: lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />

                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={<Icon name='user-plus' type='font-awesome' color='white' />}
                        ButtonStyle={{ backgroundColor: "#512DA8" }}
                        size={24}
                    />
                </View>
            </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
})

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;
