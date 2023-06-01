import React from 'react';
import { View, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const BarChart = ({ data, width, height, theme }) => {

    return (
      <View>
      <VictoryChart
        // theme={VictoryTheme.material}
        theme={theme}
        domainPadding={{ x: 20 }}
        horizontal // Добавляем проп 'horizontal' для горизонтального графика
        width={width}
        height={height}
      >
        <VictoryBar
          animate={{ duration: 2000 }}
          data={data}
          x="quarter" // Меняем ось Y на 'quarter'
          y="earnings" // Меняем ось X на 'earnings'
          style={{
            data: {
              fill: (d) => {
                // Возвращаем разные цвета для каждой колонки
                // if (d.index === 0) return 'white';
                // if (d.index === 1) return 'blue';
                // if (d.index === 2) return 'green';
                // if (d.index === 3) return 'black';
                // if (d.index === 4) return 'white';
                // и так далее...
                return '#d3e29d'; // Цвет по умолчанию
              },
            },
          }}
        />
      </VictoryChart>
    </View>
    );
  };
  
  export default BarChart;
  