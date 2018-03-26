import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json


import { AppRegistry, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

import Spinner from 'react-native-loading-spinner-overlay';

import	KeyboardAvoidingView from 'react-native';


class HomeScreen extends React.Component {

    constructor(props) {
    super();
    this.state = {
      visible: false
    };
  }
 
  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount() {
    
    
    //setInterval(() => {
      this.setState({
        visible: !this.state.visible
      });
    //}, 1000);
    
  }

  render() {

    const source = {uri:'http://165.227.205.2:9999/visualizar?id=23018996-K',cache:false};

    return (
      <View style={styles.container}>
        <Text>Vista documento original</Text>

        <Spinner visible={this.state.visible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />

          
 

        <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                        this.setState({
        visible: false
      });
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>

<TextInput

          placeholder="Ingresar Contraseña"
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyle}
 
          // Making the Text Input Text Hidden.
          secureTextEntry={true}
 
        />

        <Button
          title="Firmar Conforme"
          onPress={() => this.props.navigation.navigate('Details')}
        />

        <Button
          title="Firmar No Conforme"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

      constructor(props) {
    super();
    this.state = {
      visible: false
    };
  }
 
  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount() {
    
    
    //setInterval(() => {
      this.setState({
        visible: !this.state.visible
      });
    //}, 1000);
    
  }

  render() {
    const source = {uri:'http://165.227.205.2:9999/firmar?id=23018996-K&clave=13Julio2015&motivo=aceptado',cache:false};

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Documento Firmado</Text>

        <Spinner visible={this.state.visible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />

        <Button
          title="Re-firmar... de nuevo"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Atrás"
          onPress={() => this.props.navigation.goBack()}
        />

        

               <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);


                          this.setState({
                            visible: false
                          });

                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>

      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    },
    buttonContainer: {
    backgroundColor: '#c2dfee',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },


    shadowRadius: 10,
    shadowOpacity: 0.25
  },

      TextInputStyle: {
     
      textAlign: 'center',
       
      marginBottom: 7,
       
      height: 30,
      width: 200,
       
      borderWidth: 1,
      // Set border Hex Color Code Here.
       borderColor: '#D50000',
       
       // Set border Radius.
       borderRadius: 6 ,
     
    }



});