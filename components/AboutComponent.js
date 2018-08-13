import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function RenderHistory() {
    return(
        <Card title='Our History'>
            <Text style={{marginBottom: 30}}>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{marginBottom: 30}}>
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}

function RenderLeaders(props) {
    const leaders = props.leaders;

    const renderPerson = ({item, index}) => {
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: { uri: baseUrl + item.image } }}
            />
        );
    }

    if (leaders.isLoading) {
        return(
            <ScrollView>
            <History />
                <Card 
                    title='Corporate Leadership'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    else if (leaders.errMess) {
        return(
            <ScrollView>
            <History />
                <Card 
                    title='Corporate Leadership'>
                    <Text>{this.props.leaders.errMess}</Text>
                </Card>
            </ScrollView>
        );
    }
    else {

        return(
            <Card title="Corporate Leadership">
                <FlatList
                    data={leaders}
                    renderItem={renderPerson}
                    keyExtractor={person => person.id.toString()}
                >
                </FlatList>
            </Card>
        );
    }
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
        return(
            <ScrollView>
            <RenderHistory />
            <RenderLeaders leaders={this.props.leaders.leaders} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);