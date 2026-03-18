import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, ActivityIndicator} from 'react-native';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';

type PokemonListItem = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

const MOCK_POKEMON_LIST: PokemonListItem[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'],
  },
  {
    id: 4,
    name: 'charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    types: ['fire'],
  },
  {
    id: 7,
    name: 'squirtle',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    types: ['water'],
  },
];

export default function PokemonListScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PokemonList'>>();
  
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        setPokemons(MOCK_POKEMON_LIST);
      } catch (error) {
        setError('Falha ao carrecar lista de comunidades!');
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: "Login"}],
    })
};

  const renderItem = ({ item }: { item: PokemonListItem }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={()=> navigation.navigate('PokemonDetail', {id: item.id})}>
      <View style={styles.cardLeft}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.typeContainer}>
          {item.types.map((type) => (
            <View key={type} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16, color: theme.colors.text }}>Carregando lista (simulado)...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.colors.text, marginBottom: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Pokédex</Text>
      <TouchableOpacity style={styles.buttonLogOut} onPress={handleLogout}>
        <Text style={styles.logOutText}>Logout</Text>
      </TouchableOpacity>
      <FlatList
        data={MOCK_POKEMON_LIST}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

