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
      // En cas d'erreur, générer une palette factice
      console.error('Erreur API ColorMagic:', error);
      const fallbackPalette = {
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
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
                  { top: '53%', left: '13%' },  // Caillou 1 - descendu et légèrement décalé droite
                  { top: '62%', left: '85%' },  // Caillou 2 - décalé encore plus à droite et descendu
                  { top: '75%', left: '22%' },  // Caillou 3 - décalé gauche et bas
                  { top: '50%', left: '70%' },  // Caillou 4 - décalé un peu vers la gauche
                  { top: '72%', left: '70%' },  // Caillou 5 - bas à droite descendu
                  { top: '50%', left: '15%' },  // Caillou bord gauche
                  { top: '60%', left: '50%' },  // Caillou centre-bas
                  { top: '75%', left: '55%' },  // Caillou bas-centre
                ];
                const position = positions[index % positions.length];

                // Rotations variées pour chaque splash
                const rotations = ['15deg', '-20deg', '25deg', '-10deg', '30deg', '-25deg', '20deg', '-15deg'];
                const rotation = rotations[index % rotations.length];

                // Formes d'étoiles de mer avec centre + bras
                const starfishConfigs = [
                  { armCount: 7, armLength: 20, armWidth: 12 },
                  { armCount: 7, armLength: 18, armWidth: 10 },
                  { armCount: 7, armLength: 25, armWidth: 15 },
                  { armCount: 7, armLength: 22, armWidth: 8 },
                  { armCount: 7, armLength: 16, armWidth: 14 },
                ];

                const config = starfishConfigs[index % starfishConfigs.length];

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
                        width: 80,
                        height: 80,
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
                      left: -35,
                      top: -8,
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