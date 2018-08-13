import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {

        return(
                <Card title='Contact Information'>
                    <View style={{ margin:10 }}>
                        <Text style={{ lineHeight: 40 }}>121, Clear Water Bay Road</Text>
                        <Text style={{ lineHeight: 40 }}>Clear Water Bay, Kowloon</Text>
                        <Text style={{ lineHeight: 40 }}>HONG KONG</Text>
                        <Text style={{ lineHeight: 40 }}>Tel: +852 1234 5678</Text>
                        <Text style={{ lineHeight: 40 }}>Fax: +852 8765 4321</Text>
                        <Text style={{ lineHeight: 40 }}>Email:confusion@food.net</Text>
                    </View>
                </Card>
        );
    }
}

export default Contact;