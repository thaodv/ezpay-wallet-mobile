import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import GLOBALS from '../helper/variables'
import { Item } from 'native-base'
import { updateBalance, balance } from '../services/wallet.service';
import { Utils } from '../helper/utils';
import CONSTANTS from '../helper/constants'


class HorizontalItem extends Component {
    render() {
        return (
            <View style={styles.ItemHozi}>
                <Text style={styles.contenCoin}>{this.props.item.nameToken}</Text>
                <Text style={styles.contenCoin}>{this.props.item.balance}</Text>
            </View>
        )
    }
}

var interval;
export default class listCoin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            balanceNTY: ''
        };
        updateBalance().then(res => {
            this.setState({ balanceNTY: balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
        }).catch(err => {
            console.log('catch', err)
            this.setState({ balanceNTY: '0' })
        })

    };

    componentDidMount() {
        interval = setInterval(() => {
            updateBalance().then(res => {
                this.setState({ balanceNTY: balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
            }).catch(err => {
                this.setState({ balanceNTY: '0' })
            })
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(interval)
    }



    render() {
        var HorizontalData = [
            {
                nameToken: 'NTY',
                balance: this.state.balanceNTY
            }
        ]
        return (
            <View style={styles.container}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, fontFamily: GLOBALS.font.Poppins }}> Your balance</Text>
                {/* <View style={styles.ItemHozi}>
                    <Text style={styles.contenCoin}>NTY</Text>
                    <Text style={styles.contenCoin}>204847</Text>
                </View> */}
                <View>
                    <FlatList
                        data={HorizontalData}
                        renderItem={({ item, index }) => {
                            return (
                                <HorizontalItem item={item} index={index} parentLatList={this} />
                            )
                        }}
                        keyExtractor={(item, index) => item.nameToken}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 38,
        backgroundColor: GLOBALS.Color.primary,
        padding: 6,
    },
    ItemHozi: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // width: GLOBALS.WIDTH,
        backgroundColor: 'rgba(255, 255, 255, 0.158)',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5,

    },
    contenCoin: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        width: GLOBALS.WIDTH / 2.1,
        textAlign: 'center',
        fontFamily: GLOBALS.font.Poppins
    }
})