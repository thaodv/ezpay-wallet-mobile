import React, { Component } from 'react'
import { View } from 'react-native';
import GLOBALS from '../../helper/variables';
// import Icon from "react-native-vector-icons/FontAwesome";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    List,
    ListItem,
    Toast,
    Root,
    ActionSheet,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomToast from '../../components/toast'

const datas = [
    {
        route: "Backup",
        text: "Backup",
        status: true
    },
    {
        route: "ChangePIN",
        text: "Change PIN",
        status: false
    },
    {
        route: "TouchID",
        text: "Use Touch ID as PIN",
        status: false
    }
];

export default class Setting extends Component {
    Default_Toast_Bottom = () => {

        this.refs.defaultToastBottom.ShowToastFunction('This feature is coming soon');

    }

    pushToPage(Status: boolean, Router) {
        if (Status == true) {
            this.props.navigation.navigate(Router)
        }
        else {
            this.Default_Toast_Bottom()
            // try {
            //     Toast.show({
            //         text: "This feature is coming soon",
            //         position: "bottom"
            //     })
            // } catch (error) {
            //     console.log(error)
            // }

        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: "#fff" }}>
                <Header style={{ backgroundColor: GLOBALS.Color.primary }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon name="bars" color='#fff' size={25}></Icon>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Settings</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <List
                        style={{ width: GLOBALS.WIDTH }}
                        dataArray={datas}
                        renderRow={data =>
                            <ListItem
                                button
                                onPress={() => this.pushToPage(data.status, data.route)}
                            >
                                <Left>
                                    <Text>
                                        {data.text}
                                    </Text>
                                </Left>
                                <Right>
                                    <Icon name="angle-right" />
                                </Right>
                            </ListItem>}
                    />
                </View>
                <CustomToast ref="defaultToastBottom" position="bottom" />
            </Container>
        )
    }
}