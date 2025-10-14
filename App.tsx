import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  ScrollView
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export default function App() {
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [colorPalette, setColorPalette] = useState<any>(null);
  const [isLoadingPalette, setIsLoadingPalette] = useState(false);

  const fetchColorPalette = async () => {
    if (!userInput.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer quelque chose pour générer une palette');
      return;
    }

    setIsLoadingPalette(true);
    try {
      const response = await fetch('https://colormagic.app/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la palette');
      }

      const data = await response.json();
      setColorPalette(data);
      Alert.alert('Succès', 'Palette de couleurs générée !');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer la palette de couleurs');
      console.error('Erreur API ColorMagic:', error);
    } finally {
      setIsLoadingPalette(false);
    }
  };

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

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Zone de saisie pour la palette */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Décrivez ce que vous voulez :</Text>

              {/* Container pour TextInput avec croix */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: coucher de soleil, océan, forêt..."
                  placeholderTextColor="#999"
                  value={userInput}
                  onChangeText={setUserInput}
                  multiline={false}
                />
                {userInput.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setUserInput('')}
                  >
                    <Text style={styles.clearText}>×</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Boutons côte à côte */}
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.halfButton}
                  onPress={fetchColorPalette}
                  disabled={isLoadingPalette}
                >
                  <Text style={styles.buttonText}>
                    {isLoadingPalette ? 'Génération...' : 'Palette'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.halfButton}
                  onPress={modifySystemSettings}
                >
                  <Text style={styles.buttonText}>
                    Appliquer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Affichage de la palette */}
            {colorPalette && (
              <View style={styles.paletteContainer}>
                <Text style={styles.paletteTitle}>Votre palette de couleurs :</Text>
                <View style={styles.colorsRow}>
                  {colorPalette.colors && colorPalette.colors.map((color: string, index: number) => (
                    <View
                      key={index}
                      style={[styles.colorBox, { backgroundColor: color }]}
                    >
                      <Text style={styles.colorText}>{color}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}