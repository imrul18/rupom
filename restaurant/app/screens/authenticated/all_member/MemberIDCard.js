import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  Modal,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {openComposer} from 'react-native-email-link';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import QRCode from 'react-native-qrcode-svg';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MemberIDCard = ({navigation, route}) => {
  const {users} = route.params;

  const saveIDCard = async () => {
    let options = {
      html: `
      <div style="transform: rotate(270deg); margin-top: -450px">
      <div
        style="
          height: 300px;
          width: 200px;
          text-align: center;
          border: 1px solid black;
          border-radius: 25px;
          margin: 10px;
        "
      >
        <img
        src=https://img.favpng.com/1/20/21/businessperson-computer-icons-avatar-png-favpng-B8ky3XmC82yLn1QkdvZ17t1vC.jpg
        width="40" height="40" style="margin-top:20px;border-radius: 50px;">
        <h5 style="margin-block-start:0px; margin-block-end= 0px;">
        ${users?.fullname}
        </h5>
        <img
        src=https://chart.googleapis.com/chart?cht=qr&chl=+${users.username}+&chs=160x160&chld=L|0
        width="50" height="50">
        <div
          style="
            text-align: left;
            margin: 2x;
            display: flex;
            flex-direction: row;
          "
        >
          <div style="margin-left: 20px">
            <h6 style="padding: 1px">Phone:</h6>
            <h6 style="padding: 1px">Email:</h6>
            <h6 style="padding: 1px">Details:</h6>
          </div>
          <div style="margin-left: 10px; margin-right: 10px">
            <h6 style="padding: 1px">${users?.phone}</h6>
            <h6 style="padding: 1px">${users?.email}</h6>
            <h6 style="padding: 1px">${users?.details}</h6>
          </div>
        </div>
      </div>
      <div
        style="
          height: 300px;
          width: 200px;
          text-align: center;
          border: 1px solid black;
          border-radius: 25px;
          margin: 10px;
        "
      >
        <img
        src=https://img.favpng.com/1/20/21/businessperson-computer-icons-avatar-png-favpng-B8ky3XmC82yLn1QkdvZ17t1vC.jpg
        width="40" height="40" style="margin-top:20px;border-radius: 50px;">
        <h5 style="margin-block-start:0px; margin-block-end= 0px;">
          Imrul Afnan
        </h5>
        <img
        src=https://chart.googleapis.com/chart?cht=qr&chl=+${users.username}+&chs=160x160&chld=L|0
        width="50" height="50">
        <div
          style="
            text-align: left;
            margin: 2x;
            display: flex;
            flex-direction: row;
          "
        >
          <div style="margin-left: 40px">
            <h6 style="padding: 1px">Phone:</h6>
            <h6 style="padding: 1px">Email:</h6>
            <h6 style="padding: 1px">Details:</h6>
          </div>
          <div style="margin-left: 30px; margin-right: 20px">
            <h6 style="padding: 1px">01677756337</h6>
            <h6 style="padding: 1px">adsadasdada</h6>
            <h6 style="padding: 1px">adsfsdfsdfsdf</h6>
          </div>
        </div>
      </div>
    </div>
      `,
      fileName: `${users?.username}'s card`,
      directory: 'IDCards',
    };

    await RNHTMLtoPDF.convert(options);
 
    Toast.show({
      type: 'info',
      text1: 'ID card saved',
      text2: `Saved ${users?.fullname}'s ID card`,
      position: 'top',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firsthalf}>
        <Image
          style={styles.image}
          source={{
            uri: users?.imagelink,
          }}
        />
        <Text style={styles.text}>{users?.fullname}</Text>
      </View>
      <View style={styles.secondhalf}>
        <View style={styles.details}>
          <View id="qrcode" style={{alignItems: 'center'}}>
            <QRCode value={users?.username} size={150} />
          </View>

          <View style={styles.detailsinfo}>
            <Ionicons name="mail" size={28} color="#0CCBE5" />
            <Text style={{padding: 5, paddingLeft: 20}}>{users?.email}</Text>
          </View>
          <View style={styles.detailsinfo}>
            <Ionicons name="call" size={28} color="#0CCBE5" />
            <Text style={{padding: 5, paddingLeft: 20}}>{users?.phone}</Text>
          </View>
          <View style={styles.detailsinfo}>
            <MaterialCommunityIcons
              name="account-details"
              size={28}
              color="#0CCBE5"
            />
            <Text style={{padding: 5, paddingLeft: 20}}>{users?.details}</Text>
          </View>
          <View>
            <Text style={styles.btn} onPress={saveIDCard}>
              Save
            </Text>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.goBack();
              }}>
              Back
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  firsthalf: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0CCBE5',
    height: windowHeight * 0.4,
    width: windowWidth,
  },
  image: {
    height: 120,
    width: 120,
    margin: 5,
    marginTop: 20,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondhalf: {
    flex: 2,
    alignItems: 'center',
  },
  information: {
    backgroundColor: '#fff',
    height: windowHeight * 0.1,
    width: windowWidth * 0.8,
    marginTop: -windowHeight * 0.06,
    borderRadius: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  informationfield: {
    flexDirection: 'row',
  },
  field: {
    margin: 10,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  fieldvalue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0CCBE5',
  },
  details: {
    width: windowWidth * 0.6,
    marginTop: 10,
  },
  detailsinfo: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 10,
  },
  btn: {
    padding: 5,
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

export default MemberIDCard;
