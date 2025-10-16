import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export default function App() {
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [colorPalette, setColorPalette] = useState<any>(null);
  const [isLoadingPalette, setIsLoadingPalette] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const fetchColorPalette = async () => {
    if (!userInput.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer quelque chose pour générer une palette');
      return;
    }

    setIsLoadingPalette(true);
    setColorPalette(null); // Reset la palette précédente

    try {
      // Testons d'abord l'endpoint de recherche
      const response = await fetch(`https://colormagic.app/api/palette/search?q=${encodeURIComponent(userInput.trim())}`);

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la palette');
      }

      const data = await response.json();
      console.log('Réponse API:', data);

      // Si on a des résultats, prendre la première palette
      if (data && data.length > 0 && data[0].colors) {
        setColorPalette({
          colors: data[0].colors,
          name: data[0].name || userInput
        });
        // Afficher le statut seulement après génération réussie
        setShowStatus(true);
        setTimeout(() => {
          setShowStatus(false);
        }, 2000);
      } else {
        // Si pas de résultats, créer une palette factice pour les tests
        const testPalette = {
          colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
          name: userInput
        };
        setColorPalette(testPalette);
        // Afficher le statut seulement après génération réussie
        setShowStatus(true);
        setTimeout(() => {
          setShowStatus(false);
        }, 2000);
      }
    } catch (error) {
      // En cas d'erreur, générer une palette basée sur le mot-clé
      console.log('API ColorMagic indisponible, utilisation d\'une palette générée');

      // Palettes prédéfinies basées sur des mots-clés
      const keywordPalettes: { [key: string]: string[] } = {
        'océan': ['#006994', '#13A5DC', '#67C3CC', '#A8E6CF', '#B8F2E6'],
        'forêt': ['#2D5016', '#5D8233', '#8FBC8F', '#C8E6C9', '#E8F5E8'],
        'coucher': ['#FF6B35', '#F7931E', '#FFB347', '#FFCCCB', '#FFE5B4'],
        'nuit': ['#1A1A2E', '#16213E', '#533483', '#7209B7', '#A663CC'],
        'printemps': ['#8EC5A6', '#B4E197', '#C8E6C9', '#F8BBD9', '#FFEAA7'],
        'automne': ['#8B4513', '#CD853F', '#DEB887', '#F4A460', '#FFE4B5'],
        'tropical': ['#FF6B9D', '#C44569', '#F8B500', '#F4D03F', '#82E0AA'],
        'default': ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
      };

      // Chercher une palette basée sur le mot-clé
      let selectedPalette = keywordPalettes['default'];
      const input = userInput.toLowerCase();

      for (const [keyword, palette] of Object.entries(keywordPalettes)) {
        if (input.includes(keyword)) {
          selectedPalette = palette;
          break;
        }
      }

      const fallbackPalette = {
        colors: selectedPalette,
        name: userInput
      };
      setColorPalette(fallbackPalette);
      // Afficher le statut seulement après génération (même en cas d'erreur avec palette factice)
      setShowStatus(true);
      setTimeout(() => {
        setShowStatus(false);
      }, 2000);
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
          {/* Overlay pour obscurcir légèrement le fond */}
          <View style={styles.darkOverlay} />

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
                    onPress={() => {
                      setUserInput('');
                      setColorPalette(null);
                    }}
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
          </ScrollView>

          {/* Tâches de couleurs dispersées sur le fond d'écran */}
          {colorPalette && colorPalette.colors && (
            <View style={styles.colorSpotsOverlay}>
              {colorPalette.colors.map((color: string, index: number) => {
                // Positions ajustées pour centrer sur les cailloux
                const positions = [
                  { top: '52%', left: '11%' },
                  { top: '61%', left: '85%' },
                  { top: '75%', left: '29%' },
                  { top: '50%', left: '65%' },
                  { top: '73%', left: '70%' },
                  { top: '50%', left: '15%' },
                  { top: '60%', left: '50%' },
                  { top: '75%', left: '55%' },
                ];
                const position = positions[index % positions.length];

                // Rotations variées pour chaque splash
                const rotations = ['15deg', '-20deg', '25deg', '-5deg', '0deg', '-25deg', '20deg', '-15deg'];
                const rotation = rotations[index % rotations.length];

                return (
                  <View
                    key={index}
                    style={[
                      {
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        transform: [{ rotate: rotation }],
                      } as any
                    ]}
                  >
                    {/* Étoile utilisant l'image star.png avec la couleur générée */}
                    <Image
                      source={require('./assets/star.png')}
                      style={{
                        width: 100,
                        height: 100,
                        position: 'absolute',
                        left: -40,
                        top: -40,
                        tintColor: color,
                      }}
                      resizeMode="contain"
                    />
                    {/* Texte de la couleur au centre */}
                    <Text style={[styles.colorSpotText, {
                      position: 'absolute',
                      left: -24,
                      top: 5,
                      width: 70,
                      textAlign: 'center'
                    }]}>
                      {color}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* Indicateur de statut en bas */}
          {showStatus && (
            <View style={styles.statusIndicator}>
              <Text style={styles.statusText}>
                Palette générée
              </Text>
            </View>
          )}
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}