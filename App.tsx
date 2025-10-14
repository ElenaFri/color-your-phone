/**/**

 * Color Your Phone - Application système Android * Color Your Phone - Application système Android

  * Consultation d'API et modification des réglages du smartphone * Consultation d'API et modification des réglages du smartphone

    * / */



import React, { useState } from 'react'; import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar'; import { StatusBar } from 'expo-status-bar';

import { import {

  StyleSheet, StyleSheet,

  Text, Text,

  View, View,

  SafeAreaView, SafeAreaView,

  TouchableOpacity, TouchableOpacity,

  Alert  Alert

} from 'react-native';} from 'react-native';



export default function App() {
  export default function App() {

    const [apiData, setApiData] = useState<any>(null); const [apiData, setApiData] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(false); const [isLoading, setIsLoading] = useState(false);



    const fetchApiData = async () => {
      const fetchApiData = async () => {

        setIsLoading(true); setIsLoading(true);

        try {
          try {

            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');      // Exemple d'appel API (à remplacer par votre vraie API)

            const data = await response.json(); const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

            setApiData(data); const data = await response.json();

            Alert.alert('Succès', 'Données récupérées de l\'API'); setApiData(data);

          } catch (error) {
            Alert.alert('Succès', 'Données récupérées de l\'API');

            Alert.alert('Erreur', 'Impossible de récupérer les données');
          } catch (error) {

            console.error('Erreur API:', error); Alert.alert('Erreur', 'Impossible de récupérer les données');

          } finally {
            console.error('Erreur API:', error);

            setIsLoading(false);
          } finally {

          } setIsLoading(false);

        };
      }

    };

    const modifySystemSettings = () => {

      Alert.alert(  const modifySystemSettings = () => {

        'Réglages système',     // Ici vous pourrez ajouter la logique pour modifier les réglages système

          'Fonctionnalité à implémenter pour modifier les réglages Android'    Alert.alert(

          ); 'Réglages système',

  }; 'Fonctionnalité à implémenter pour modifier les réglages Android'

    );

    return (  };

    <SafeAreaView style={styles.container}>

      <StatusBar style="dark" />  return (

          <SafeAreaView style={styles.container}>

      <View style={styles.header}>      <StatusBar style="dark" />

        <Text style={styles.title}>Color Your Phone</Text>

        <Text style={styles.subtitle}>Application système Android</Text>      <View style={styles.header}>

      </View>        <Text style={styles.title}>Color Your Phone</Text>

        <Text style={styles.subtitle}>Application système Android</Text>

      <View style={styles.content}>      </View>

        <TouchableOpacity 

          style={styles.button}       <View style={styles.content}>

          onPress={fetchApiData}        <TouchableOpacity

          disabled={isLoading}          style={styles.button}

        >          onPress={fetchApiData}

          <Text style={styles.buttonText}>          disabled={isLoading}

            {isLoading ? 'Chargement...' : 'Consulter l\'API'}        >

          </Text>          <Text style={styles.buttonText}>

        </TouchableOpacity>            {isLoading ? 'Chargement...' : 'Consulter l\'API'}

          </Text>

        <TouchableOpacity         </TouchableOpacity>

          style={styles.button} 

          onPress={modifySystemSettings}        <TouchableOpacity

        >          style={styles.button}

          <Text style={styles.buttonText}>          onPress={modifySystemSettings}

            Modifier les réglages        >

          </Text>          <Text style={styles.buttonText}>

        </TouchableOpacity>            Modifier les réglages

          </Text>

        {apiData && (        </TouchableOpacity>

          <View style={styles.dataContainer}>

            <Text style={styles.dataTitle}>Données reçues :</Text>        {apiData && (

            <Text style={styles.dataText}>          <View style={styles.dataContainer}>

              ID: {apiData.id}            <Text style={styles.dataTitle}>Données reçues :</Text>

            </Text>            <Text style={styles.dataText}>

            <Text style={styles.dataText}>              ID: {apiData.id}

              Titre: {apiData.title}            </Text>

            </Text>            <Text style={styles.dataText}>

          </View>              Titre: {apiData.title}

        )}            </Text>

      </View >          </View >

    </SafeAreaView >        )
}

  );      </View >

}    </SafeAreaView >

  );

const styles = StyleSheet.create({}

  container: {

  flex: 1, const styles = StyleSheet.create({

    backgroundColor: '#f5f5f5', container: {

    }, flex: 1,

    header: {
      backgroundColor: '#f5f5f5',

      padding: 20,
    },

    backgroundColor: '#2196F3', header: {

      alignItems: 'center', padding: 20,

    }, backgroundColor: '#2196F3',

    title: {
      alignItems: 'center',

      fontSize: 24,
    },

    fontWeight: 'bold', title: {

      color: 'white', fontSize: 24,

      marginBottom: 5, fontWeight: 'bold',

    }, color: 'white',

    subtitle: {
      marginBottom: 5,

      fontSize: 16,
    },

    color: '#E3F2FD', subtitle: {

    }, fontSize: 16,

    content: {
      color: '#E3F2FD',

      flex: 1,
    },

    padding: 20, content: {

      justifyContent: 'center', flex: 1,

    }, padding: 20,

    button: {
      justifyContent: 'center',

      backgroundColor: '#2196F3',
    },

    padding: 15, button: {

      borderRadius: 8, backgroundColor: '#2196F3',

      marginVertical: 10, padding: 15,

      alignItems: 'center', borderRadius: 8,

    }, marginVertical: 10,

    buttonText: {
      alignItems: 'center',

      color: 'white',
    },

    fontSize: 16, buttonText: {

      fontWeight: '600', color: 'white',

    }, fontSize: 16,

    dataContainer: {
      fontWeight: '600',

      marginTop: 20,
    },

    padding: 15, dataContainer: {

      backgroundColor: 'white', marginTop: 20,

      borderRadius: 8, padding: 15,

      elevation: 2, backgroundColor: 'white',

    }, borderRadius: 8,

    dataTitle: {
      elevation: 2,

      fontSize: 16,
    },

    fontWeight: 'bold', dataTitle: {

      marginBottom: 10, fontSize: 16,

      color: '#333', fontWeight: 'bold',

    }, marginBottom: 10,

    dataText: {
      color: '#333',

      fontSize: 14,
    },

    color: '#666', dataText: {

      marginVertical: 2, fontSize: 14,

    }, color: '#666',

  }); marginVertical: 2,
},
});