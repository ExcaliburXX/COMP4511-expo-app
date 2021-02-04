import COLOURS from "../../assets/colours";
import { StyleSheet, Dimensions } from "react-native";

const screen = Dimensions.get("window");

export default StyleSheet.create({
  cardsContainer: {
    textAlign: "center",
    // width: screen.width * 6/7,
  },
  cardContainerButton: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 20,
    // shadowRadius: 10,
    // shadowColor: '#000000',
    // elevation: 50,
    backgroundColor: COLOURS.white,
    width: screen.width * 0.9, // formerly screen.width/1.3
    alignItems: "center",
    justifyContent: "center",
    // margin: 10,
    // paddingTop: 50,
    // shadowOffset : { width: 1, height: 13},
    minHeight: screen.height / 6,
    borderColor: "#000000",
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardTexts: {
    flexGrow: 2,
    // alignSelf: 'flex-start',
    // backgroundColor: 'red',
    maxHeight: "80%",
    marginLeft: "1%",
    maxWidth: "60%",
  },
  cardImg: {
    flexGrow: 1,
    // minWidth: '15%',
    // maxHeight: '60%',
    // maxWidth: '35%',
    // minWidth: 100,
    maxWidth: 100,
    marginHorizontal: "4%",
    // backgroundColor: 'blue',
    borderRadius: 10,
  },
  verticalEllipsis: {
    paddingHorizontal: 10,
    backgroundColor: "orange",
  },
  noCardsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noCardsText: {
    fontStyle: "italic",
    color: COLOURS.white,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  addSuggestionButton: { 
    backgroundColor: COLOURS.blue,
    textAlign: "center",
    marginTop: 20,
    marginHorizontal: '25%',
    paddingVertical: 8,
    borderRadius: 10
  },
  addSuggestionText: {
    color: COLOURS.white,
    fontSize: 17,
    textAlign: "center",
  },

});
