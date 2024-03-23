import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from '../config'; // importe l'objet firebase depuis config.js

const Playground = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // category prop est déstructuré depuis l'objet route ?
  const { category } = route.params;

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    // Réinitialise les variables d'état selectedOptions et showResults
    setSelectedOptions({});
    setShowResults(false);

    // Récupère les questions de la base de données Firebase à l'aide de l'attribut category
    const db = firebase.firestore();
    const questionRef = db.collection("questions"); // Utilise la référence à la collection correcte
    const snapshot = await questionRef.where("category", "==", category).get();
    if(snapshot.empty){
      console.log("Pas de document correspondant !");
      return;
    }
    // const db = (firebase = db.collection("questions"));
    // const snapshot = await questionRef.where("category", "==", category).get();
    // if (snapshot.empty) {
    //   console.log("Pas de document correspondant !");
    //   return;
    // }
    const allQuestions = snapshot.docs.map((doc) => doc.data());
    const shuffleQuestions = allQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffleQuestions.slice(0, 10));
  };

  // la fonction handleOptionSelected est appelée chaque fois qu'une option est sélectionnée pour une question.
  // Elle met à jour la variable d'état selectedOptions pour inclure l'option sélectionnée pour la question correspondante.
  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    // La fonction handleSubmit est appelée lorsque une réponse est soumise. Elle parcourt en boucle chaque question et compare l'option sélectionnée à l'option correcte pour cette question.
    questions.forEach((question, index) => {
      // Si l'option sélectionnée correspond à l'option correcte, elle incrémente la variable correctAnswers.
      if (selectedOptions[index] === question.correctOption) {
        correctAnswers++;
      }
    });
    // Enfin, elle fixe la variable d'état score au nombre de réponses correctes et affiche les résultats en fixant la variable d'état showResults à true.
    setScore(correctAnswers);
    setShowResults(true);
  };

  return (
    <View style={styles.container}>
      {/* Liste des questions */}
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>

            {/* Options de réponse */}
            <TouchableOpacity
              style={[
                styles.option,
                selectedOptions[index] === 1 && styles.selectedOptions,
                showResults && item.correctOption === 1 && styles.correctOption,
                showResults &&
                  selectedOptions[index] === 1 &&
                  selectedOptions[index] !== item.correctOption &&
                  styles.wrongOption,
              ]}
              onPress={() => handleOptionSelect(index, 1)}
              disabled={showResults}
            >
              <Text>{item.option1}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                selectedOptions[index] === 2 && styles.selectedOptions,
                showResults && item.correctOption === 2 && styles.correctOption,
                showResults &&
                  selectedOptions[index] === 2 &&
                  selectedOptions[index] !== item.correctOption &&
                  styles.wrongOption,
              ]}
              onPress={() => handleOptionSelect(index, 2)}
              disabled={showResults}
            >
              <Text>{item.option2}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                selectedOptions[index] === 3 && styles.selectedOptions,
                showResults && item.correctOption === 3 && styles.correctOption,
                showResults &&
                  selectedOptions[index] === 3 &&
                  selectedOptions[index] !== item.correctOption &&
                  styles.wrongOption,
              ]}
              onPress={() => handleOptionSelect(index, 3)}
              disabled={showResults}
            >
              <Text>{item.option3}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                selectedOptions[index] === 4 && styles.selectedOptions,
                showResults && item.correctOption === 4 && styles.correctOption,
                showResults &&
                  selectedOptions[index] === 4 &&
                  selectedOptions[index] !== item.correctOption &&
                  styles.wrongOption,
              ]}
              onPress={() => handleOptionSelect(index, 4)}
              disabled={showResults}
            >
              <Text>{item.option4}</Text>
            </TouchableOpacity>
            {/* { showResults && (
                <View style={styles.result}>
                    <Text style={styles.resultText}>
                        Ton score est de {score} sur {questions.length}
                    </Text>
                    <TouchableOpacity style={styles.tryAgainBtn} onPress={getQuestions}>
                        <Text style={styles.tryAgainBtnText}>Recommencer</Text>
                    </TouchableOpacity>
                </View>
            )} */}
          </View>
        )}
      />

      {/* Bouton de validation des réponses */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit}
        disabled={showResults}
        >
            <Text style={styles.submitBtnText}>Valider</Text>
      </TouchableOpacity>

      {/* Affichage des résultats */}
      { showResults && (
                <View style={styles.result}>
                    <Text style={styles.resultText}>
                        Ton score est de {score} sur {questions.length}
                    </Text>
                    <TouchableOpacity style={styles.tryAgainBtn} onPress={getQuestions}>
                        <Text style={styles.tryAgainBtnText}>Recommencer</Text>
                    </TouchableOpacity>
                </View>
            )}
    </View>
  );
};

export default Playground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  questionContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.80,
    elevation: 5,
  },
  option: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedOptions: {
    backgroundColor: '#949494'
  },
  correctOption: {
    backgroundColor: 'green'
  },
  wrongOption: {
    backgroundColor: 'red'
  },
  submitBtn: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  submitBtnText:{
    color: '#fff',
    fontSize: 20
  },
  result:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  tryAgainBtn:{
    backgroundColor:'blue',
    padding:10,
    marginVertical:10,
    borderRadius:5
  },
  tryAgainBtnText:{
    color: '#fff',
    fontSize:20
  }
});
