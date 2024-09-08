import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Text from '../../atoms/Text/Text';

interface Props {
  monthDays: string[];
}

const HeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerElementContainer}>
        <Text text="Su" textStyles={styles.headerElement} />
      </View>

      <View style={styles.headerElementContainer}>
        <Text text="Mo" textStyles={styles.headerElement} />
      </View>

      <View style={styles.headerElementContainer}>
        <Text text="Tu" textStyles={styles.headerElement} />
      </View>

      <View style={styles.headerElementContainer}>
        <Text text="We" textStyles={styles.headerElement} />
      </View>

      <View style={styles.headerElementContainer}>
        <Text text="Th" textStyles={styles.headerElement} />
      </View>

      <View style={styles.headerElementContainer}>
        <Text text="Fr" textStyles={styles.headerElement} />
      </View>

      <View style={styles.headerElementContainer}>
        <Text text="Sa" textStyles={styles.headerElement} />
      </View>
    </View>
  );
};

const DaysPerMonth = ({monthDays}: Props) => {
  return (
    <FlatList
      numColumns={7}
      data={monthDays}
      ListHeaderComponent={HeaderComponent}
      renderItem={({item}) => {
        return (
          <View style={styles.litElementContainer}>
            <Text text={item} textStyles={styles.listElement} />
          </View>
        );
      }}
      columnWrapperStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'space-evenly',
  },
  litElementContainer: {
    alignItems: 'center',
    flex: 1,
  },
  listElement: {
    color: '#52656d',
    fontSize: 17,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerElementContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerElement: {
    color: '#52656d',
    fontSize: 20,
  },
});

export default DaysPerMonth;
