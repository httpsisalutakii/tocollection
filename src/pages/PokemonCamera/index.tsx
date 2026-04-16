import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { Camera } from 'expo-camera';

export default function PokemonCameraScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [photoResult, setPhotoResult] = useState<any>(null);

  const route = useRoute<RouteProp<RootStackParamList, 'PokemonCamera'>>();
  const { id } = route.params;


  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Precisamos da permissão da câmera.</Text>
        <TouchableOpacity style={styles.actionButton} onPress={requestPermission}>
          <Text style={styles.actionText}>Permitir câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

type CameraRouteProp = RouteProp<RootStackParamList, 'PokemonCamera'>;

export default function CameraScreen({ navigation, route }) {
  navigation,
  route,
}: {
  navigation: NavigationProp;
  route: CameraRouteProp;
} {
  
  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

       (route.params as any)?.onGoBack?.(photo.uri);
      ;
    }
  }
}
  async function handleTakePhoto() {
    const photo = await cameraRef.current?.takePictureAsync({
      quality: 0.7,
      skipProcessing: true,
      // exif: true,   // descomente se quiser ver metadata
      // base64: true, // evite no começo (objeto fica enorme)
    });

    if (photo) {
      setPhotoResult(photo);
      console.log('PHOTO_RESULT (pokemon id = ' + id + '):', photo);
    }
  }


  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.actionButton} onPress={handleTakePhoto}>
          <Text style={styles.actionText}>Tirar foto</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={{ flex: 1 }} />
      <Button title="Tirar foto" onPress={takePhoto} />
        </View>

        {photoResult ? (
          <ScrollView style={styles.jsonBox}>
            <Text selectable style={styles.jsonText}>
              {JSON.stringify(photoResult, null, 2)}
            </Text>
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
}
