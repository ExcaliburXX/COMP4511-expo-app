import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  groupTitle: {
    paddingTop: 15,
    fontSize: 30,
    color: '#ffffff',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  groupTitleSmall: {
    paddingBottom: 10,
    color: 'white',
  },
  searchContainer: {
    width: screen.width,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingTop: 20,
  },
  memberText: {
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 30,
    paddingLeft: screen.width / 10,
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: screen.width / 10,
    paddingTop: 10,
    paddingRight: screen.width/10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  button:{
    flex: 1,
    height: 60,
    paddingTop: 10,
    paddingLeft: screen.width/20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  search: {
    borderRadius: 30,
    borderColor: '#000',
    backgroundColor: '#ffffff',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    elevation: 5,
    maxHeight: 40,
  },
  searchText: {
    paddingLeft: 10,
  },
  groupOptions: {
    flexDirection: 'row',
    width: screen.width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  imageSmall: {
    width: 50,
    height: 50,
  },
  imageButton: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSmall:{
    fontSize: 12,
  },
  buttonContainerModal: {
    paddingLeft: screen.width / 10,
    paddingRight: screen.width/10,
    height: screen.height/5,
    width: screen.width/1.3,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: screen.height,
    width: screen.width,
    backgroundColor: '#000000aa',
  },
  backImage:{
    width: 30,
    height: 30,
  },
  backButton:{
    paddingBottom: 10,
    paddingRight: 230,
  },
  modalButton: {
    backgroundColor: "#ebebeb",
    width: screen.width/3,
    height: screen.width/5,
    margin: 10,
    borderRadius: 25,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  rowButton: {
    width: screen.width/2.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 10,
    height: screen.height/6,
    borderRadius: 25,
  },
  columnButton: {
    width: screen.width-60,
    backgroundColor: '#ffffff',
    height: screen.height/6,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  descriptionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ababab',
    borderRadius: 5,
    paddingTop: 5,
  }
});