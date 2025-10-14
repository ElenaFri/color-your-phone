import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export default function App() {
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      setApiData(data);
      Alert.alert('Succès', 'Données récupérées de l API');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les données');
      console.error('Erreur API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const modifySystemSettings = () => {
    Alert.alert(
      'Réglages système',
      'Fonctionnalité à implémenter pour modifier les réglages Android'
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('./assets/wallpaper.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>Color Your Phone</Text>
          </View>

          <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={fetchApiData}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Chargement...' : 'Consulter l API'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={modifySystemSettings}
            >
              <Text style={styles.buttonText}>
                Modifier les réglages
              </Text>
            </TouchableOpacity>

            {apiData && (
              <View style={styles.dataContainer}>
                <Text style={styles.dataTitle}>Données reçues :</Text>
                <Text style={styles.dataText}>
                  ID: {apiData.id}
                </Text>
                <Text style={styles.dataText}>
                  Titre: {apiData.title}
                </Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}