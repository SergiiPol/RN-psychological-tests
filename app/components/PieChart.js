import React from 'react';
import { View } from 'react-native';
import { VictoryPie } from 'victory-native';

const PieChart = ({ data, width, height }) => {
    return (
      <View style={{ width, height, justifySelf: 'center',alignItems: 'center', padding: 20}}>
        <VictoryPie
            width={width}
            height={height}
            animate={{
                duration: 2000
              }}
            colorScale={["#95a84c", "#E9A098", "tomato", "orange", "gold", "navy" ]}
            data = {data}
        />
      </View>
    );
  };
  
  export default PieChart;
  