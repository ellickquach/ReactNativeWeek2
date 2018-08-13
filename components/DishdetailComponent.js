import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

import { postFavorite, postComment } from '../redux/ActionCreators';

import Rating from 'react-native-easy-rating';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (id, dishId, rating, author, comment) => dispatch(postComment(id, dishId, rating, author, comment))
})

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating rating={item.rating} max={5} iconHeight={14} iconWidth={14} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList data={comments} renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            comment: '',
            author: '',
            commentModal: false
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    commentModalToggle(dishId) {
        this.setState({commentModal: !this.state.commentModal});
    }

    submitComment(dishId) {
        const comment = {
            id: this.props.comments.comments.length,
            dishId: dishId,
            rating: this.state.rating,
            author: this.state.author,
            comment: this.state.comment
        }
        this.props.postComment(comment.id, comment.dishId, comment.rating, comment.author, comment.comment)
        this.commentModalToggle();
    }

    resetCommentForm() {
        this.setState({
            rating: 0,
            comment: '',
            author: ''
        })
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    
    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        const dish = this.props.dishes.dishes[+dishId];
        const favorite = this.props.favorites.some(el => el === dishId);

        return(
            <ScrollView>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>

                        <Icon
                            style={{flex:1}}
                            raised
                            reverse
                            name={ favorite ? 'heart' : 'heart-o' }
                            type='font-awesome'
                            color='#f50'
                            onPress={() => favorite ? console.log('Already favorite') : this.markFavorite(dishId)}
                        />
                        
                        <Icon
                            style={{flex:2}}
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => this.commentModalToggle(dishId)}
                        />
                    </View>
                </Card>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.commentModal}
                        onDismiss={() => { this.commentModalToggle(); this.resetCommentForm()} }
                        onRequestClose={() => { this.commentModalToggle(); this.resetCommentForm()} }
                >
                    <View style={{marginTop: 50, alignItems: 'center'}}>
                        <Rating style={{marginBottom:50}} rating={0} max={5} iconHeight={32} iconWidth={32} 
                            onRate={(rate) => this.setState({rating: rate})}
                        />
                        <Input 
                            placeholder="Author" 
                            leftIcon={
                                <Icon name='user-o' type='font-awesome' size={24} />
                            }
                            onChangeText={(value) => this.setState({ author: value })}
                        />
                        <Input 
                            placeholder="Comment" 
                            leftIcon={
                                <Icon name='comment-o' type='font-awesome' size={24} />
                            }
                            onChangeText={(value) => this.setState({ comment: value })}
                        />
                        <View style={styles.formRow}>
                            <Button                                    
                                    title='SUBMIT'
                                    color='#512DA8'
                                    onPress={() => this.submitComment(dishId)}
                            />
                        </View>
                        <View style={styles.formRow}>
                        <Button                                
                                title='CANCEL'
                                color='grey'
                                onPress={() => { this.commentModalToggle(); this.resetCommentForm()} }
                        />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        marginTop: 50
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);