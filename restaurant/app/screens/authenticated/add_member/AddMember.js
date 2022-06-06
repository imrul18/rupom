import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Toast from 'react-native-toast-message';
import memberService from '../../../services/MemberService';

const windowWidth = Dimensions.get('window').width;

const AddMember = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    phone: '',
    email: '',
    details: '',
  });

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addMember = async () => {
    setLoading(true);
    if (
      formData.username === '' ||
      formData.fullname === '' ||
      formData.phone === ''
    ) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Empty Field',
        text2: 'Please fill up all fields',
        position: 'top',
      });
    } else {
      const res = await memberService.add(formData);
      if (res.type == 'info') {
        setFormData({
          username: '',
          fullname: '',
          phone: '',
          email: '',
          details: '',
        });
      }
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputtext}
        value={formData.username}
        onChangeText={value => handleChange(value, 'username')}
        placeholder="username"
      />
      <TextInput
        style={styles.inputtext}
        value={formData.fullname}
        onChangeText={value => handleChange(value, 'fullname')}
        placeholder="Full name"
      />
      <TextInput
        style={styles.inputtext}
        value={formData.phone}
        onChangeText={value => handleChange(value, 'phone')}
        placeholder="Phone No"
      />
      <TextInput
        style={styles.inputtext}
        value={formData.email}
        onChangeText={value => handleChange(value, 'email')}
        placeholder="Email"
      />
      <TextInput
        style={styles.inputtext}
        value={formData.details}
        onChangeText={value => handleChange(value, 'details')}
        placeholder="Details"
        multiline
        numberOfLines={3}
      />
      <TouchableOpacity>
        <Text style={styles.btn} onPress={addMember}>
          Submit
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.loginModalView}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputtext: {
    margin: 5,
    borderWidth: 1,
    width: windowWidth * 0.6,
    borderRadius: 10,
    textAlign: 'center',
  },
  btn: {
    marginTop: 30,
    width: 150,
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#0CCBE5',
    margin: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7f7f7f',
  },
});
export default AddMember;
