import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import * as Animatable from 'react-native-animatable';

import { MailComposer } from 'expo';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@good.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {

        return(
            <ScrollView>
               <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                    <Card title='Contact Information'>
                        <View style={{ margin:10 }}>
                            <Text style={{ lineHeight: 40 }}>121, Clear Water Bay Road</Text>
                            <Text style={{ lineHeight: 40 }}>Clear Water Bay, Kowloon</Text>
                            <Text style={{ lineHeight: 40 }}>HONG KONG</Text>
                            <Text style={{ lineHeight: 40 }}>Tel: +852 1234 5678</Text>
                            <Text style={{ lineHeight: 40 }}>Fax: +852 8765 4321</Text>
                            <Text style={{ lineHeight: 40 }}>Email:confusion@food.net</Text>
                            <Button 
                                title='Send Email'
                                buttonStyle={{ backgroundColor: '#512DA8'}}
                                icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                                onPress={this.sendMail}
                            />
                        </View>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;