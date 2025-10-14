import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/wallpaper.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.title}>Color Your Phone</Text>
          <Text style={styles.subtitle}>Application système Android</Text>
        </View>      <View style={styles.content}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 20,
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  dataText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
});
