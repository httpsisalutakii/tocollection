import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.png';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = () => {
    // Integração de autenticação será adicionada futuramente
    console.log('Login action', { email, password });
    navigation.navigate('PokemonList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.textTop}>Pokédex</Text>
      </View>
      
      <View style={styles.boxMid}>
      <Text style={styles.titleInput}>E-mail</Text>
      <View style={styles.boxInput}>
      <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.textInput}
        />
      </View>
      <Text style={styles.titleInput}>Senha</Text>      
      <View style={styles.boxInput}>
      <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry
          style={styles.textInput}
        />
      </View>        
      </View>
      <View style={styles.boxBottom}>
      <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
          <Text style={styles.buttonEntrarText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

