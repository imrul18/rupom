import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../ReduxStore/AuthStore';
import authService from '../../services/AuthService';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const {access_token} = useSelector(state => state.authStore);

  useEffect(() => {
    if (access_token) {
      navigation.navigate('authenticated');
    }
  }, [access_token]);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    setLoginModal(true);
    try {
      const res = await authService.login({
        username: username,
        password: password,
      });
      dispatch(setToken(res.data));
      setLoginModal(false);
    } catch (error) {
      setLoginModal(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.intro}></View>
      <View style={styles.login}>
        <TextInput
          style={styles.txtinput}
          onChangeText={value => setUsername(value)}
          value={username}
          placeholder="username"
        />
        <TextInput
          style={styles.txtinput}
          onChangeText={value => setPassword(value)}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.loginbtn}>
            <Text style={styles.loginbtntxt}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgettxt}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={loginModal}>
        <View style={styles.loginModalView}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    flex: 1,
  },
  intro: {
    height: windowHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    height: windowHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    height: windowHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcometxt: {
    margin: 20,
    fontSize: 24,
    fontWeight: '700',
  },
  decstxt: {
    fontSize: 16,
    paddingHorizontal: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
  txtinput: {
    borderWidth: 2,
    width: windowWidth * 0.6,
    height: 40,
    margin: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
  loginbtn: {
    margin: 5,
    backgroundColor: '#0CCBE5',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  loginbtntxt: {
    color: '#eee',
    fontSize: 20,
    fontWeight: '700',
  },
  forgettxt: {
    color: '#1F9EF7',
    fontSize: 20,
    fontFamily: 'sans-serif',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#f2c98a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'blue',
  },
  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
  },
});

export default Login;
