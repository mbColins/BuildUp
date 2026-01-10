import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../utils/styles';

type PaginationProps = {
  data: any[];
  activeIndex?: number;
  scrollX: Animated.Value;
};

const {width} =  Dimensions.get('screen');

const Pagination = ({ data, scrollX, activeIndex = 0 }: PaginationProps) => {
  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        const inputRange = [ (index - 1) * width, index * width, (index + 1) * width ];
        const dotWith = scrollX.interpolate({
          inputRange,
            outputRange: [12, 30, 12],
            extrapolate: 'clamp',
        })
       return <Animated.View
          key={index}
          style={[styles.dot, { width: dotWith }]}
        />
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10, 
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: Colors.success,
  },
  activeDot: {
    backgroundColor: '#000',
  },
})