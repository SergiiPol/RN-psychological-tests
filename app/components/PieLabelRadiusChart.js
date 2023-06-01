import React from 'react';
import { View } from 'react-native';
import { VictoryPie } from 'victory-native';

const PieLabelRadiusChart = ({ data, width, height }) => {
    return (
      <View style={{ width, height, justifySelf: 'center',alignItems: 'center', padding: 20}}>
            <VictoryPie
              animate={{ duration: 2000 }}
              data={data}
              labelRadius={({ innerRadius }) => innerRadius + 15 }
              colorScale={["tomato", "orange", "gold", "cyan", "navy", "green", "grey" ]}
              radius={({ datum }) => 50 + datum.y * 12}
              innerRadius={50}
              style={{ labels: { fill: "white", fontSize: 14, fontWeight: "bold" } }}
            />
      </View>
    );
  };
  
  export default PieLabelRadiusChart;