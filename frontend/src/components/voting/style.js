import { StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get("window");


export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  statusStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    flex: 0.6,
    // width: 300,
    // height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // resizeMode: 'contain'
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    flex: 0.3,
    paddingVertical: 10
    // marginVertical: 20,
  },
  description: {
    fontSize: 18,
    flex: 0.4,
    marginTop: 20,
    paddingHorizontal: 40,
    textAlign: 'center'
  },
  cardImage: {
    width: 220,
    flex: 1,
    resizeMode: 'contain',
  },
  swiperContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomContainer: {
    flex: 0.35,
    justifyContent: 'space-evenly'
  },
  finishContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%'
  },
  finishText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  viewResultsButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  returnToDecksButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  returnToDecksText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cardDetails: {
    alignItems: 'center',
  },
  title: {},
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  likeButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center'
  },
  nopeButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
  },
  currentCardText : {
    fontSize: 20,
    textAlign: 'center',
  },
  incompleteVotingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 300,
  },
  incompleteVotingText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10
  },
  completedVotingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 300,
  },
  completedVotingText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10
  },
  viewSuggestionText: {
    textAlign: 'center',
    fontSize: 18,
  },
  introModalContainer: {
    backgroundColor: '#99999965',
    height: screen.height - 55,
    width: screen.width,
    alignItems: 'center',
    paddingTop: screen.height/3,
    
},
modalBox: {
    width: screen.width - 50,
    
    backgroundColor: '#ffffff',
    alignItems:'center',
    borderRadius: 25,
    padding: 30,
    
},
modalText: {
    textAlign: 'center',
},
modalButton:{
  margin: 20,
  borderRadius: 25,
  backgroundColor: '#F89333',
  width: screen.width/4,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
},
infoContainer: {
  paddingLeft: screen.width*0.85,
}
});
