import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';

const MOCK_POKEMON_DETAIL = {
  id: 25,
  name: 'pikachu',
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  types: ['electric'],
  height: 4,
  weight: 60,
  stats: [
    { name: 'hp', value: 35 },
    { name: 'attack', value: 55 },
    { name: 'defense', value: 40 },
    { name: 'speed', value: 90 },
  ],
  description:
    'Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it is evidence that this Pokémon mistook the intensity of its charge.',
};

export default function PokemonDetailScreen() {
  const pokemon = MOCK_POKEMON_DETAIL;
  const theme = useTheme();
  const styles = createStyles(theme);
  const route = useRoute<RouteProp<RootStackParamList, 'PokemonDetail'>>();
  const {id} = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionText}>
        ID INFORMADO: {id}
      </Text>
      <View style={styles.header}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.id}>#{String(pokemon.id).padStart(3, '0')}</Text>
        </View>

        <View style={styles.typeContainer}>
          {pokemon.types.map((type) => (
            <View key={type} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>

        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.sectionText}>{pokemon.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações básicas</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Altura</Text>
          <Text style={styles.infoValue}>{pokemon.height / 10} m</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Peso</Text>
          <Text style={styles.infoValue}>{pokemon.weight / 10} kg</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stats base</Text>
        {pokemon.stats.map((stat) => (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{stat.name.toUpperCase()}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

