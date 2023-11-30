import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';

const Fonctionnement = ({ navigation }) => {
    const my_video = require('./../../Asset/tuto1.mp4');
    const my_video2 = require('./../../Asset/tuto2.mp4');
    const my_video3 = require('./../../Asset/tuto3.mp4');
  
    // FAQ items with expandable answers
    const [faqItems, setFaqItems] = useState([
      {
        question: 'Quand le montant de ma location m\'est-il versé ?',
        answer: 'Une fois le paiement confirmé, Votre compte proprio est crédité dans les 24heures suivant la réservation.',
        expanded: false,
      },
      {
        question: 'Dois-je rencontrer la personne ayant réservé ma borne en personne ?',
        answer: 'En optant pour une chargement autonome, vous minimisez vos contacts avec l\'Owner. Et pour vos échanges, vous pouvez utiliser à tout moment le système de messagerie de l\'application.',
        expanded: false,
      },
      {
        question: 'Que se passe-t-il si je dois annuler en raison d\'un problème avec la borne?',
        answer: 'En cas de problème, vous pouvez généralement trouver une solution en envoyant un message au client. S\'il n\'est pas satisfé, contactez Pulsiive dans les 24 heures après avoir constaté le problème.',
        expanded: false,
      },
      {
        question: 'Besoin de plus d\'informations?',
        answer: 'Rendez-vous dans notre Centre d\'aide pour obtenir des réponses supplémentaires à vos questions',
        expanded: false,
      },
      // Add more FAQ items as needed
    ]);
  
    const toggleAnswer = (index) => {
      const updatedItems = [...faqItems];
      updatedItems[index].expanded = !updatedItems[index].expanded;
      setFaqItems(updatedItems);
    };
  
    const [expandedItems, setExpandedItems] = useState(Array(faqItems.length).fill(false));

    return (
      <ScrollView style={styles.container}>
        {/* Navigation Section */}
        <View style={styles.navBar}>
          {/* Empty navigation bar */}
        </View>
  
        {/* Title */}
        <Text style={styles.title}>
        Optimisez la location de votre borne électrique avec Pulsiive, une expérience fluide en quelques étapes simples
        </Text>
  
        {/* Video Section */}
        <Animatable.View animation="fadeInRight" duration={7000}>
        <View style={styles.videoCard}>
            <Video
            source={my_video} // Première vidéo
            style={styles.video}
            resizeMode="contain"
            repeat={true}
            autoplay={true}
            />
        </View>
        </Animatable.View>

        {/* Explication de la vidéo 1 */}
        <View style={styles.explanation}>
            <Text style={styles.stepTitle}>1.Ajouter une Borne</Text>
            <Text style={styles.stepText}>
            Commencez par créer votre propre borne Pulssive. Spécifier l'adresse de votre borne, la ville, le code postal et le pays. Utilisez les filtres diponibles pour spécifier les caractéristiques de votres borne comme le prix et le type de station.
            Votre borne sera ajouté en quelques clics ! 
            </Text>
        </View>

        <View style={{ height: 70 }}></View>

        {/* Video 2 */}
        <Animatable.View animation="fadeInRight" duration={7000}>
        <View style={styles.videoCard}>
            <Video
            source={my_video2} // Deuxième vidéo
            style={styles.video}
            resizeMode="contain"
            repeat={true}
            autoplay={true}
            />
        </View>
        </Animatable.View>

        {/* Explication de la vidéo 2 */}
        <View style={styles.explanation}>
            <Text style={styles.stepTitle}>2.Ajouter un créneau</Text>
            <Text style={styles.stepText}>
            Dès que votre nouvelle borne est disponible, créer des créneaux vides pour la location de votre borne. Vous pouvez choisir la date et l'heure de votre créneau en toute simplicité.
            Une fois les créneaux ajoutés, vos futurs locataires peuvent réserver en quelques clics!
            </Text>
        </View>

        <View style={{ height: 70 }}></View>

        {/* Video 3 */}
        <Animatable.View animation="fadeInRight" duration={7000}>
        <View style={styles.videoCard}>
            <Video
            source={my_video3} // Troisième vidéo
            style={styles.video}
            resizeMode="contain"
            repeat={true}
            autoplay={true}
            />
        </View>
        </Animatable.View>

        {/* Explication de la vidéo 3 */}
        <View style={styles.explanation}>
            <Text style={styles.stepTitle}>3.Validation</Text>
            <Text style={styles.stepText}>
            Lorsque qu'une personne choisit votre créneau, ce dernier est en attente de votre Validation.
            Vous avez terminé! Echanger avec votre locataire dans la messagerie pour lui apporter des précisions et répondre à ses questions. Vou pouvez aussi contacter 
            Pulsiive à tout moment pour obtenir plus d'aide.
            </Text>
        </View>

        <View style={{ height: 60 }}></View>


        {/* FAQ Section */}
        <View style={styles.faq}>
            <Text style={styles.faqTitle}>Vous avez encore des questions ?</Text>

            {faqItems.map((item, index) => (
                <View key={index} style={styles.faqQuestionContainer}>
                    <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => {
                        const updatedExpandedItems = [...expandedItems];
                        updatedExpandedItems[index] = !expandedItems[index];
                        setExpandedItems(updatedExpandedItems);
                    }}
                    >
                    <Text style={styles.faqQuestionText}>{item.question}</Text>
                    <Image
                        source={expandedItems[index] ? require('./../../Asset/arrow-up.png') : require('./../../Asset/down-arrow.png')}
                        style={styles.faqIcon}
                    />
                    </TouchableOpacity>
                    {expandedItems[index] && (
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}

                    {/* Question separator line */}
                    {index !== faqItems.length - 1 && <View style={styles.faqQuestionSeparator}></View>}
                </View>
                ))}
            </View>

        <View style={{ height: 200 }}></View>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black', // Set the background color to black
  },
  navBar: {
    height: 50, // Adjust as needed
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 80,
    color: 'white',
  },
//   videoCard: {
//     width: '100%',
//     aspectRatio: 16 / 9,
//     marginBottom: 20,
//   },
  videoCard: {
    alignSelf: 'center',  
    width: '100%',             
    aspectRatio: 1.05,      
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,       // Adjust shadow opacity as needed
    shadowRadius: 2,
    elevation: 4,            // For Android shadow
    backgroundColor: '#121212', // Background color of the card
    marginBottom: 40,         // Adjust as needed
  },
  video: {
    flex: 1,
    
  },
  explanation: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  stepText: {
    fontSize: 20,
    color: 'white',
  },
  faq: {
    marginTop: 20,
  },
  faqTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  faqQuestionSeparator: {
    borderBottomColor: '#ccc', // Grey color for the separator line
    borderBottomWidth: 1, // Border width for the separator
    marginTop: 40, // Add space between questions and the separator
  },
  faqQuestionContainer: {
    marginBottom: 10,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30,
  },
  faqIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  faqAnswer: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
});

export default Fonctionnement;
