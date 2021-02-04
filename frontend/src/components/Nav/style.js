import { StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get("window");

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FC733A',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerStyle: {
      backgroundColor: '#F89333',
      elevation: 40,

    },
    drawerStyle: {
      backgroundColor: '#edebeb',
      width: 240,
    }, 
    image: {
      
    },
    settingsButton:{
      paddingRight: 20,
    },
    rowContainer:{
      flexDirection: "row",
    },
  });
  