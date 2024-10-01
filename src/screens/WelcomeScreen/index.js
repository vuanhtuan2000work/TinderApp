import React, { useContext } from 'react';
import { StyleSheet, Text, View, Linking, Image } from 'react-native';
import { COLOR } from '../../styles/common';
import ButtonLinearColor from '../../components/ButtonLinearColor';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const handleLinkPress = () => {
    Linking.openURL(
      'https://policies.tinder.com/safety/intl/en/#:~:text=Meet%20for%20the%20first%20few,private%20location%2C%20end%20the%20date.&text=Tell%20a%20friend%20or%20family,and%20where%20you%27re%20going.'
    );
  };

  const handleAgreePress = () => {
    navigation.navigate('AddInformationsRoute');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} resizeMode="contain" source={require('../../assets/tinder_logo.png')} />
      </View>

      <Text style={styles.title}>Chào mừng bạn đến với Tinder.</Text>
      <Text style={styles.subtitle}>Xin vui lòng tuân theo các quy tắc sau.</Text>

      {rules.map((rule, index) => (
        <View key={index} style={styles.rule}>
          <Text style={styles.ruleTitle}>{rule.title}</Text>
          <Text style={styles.ruleText}>
            {rule.text}{' '}
            {rule.hasLink && (
              <Text style={styles.link} onPress={handleLinkPress}>
                Hẹn hò an toàn.
              </Text>
            )}
          </Text>
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <ButtonLinearColor content="TÔI ĐỒNG Ý" onPress={handleAgreePress} />
      </View>
    </View>
  );
};

const rules = [
  {
    title: '✔️ Hãy là chính mình.',
    text: 'Hãy đảm bảo rằng ảnh, độ tuổi và tiểu sử của bạn phản ánh đúng con người bạn.',
    hasLink: false,
  },
  {
    title: '✔️ Hãy giữ an toàn.',
    text: 'Đừng quá nhanh chóng cung cấp thông tin cá nhân.',
    hasLink: true,
  },
  {
    title: '✔️ Hãy bình tĩnh.',
    text: 'Tôn trọng người khác và đối xử với họ như cách bạn muốn được đối xử.',
    hasLink: false,
  },
  {
    title: '✔️ Hãy chủ động.',
    text: 'Luôn báo cáo những hành vi xấu.',
    hasLink: false,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
    backgroundColor: COLOR.primaryColor,
  },
  logoContainer: {
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLOR.lavenderGray,
    marginBottom: 30,
  },
  rule: {
    marginBottom: 20,
    width: '100%',
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ruleText: {
    fontSize: 14,
    color: COLOR.romanSilver,
    marginTop: 5,
  },
  link: {
    color: COLOR.red,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
  },
});

export default WelcomeScreen;
