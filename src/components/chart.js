import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Line from './line';
// import PureChart from 'react-native-pure-chart';

export default class Chart extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Line values={[40, 30, 70, 60, 100, 70, 40, 70, 50]} />
                </View>
            </View>
        );
    }

    // render() {
    //     let sampleData = [
    //         { x: '2018-01-01', y: 30 },
    //         { x: '2018-01-02', y: 200 },
    //         { x: '2018-01-03', y: 170 },
    //         { x: '2018-01-04', y: 250 },
    //         { x: '2018-01-05', y: 10 },
    //         { x: '2018-01-01', y: 30 },
    //         { x: '2018-01-02', y: 200 },
    //         { x: '2018-01-03', y: 170 },
    //         { x: '2018-01-04', y: 250 },
    //         { x: '2018-01-05', y: 10 },
    //         { x: '2018-01-01', y: 30 },
    //         { x: '2018-01-02', y: 200 },
    //         { x: '2018-01-03', y: 170 },
    //         { x: '2018-01-04', y: 250 },
    //         { x: '2018-01-05', y: 10 }
    //     ]
    //     return (
    //         <PureChart data={sampleData} type='line' />
    //     )
    //}

}

const styles = StyleSheet.create({
    container: {
        flex: 38, // take 38% of the screen height
        backgroundColor: '#FFFFFF',
    },
});