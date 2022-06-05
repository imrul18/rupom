import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import memberService from '../../../services/MemberService';

const windowWidth = Dimensions.get('window').width;

const AddMember = () => {
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
    if (
      formData.username === '' ||
      formData.fullname === '' ||
      formData.phone === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Empty Field',
        text2: 'Please fill up all fields',
        position: 'top',
      });
    } else {
      const res = await memberService.add(formData);
      console.log(res);
      if (res.type == 'info') {
        setFormData({
          username: '',
          fullname: '',
          phone: '',
          email: '',
          details: '',
        });
      }
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
});
export default AddMember;
