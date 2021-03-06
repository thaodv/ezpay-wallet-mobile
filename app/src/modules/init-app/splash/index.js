import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { InitData, Remove_DB, Check_Exist_Wallet, OPEN_REALM, Remove_all_wallet } from '../../../../db';
import { CreateETH } from '../../../../services/ETH/account.service';
import { getStorage, setStorage } from '../../../../helpers/storages';
import Setting from '../../../../settings/initApp';
import ListToken from '../../../../helpers/constant/listToken';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetListToken, Func_Settings } from '../../../../redux/rootActions/easyMode'

class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Remove_all_wallet().then(ss => {
        //     console.log('sss', ss)
        // }).catch(e => console.log(e))
        // Remove_DB().then(console.log).catch(console.log)
        try {
            getStorage('setting').then(set => {
                if (set) {
                    var set = JSON.parse(set)
                    Setting.push_list_token = set.push_list_token;
                    Setting.mode_secure = set.mode_secure;
                    Setting.first_open = set.first_open;
                    Setting.ez_turn_on_passcode = set.ez_turn_on_passcode;
                    Setting.ez_turn_on_fingerprint = set.ez_turn_on_fingerprint;
                    // Setting.type_network = set.type_network;
                    Setting.testnet = set.testnet
                    this.props.Func_Settings(set)
                    OPEN_REALM()
                    if (set.mode_secure) {
                        this.InitWalletSECURE()
                    } else {
                        this.InitWalletEZ()
                    }
                } else {
                    this.InitWalletEZ()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    isAuth = () => {
        this.props.navigation.navigate('InApp')
    }

    InitWalletEZ = () => {
        Check_Exist_Wallet().then(status => {
            console.log('exist wallet', status)
            if (!status) {
                CreateETH()
                    .then(async wallet => {
                        var ID = Math.floor(Date.now() / 1000);
                        const InitData_Object = {
                            id: ID,
                            mode: 'Easy',
                            seeds: '',
                            token: [{
                                id: ID,
                                name: 'Ethereum',
                                symbol: 'ETH',
                                network: 'ethereum',
                                address: '',
                                price: 0.0,
                                percent_change: 0.0,
                                icon: '',
                                decimals: 18,
                                total_balance: 0,
                                id_market: 1027,
                                account: [{
                                    id: ID,
                                    name: 'Account 1',
                                    token_type: 'ethereum',
                                    address: wallet.address,
                                    private_key: wallet.privateKey,
                                    balance: 0,
                                    time: new Date()
                                }]
                            }]
                        }
                        await InitData(InitData_Object)
                            .then(() => {
                                Setting.first_open = true;
                                setStorage('list_token', JSON.stringify(ListToken)).then(() => {
                                    Setting.push_list_token = true;
                                    setStorage('setting', JSON.stringify(Setting)).then(() => {
                                        this.props.Func_Settings(Setting)
                                        this.props.GetListToken()
                                        this.props.navigation.navigate('InApp')
                                    })
                                })
                            })
                            .catch(e => console.log('ssss', e))

                    }).catch(e => console.log)
            } else {
                this.props.GetListToken()
                if (this.props.SETTINGS.ez_turn_on_passcode == true) {
                    this.props.navigation.navigate('Password', {
                        payload: {
                            canBack: false,
                            isAuth: this.isAuth
                        }
                    })
                } else {
                    this.props.navigation.navigate('InApp')
                }

            }
        }).catch(console.log)
    }

    InitWalletSECURE = () => {
        Check_Exist_Wallet().then(status => {
            if (!status) {
                StatusBar.setBarStyle('light-content', true)
                this.props.navigation.navigate('InitSecure')
            } else {
                this.props.GetListToken();
                Setting.ez_turn_on_passcode = true;
                Setting.ez_turn_on_fingerprint = false;
                Setting.testnet = false;
                setStorage('setting', JSON.stringify(Setting)).then(() => {
                    this.props.Func_Settings(Setting)
                })
                if (this.props.SETTINGS.ez_turn_on_passcode == true) {
                    this.props.navigation.navigate('Password', {
                        payload: {
                            canBack: false,
                            isAuth: this.isAuth
                        }
                    })
                } else {
                    this.props.navigation.navigate('InApp')
                }
            }
        }).catch(err => console.log(err))
    }



    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text> Splash </Text>
            </View >
        );
    }
}
const mapStateToProps = state => {
    return { SETTINGS: state.Settings }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ GetListToken, Func_Settings }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
