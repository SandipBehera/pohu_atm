import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const data = {
    labels: ["Tel", "Hin", "Eng", "Math", "Sci", "Soc"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundColor: "white",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 1) => `rgba(25,118, 210, ${opacity})`,
    decimalPlaces: 0,
    useShadowColorFromDataset: false
};
export default function Barchart() {
    return (
        <View style={{ marginTop: 170, }}>
            <BarChart
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                data={data}
                width={screenWidth}
                height={220}
                yAxisLabel="Mks"
                chartConfig={chartConfig}
                withInnerLines={false}
            />
        </View>
    )
}
