import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import * as Colors from "./assets/constants/Colors";
import { statusBarIOS, width } from "./assets/constants/Units";

type Props = {
  data: Array<any>,
  focusedTextStyle?: Object,
  closeTextStyle?: Object,
  normalTextStyle?: Object,
  onItemPress?: () => void,
}
type States = {
  itemFocus: number,
  itemClose1: number,
  itemClose2: number,
}

const AnimatedValues = {
  fontSize1: 40,
  fontSize2: 30,
  fontSize3: 20
};

export default class FocusedScrollView extends React.Component<Props, States> {
  constructor (params: Props) {
    super(params);
    this.state = {
      itemFocus: 6,
      itemClose1: 0,
      itemClose2: 0,
    };
  }

  onViewableItemsChanged = (ViewTokens: { viewableItems: string | any[]; }) => {
    this.setState({
      itemFocus: ViewTokens.viewableItems[1].index,
      itemClose1: ViewTokens.viewableItems[0].index,
      itemClose2: ViewTokens.viewableItems[2].index
    });
  };

  textType = (index: number) : object => {
    const focusedText = {
      color: Colors.black,
      fontSize: AnimatedValues.fontSize1
    };
    const closeText = {
      color: Colors.gray,
      fontSize: AnimatedValues.fontSize2
    }
    const text = {
      color: Colors.gray,
      fontWeight: "bold",
      alignContent: "center",
      alignSelf: "center",
      width,
      textAlign: "center"
    }

    if (this.state.itemFocus === index) return this.props.focusedTextStyle ?? focusedText;
    else if (this.state.itemClose1 === index) return this.props.closeTextStyle ?? closeText;
    else if (this.state.itemClose2 === index) return this.props.normalTextStyle ?? closeText;
    else return text;
  };

  render () {
    const extraData = [
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" }
    ];

    let data = extraData.concat(this.props.data);
    data = data.concat(extraData);
    return (
      <FlatList
          initialScrollIndex={4}
          viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 120
          }}
          getItemLayout={(data, index) => (
            { length: 120, offset: 120 * index, index }
          )}
          onViewableItemsChanged={this.onViewableItemsChanged}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
              <>
              <TouchableOpacity 
                key={index} 
                onPress={this.props.onItemPress} 
                style={styles.item}
              >
                <Text
                  style={[styles.text, this.textType(index)]}
                  key={index}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
              </>
          )}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "gray",
    fontWeight: "bold",
    alignContent: "center",
    alignSelf: "center",
    width,
    textAlign: "center"
  },
  flatlist: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark,
    paddingTop: statusBarIOS
  },
  item: {
    height: 120,
    width,
    justifyContent: "center"
  },
});
